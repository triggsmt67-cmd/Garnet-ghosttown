// Frontend content models. Components depend on these shapes only — never on
// raw WordPress/WPGraphQL responses. Mapping happens in lib/content/wordpress.ts.

export type ContentImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  credit?: string;
};

export type EventStatus = "scheduled" | "postponed" | "cancelled" | "sold_out";

export type GarnetEvent = {
  id: string;
  title: string;
  /** ISO 8601 with offset, e.g. 2026-09-12T12:30:00-06:00 */
  startDate: string;
  endDate?: string;
  homepageSummary: string;
  description?: string;
  /** Numeric admission price; 0 = free; undefined = standard day pass applies */
  price?: number;
  priceNote?: string;
  detailsUrl?: string;
  accessAdvisory?: string;
  featureOnHomepage: boolean;
  status: EventStatus;
  registrationRequired: boolean;
  featuredImage?: ContentImage;
};

export type RoadTone = "open" | "caution" | "closed";

export type VisitorStatus = {
  roadStatus: string;
  roadNote: string;
  /** ISO 8601 timestamp of the last human verification */
  lastVerified: string;
  tone: RoadTone;
  reportUrl?: string;
  /** Mock data only — lets the UI label sample reports honestly */
  isSample?: boolean;
};

export type TimelineEntry = {
  id: string;
  /** Display label: "1898", "1860s", "Today" */
  yearLabel: string;
  /** Numeric sort key: 1898, 1860, 9999 for "Today" */
  sortYear: number;
  title: string;
  summary: string;
  /** Present when the entry has its own detail page */
  slug?: string;
  mainPhoto?: ContentImage;
  /** Optional link to a full story */
  relatedStory?: { slug: string; title: string };
};

export type StoryType = "place" | "family" | "person" | "community" | "organization";

/** A remembered moment in someone's own words. */
export type StoryVoice = {
  quote: string;
  speaker: string;
  source?: string;
};

/** Slugs of the buildings drawn on the Explore map (lib/buildings.ts). */
export type MapBuildingSlug =
  | "wells-hotel"
  | "kellys-saloon"
  | "davey-store"
  | "schoolhouse"
  | "dahl-cabin";

export type GarnetStory = {
  id: string;
  slug: string;
  title: string;
  storyType: StoryType;
  /** Display text, e.g. "1898 – late 1930s" */
  timeFrame: string;
  /** Sort key */
  startYear: number;
  leadIn: string;
  /** Sanitized HTML: paragraphs, links, emphasis, quotes, lists, images */
  bodyHtml: string;
  voice?: StoryVoice;
  mainPhoto?: ContentImage;
  /** Sources and credits line, optionally linked */
  source?: { label: string; url?: string };
  mapBuilding?: MapBuildingSlug;
  relatedStories?: StoryLink[];
};

export type StoryLink = { slug: string; title: string; timeFrame?: string };

/** Display-ready road report consumed by the homepage hero. */
export type RoadReport = {
  status: string;
  note: string;
  updatedLabel: string;
  href: string;
  tone?: RoadTone;
  /** True when the report is missing or too old to trust */
  needsConfirmation?: boolean;
};

/** A value plus where it came from, so pages can react to outages honestly. */
export type Sourced<T> = {
  data: T;
  source: "wordpress" | "mock" | "fallback";
};
