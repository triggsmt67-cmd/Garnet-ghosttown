import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Load server TypeScript in isolation so tests never call or modify the real CMS.
function load(file, dependencies = {}, globals = {}) {
  const loadedModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, {
    module: loadedModule, exports: loadedModule.exports, console, URL, AbortSignal,
    process: { env: { WORDPRESS_GRAPHQL_URL: 'https://cms.example.test/graphql', NODE_ENV: 'production' } },
    require(name) { if (name === 'server-only') return {}; if (name in dependencies) return dependencies[name]; throw new Error('Unexpected dependency: ' + name); },
    ...globals,
  }, { filename: file });
  return loadedModule.exports;
}

test('CMS calls enforce a 10-second deadline and propagate cancellation', async () => {
  let deadline;
  const client = load('lib/content/client.ts', {}, {
    AbortSignal: { timeout(ms) { deadline = ms; return AbortSignal.timeout(15); } },
    fetch: async (_url, options) => new Promise((_resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(options.signal.reason), { once: true });
      // Keep Node alive while the intentionally stalled request times out.
      const keepAlive = setTimeout(() => {}, 100);
      options.signal.addEventListener('abort', () => clearTimeout(keepAlive), { once: true });
    }),
  });
  await assert.rejects(client.wpFetch('query {}', { tags: ['test'] }), { name: 'TimeoutError' });
  assert.equal(deadline, 10000);
});

test('album-change errors survive GraphQL transport as a typed code', async () => {
  const client = load('lib/content/client.ts', {}, { fetch: async () => ({ ok: true, json: async () => ({ errors: [{ message: 'Album changed', extensions: { code: 'GARNET_ALBUM_CHANGED' } }] }) }) });
  await assert.rejects(client.wpFetch('query {}', { tags: ['test'] }), error => error instanceof client.WordPressError && error.code === 'GARNET_ALBUM_CHANGED');
});

let updates = [];
let unavailable = false;
const content = load('lib/content/index.ts', {
  './updates': { getVisitorUpdates: async () => ({ updates, unavailable }) },
  'next/constants': { PHASE_PRODUCTION_BUILD: 'phase-production-build' },
  './client': { isWordPressConfigured: true }, './mock': {}, './queries': {}, './wordpress': {}, './types': {},
  './time': { formatShortDate: value => value.slice(0, 10) },
});

test('missing, old, invalid, and future road reports retain the BLM fallback', () => {
  const now = new Date('2026-10-21T18:00:00Z');
  assert.match(content.toRoadReport(null, now).note, /406\.329\.3914/);
  for (const date of ['2026-10-01T18:00:00Z', '', 'invalid', '2026-10-22T18:00:00Z']) {
    const report = content.toRoadReport({ roadStatus: 'Open', roadNote: 'Old assurance', lastVerified: date, tone: 'open' }, now);
    assert.equal(report.needsConfirmation, true);
    assert.equal(report.tone, 'caution');
    assert.match(report.note, /406\.329\.3914/);
    assert.notEqual(report.status, 'Open');
  }
  const fresh = content.toRoadReport({ roadStatus: 'Access advisory', roadNote: 'Confirmed note', lastVerified: '2026-10-20T18:00:00Z', tone: 'caution' }, now);
  assert.equal(fresh.status, 'Access advisory');
});

test('road status uses published Current Updates and excludes demonstrations', async () => {
  updates = [{ category: 'road', sample: true, title: 'Sample open road' }];
  assert.equal((await content.getVisitorStatus()).data, null);
  updates = [{ category: 'road', sample: false, id: '42', title: 'Seasonal closure', summary: 'Use winter access', verifiedAt: '2026-10-20T18:00:00Z' }];
  const status = await content.getVisitorStatus();
  assert.equal(status.data.roadStatus, 'Seasonal closure');
  assert.equal(status.data.reportUrl, '/updates#update-42');
  unavailable = true; updates = [];
  assert.equal((await content.getVisitorStatus()).source, 'fallback');
  assert.equal((await content.getRoadReport()).needsConfirmation, true);
});

test('pagination API returns a refresh conflict for a changed album', async () => {
  const client = load('lib/content/client.ts');
  const route = load('app/api/gallery/[slug]/photos/route.ts', {
    '@/lib/content/galleries': { getGalleryAlbum: async () => { throw new client.WordPressError('Changed', 'GARNET_ALBUM_CHANGED'); } },
    '@/lib/content/client': client,
  }, { Response });
  const response = await route.GET({ nextUrl: new URL('https://example.test/api/gallery/historic-garnet/photos?after=YWJj') }, { params: Promise.resolve({ slug: 'historic-garnet' }) });
  assert.equal(response.status, 409);
  assert.match((await response.json()).message, /Refresh/);
});
