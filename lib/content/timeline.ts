import type { GarnetStory } from "./types";

/**
 * Garnet's history in five chapters. Stories are sorted into these by year
 * automatically. Edit names, ranges, or blurbs here.
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

export type TimelineChapter = { era: Era; stories: GarnetStory[] };

export function eraForYear(year: number): Era {
  return ERAS.find((era) => year <= era.until) ?? ERAS[ERAS.length - 1];
}

/** The History timeline: every story at its year, grouped into eras. */
export function buildTimeline(stories: GarnetStory[]): TimelineChapter[] {
  const sorted = [...stories].sort(
    (a, b) => a.startYear - b.startYear || a.title.localeCompare(b.title),
  );
  return ERAS.map((era) => ({
    era,
    stories: sorted.filter((story) => eraForYear(story.startYear) === era),
  })).filter((chapter) => chapter.stories.length > 0);
}
