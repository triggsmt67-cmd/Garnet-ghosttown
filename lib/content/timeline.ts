import type { GarnetStory, TimelineEntry } from "./types";

/**
 * Garnet's history in five chapters. Stories and timeline entries are sorted
 * into these by year automatically. Edit names, ranges, or blurbs here.
 */
export const ERAS = [
  {
    slug: "early-claims",
    name: "Early Claims",
    years: "1860s–1894",
    until: 1894,
    blurb: "Placer miners work the gulches, and the first claims are staked and surveyed.",
  },
  {
    slug: "the-boom",
    name: "The Boom",
    years: "1895–1904",
    until: 1904,
    blurb: "A stamp mill, a town of nearly 1,000 people, hotels, stores, and thirteen saloons.",
  },
  {
    slug: "lean-years",
    name: "Lean Years",
    years: "1905–1929",
    until: 1929,
    blurb: "Gold gets harder to reach, fire takes the business district, and families come and go.",
  },
  {
    slug: "last-residents",
    name: "The Last Residents",
    years: "1930s–1940s",
    until: 1949,
    blurb: "Higher gold prices bring a brief revival before the town empties.",
  },
  {
    slug: "preservation",
    name: "Preservation",
    years: "1950s–today",
    until: Number.POSITIVE_INFINITY,
    blurb: "The BLM, volunteers, and conservation crews keep Garnet standing.",
  },
] as const;

export type Era = (typeof ERAS)[number];

export type TimelineItem =
  | { kind: "event"; year: number; entry: TimelineEntry }
  | { kind: "story"; year: number; story: GarnetStory };

export type TimelineChapter = { era: Era; items: TimelineItem[] };

export function eraForYear(year: number): Era {
  return ERAS.find((era) => year <= era.until) ?? ERAS[ERAS.length - 1];
}

/**
 * One timeline: town-wide events plus every story at its own year.
 * Within a year, events come before stories.
 */
export function buildTimeline(entries: TimelineEntry[], stories: GarnetStory[]): TimelineChapter[] {
  const items: TimelineItem[] = [
    ...entries.map((entry) => ({ kind: "event" as const, year: entry.sortYear, entry })),
    ...stories.map((story) => ({ kind: "story" as const, year: story.startYear, story })),
  ].sort((a, b) => a.year - b.year || (a.kind === b.kind ? 0 : a.kind === "event" ? -1 : 1));

  return ERAS.map((era) => ({
    era,
    items: items.filter((item) => eraForYear(item.year) === era),
  })).filter((chapter) => chapter.items.length > 0);
}
