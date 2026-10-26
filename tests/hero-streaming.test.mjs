import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';

function load(file, dependencies) {
  const loaded = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    module: loaded, exports: loaded.exports, URL,
    require(name) {
      if (name === 'react') return React;
      if (name === 'react/jsx-runtime') return jsxRuntime;
      if (name in dependencies) return dependencies[name];
      throw new Error('Unexpected dependency: ' + name);
    },
  }, { filename: file });
  return loaded.exports;
}
const jsxRuntime = await import('react/jsx-runtime');
const e = React.createElement;
const block = ({ children }) => e('div', null, children);
const image = ({ src, alt }) => e('img', { src, alt });
const link = ({ children, href }) => e('a', { href }, children);
const defaultExport = value => ({ __esModule: true, default: value });
const icons = new Proxy({}, { get: () => () => e('svg') });
const shared = {
  'next/image': defaultExport(image),
  'next/link': defaultExport(link),
  '@/components/icons': icons,
  '@/components/reveal': { Reveal: block },
};
const { RouteHero } = load('components/route-hero.tsx', shared);
shared['@/components/route-hero'] = { RouteHero };

for (const [path, title] of [
  ['app/page.tsx', 'Garnet,'],
  ['app/events/page.tsx', 'Learn about life in Garnet.'],
  ['app/history/page.tsx', 'How a mining town became a ghost town.'],
  ['app/visit/page.tsx', 'Plan the last 11 miles before you go.'],
]) {
  test(`${path}: hero streams before stalled fire and CMS responses, then live content completes`, async () => {
    let release;
    const waiting = new Promise(resolve => { release = resolve; });
    const fire = { status: 'Stage 2 restrictions', jurisdiction: 'Missoula County', isUrgent: true, failed: false };
    const { pendingFireStatus } = load('lib/fire-shared.ts', {});
    const FireStatusBar = ({ fire: value }) => e('aside', null, value.status);
    const FireRestrictionsCard = FireStatusBar;
    const live = load('components/live-fire-status.tsx', {
      '@/lib/fire': { getFireStatus: async () => { await waiting; return fire; } },
      './fire-status-bar': { FireStatusBar },
      './fire-restrictions-card': { FireRestrictionsCard },
    });
    const RootLayout = load('app/layout.tsx', {
      'next/font/google': { Barlow: () => ({ variable: 'sans' }), Newsreader: () => ({ variable: 'display' }) },
      './globals.css': {},
      '@/components/header': { Header: ({ fireStatus }) => e('header', null, fireStatus) },
      '@/components/footer': { Footer: () => e('footer') },
      '@/components/scroll-progress': { ScrollProgress: () => null },
      '@/components/live-fire-status': live,
      '@/components/fire-status-bar': { FireStatusBar },
      '@/lib/fire-shared': { pendingFireStatus },
      '@/lib/site': { isIndexable: false },
    }).default;
    const HeroConditions = ({ roadReport }) => e('aside', null, roadReport?.status ?? 'Confirm access before leaving');
    const { homeHeroCopy } = load('components/home-hero-copy.ts', {});
    const journal = load('components/home-hero-journal.tsx', {
      ...shared, './home-hero-copy': { homeHeroCopy }, './icons': icons,
      './hero-conditions': { HeroConditions },
    });
    const hero = load('components/home-hero.tsx', { './home-hero-journal': journal });
    const Page = load(path, {
      ...shared,
      '@/lib/content': {
        getEvents: async () => { await waiting; return { data: [] }; },
        splitEvents: () => ({ upcoming: [], recent: [] }),
        getStories: async () => { await waiting; return { data: [] }; },
        getRoadReport: async () => { await waiting; return { status: 'Live road advisory' }; },
        pickHomepageEvent: () => null,
      },
      '@/lib/content/updates': { getVisitorUpdates: async () => { await waiting; return { updates: [] }; } },
      '@/lib/content/time': {},
      '@/lib/content/schema': { jsonLd: JSON.stringify },
      '@/lib/content/timeline': { buildTimeline: () => [] },
      '@/components/home-hero': hero,
      '@/components/hero-conditions': { HeroConditions },
      '@/components/cta-link': { CtaLink: block },
      '@/components/seasonal-field-guide': { SeasonalFieldGuide: () => null },
      '@/components/event-banner': { EventBanner: () => null },
      '@/components/event-meta': {},
      '@/components/weather-card': { WeatherCard: () => null },
      '@/components/fire-restrictions-card': { FireRestrictionsCard },
      '@/components/live-fire-status': live,
      '@/components/visit-cards': { VisitCards: () => null },
      '@/lib/fire-shared': { pendingFireStatus },
    }).default;
    const output = new PassThrough();
    let html = '';
    output.on('data', chunk => { html += chunk; });
    const complete = new Promise(resolve => output.on('end', resolve));
    let stream;
    let deadline;
    const shell = new Promise((resolve, reject) => {
      deadline = setTimeout(() => reject(new Error('Hero blocked on external data')), 2000);
      stream = renderToPipeableStream(e(RootLayout, null, e(Page)), {
        onShellReady() { stream.pipe(output); setImmediate(resolve); },
        onShellError: reject,
        onError: reject,
      });
    });
    try {
      await shell;
      assert.ok(html.includes(title), 'The hero must be in the initial shell');
      assert.ok(html.includes('Check the official map'), 'Show a neutral status while fire data is pending');
      assert.ok(!html.includes('Stage 2 restrictions'), 'Fire response must still be pending');
      if (path === 'app/events/page.tsx') assert.ok(html.includes('Loading the event calendar'));
      release();
      await complete;
      assert.ok(html.includes('Stage 2 restrictions'), 'Stream the real fire status after it resolves');
      if (path === 'app/events/page.tsx') assert.ok(html.includes('No upcoming events'));
      if (path === 'app/page.tsx') assert.ok(html.includes('Live road advisory'));
    } finally {
      clearTimeout(deadline);
      release();
      stream.abort();
    }
  });
}
