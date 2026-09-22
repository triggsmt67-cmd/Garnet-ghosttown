// Raw WPGraphQL response shapes and their mapping to frontend models.
// Mappers are defensive: a half-filled WordPress record is dropped or
// degraded, never allowed to crash a page.

import { sanitizeStoryHtml } from "./sanitize";
import { toDenverISO } from "./time";
import type {
  ContentImage,
  EventStatus,
  GarnetEvent,
  GarnetStory,
  MapBuildingSlug,
  RoadTone,
  StoryLink,
  StoryType,
  VisitorStatus,
} from "./types";

type WpImageNode = {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

type WpImageEdge = { node?: WpImageNode | null } | null;

/** WPGraphQL for ACF returns select fields as lists; older setups return strings. */
type WpSelect = string | string[] | null;

export type WpEventsResponse = {
  events?: {
    nodes: Array<{
      databaseId: number;
      title?: string | null;
      content?: string | null;
      featuredImage?: WpImageEdge;
      eventDetails?: {
        eventStart?: string | null;
        eventEnd?: string | null;
        eventHomepageSummary?: string | null;
        eventPrice?: number | null;
        eventPriceNote?: string | null;
        eventDetailsUrl?: string | null;
        eventAccessAdvisory?: string | null;
        eventFeatureOnHomepage?: boolean | null;
        eventStatus?: WpSelect;
        eventRegistrationRequired?: boolean | null;
      } | null;
    }>;
  } | null;
};

export type WpVisitorStatusResponse = {
  garnetVisitorStatus?: {
    roadAndWinterAccess?: {
      roadStatus?: string | null;
      roadNote?: string | null;
      roadLastVerified?: string | null;
      roadTone?: WpSelect;
      roadReportUrl?: string | null;
    } | null;
  } | null;
};

export type WpStoriesResponse = {
  garnetStories?: {
    nodes: Array<{
      databaseId: number;
      slug?: string | null;
      title?: string | null;
      content?: string | null;
      storyDetails?: {
        leadIn?: string | null;
        timeFrame?: string | null;
        startYear?: number | null;
        storyType?: WpSelect;
        mainPhoto?: WpImageEdge;
        photoCredit?: string | null;
        voiceQuote?: string | null;
        voiceSpeaker?: string | null;
        voiceSource?: string | null;
        mapBuilding?: WpSelect;
        sourceLabel?: string | null;
        sourceUrl?: string | null;
        relatedStories?: {
          nodes?: Array<{
            slug?: string | null;
            title?: string | null;
            storyDetails?: { timeFrame?: string | null } | null;
          } | null>;
        } | null;
      } | null;
    }>;
  } | null;
};

// ---------------------------------------------------------------------------

const EVENT_STATUSES: EventStatus[] = ["scheduled", "postponed", "cancelled", "sold_out"];
const ROAD_TONES: RoadTone[] = ["open", "caution", "closed"];

function selectValue(value: WpSelect | undefined): string | undefined {
  return (Array.isArray(value) ? value[0] : value) ?? undefined;
}

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Plain text from WordPress HTML (for summaries and descriptions). */
export function htmlToText(html: string | null | undefined): string | undefined {
  if (!html) return undefined;
  const text = html
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .trim();
  return text || undefined;
}

function mapImage(edge: WpImageEdge | undefined, credit?: string | null): ContentImage | undefined {
  const node = edge?.node;
  if (!node?.sourceUrl) return undefined;
  return {
    url: node.sourceUrl,
    alt: node.altText ?? "",
    width: node.mediaDetails?.width ?? undefined,
    height: node.mediaDetails?.height ?? undefined,
    credit: clean(credit),
  };
}

// ---------------------------------------------------------------------------

type WpEventNode = NonNullable<WpEventsResponse["events"]>["nodes"][number];

export function mapEvent(node: WpEventNode): GarnetEvent | null {
  const f = node.eventDetails;
  const startDate = toDenverISO(f?.eventStart);
  const title = clean(htmlToText(node.title));
  if (!f || !startDate || !title) return null; // Required fields missing: skip.

  const status = selectValue(f.eventStatus) as EventStatus | undefined;

  return {
    id: String(node.databaseId),
    title,
    startDate,
    endDate: toDenverISO(f.eventEnd),
    homepageSummary: clean(f.eventHomepageSummary) ?? htmlToText(node.content) ?? "",
    description: htmlToText(node.content),
    price: typeof f.eventPrice === "number" ? f.eventPrice : undefined,
    priceNote: clean(f.eventPriceNote),
    detailsUrl: clean(f.eventDetailsUrl),
    accessAdvisory: clean(f.eventAccessAdvisory),
    featureOnHomepage: Boolean(f.eventFeatureOnHomepage),
    status: status && EVENT_STATUSES.includes(status) ? status : "scheduled",
    registrationRequired: Boolean(f.eventRegistrationRequired),
    featuredImage: mapImage(node.featuredImage),
  };
}

export function mapVisitorStatus(data: WpVisitorStatusResponse): VisitorStatus | null {
  const f = data.garnetVisitorStatus?.roadAndWinterAccess;
  const lastVerified = toDenverISO(f?.roadLastVerified);
  const roadStatus = clean(f?.roadStatus);
  if (!f || !roadStatus || !lastVerified) return null;

  const tone = selectValue(f.roadTone) as RoadTone | undefined;

  return {
    roadStatus,
    roadNote: clean(f.roadNote) ?? "",
    lastVerified,
    // An unrecognized tone must never render as "open".
    tone: tone && ROAD_TONES.includes(tone) ? tone : "caution",
    reportUrl: clean(f.roadReportUrl),
  };
}

const STORY_TYPES: StoryType[] = ["place", "family", "person", "community", "organization"];
const MAP_BUILDINGS: MapBuildingSlug[] = [
  "wells-hotel",
  "kellys-saloon",
  "davey-store",
  "schoolhouse",
  "dahl-cabin",
];

type WpStoryNode = NonNullable<WpStoriesResponse["garnetStories"]>["nodes"][number];

export function mapStory(node: WpStoryNode): GarnetStory | null {
  const f = node.storyDetails;
  const title = clean(htmlToText(node.title));
  const slug = clean(node.slug);
  if (!f || !title || !slug) return null;

  const storyType = selectValue(f.storyType) as StoryType | undefined;
  const mapBuilding = selectValue(f.mapBuilding) as MapBuildingSlug | undefined;
  const quote = clean(f.voiceQuote)?.replace(/^[“"]+|[”"]+$/g, "");
  const speaker = clean(f.voiceSpeaker);
  const sourceLabel = clean(f.sourceLabel);
  const sourceUrl = clean(f.sourceUrl);

  return {
    id: String(node.databaseId),
    slug,
    title,
    storyType: storyType && STORY_TYPES.includes(storyType) ? storyType : "place",
    timeFrame: clean(f.timeFrame) ?? (f.startYear ? String(f.startYear) : ""),
    startYear: typeof f.startYear === "number" ? f.startYear : 9999,
    leadIn: clean(f.leadIn) ?? "",
    bodyHtml: sanitizeStoryHtml(node.content ?? ""),
    voice: quote && speaker ? { quote, speaker, source: clean(f.voiceSource) } : undefined,
    mainPhoto: mapImage(f.mainPhoto, f.photoCredit),
    source: sourceLabel || sourceUrl ? { label: sourceLabel ?? "Source", url: sourceUrl } : undefined,
    mapBuilding: mapBuilding && MAP_BUILDINGS.includes(mapBuilding) ? mapBuilding : undefined,
    relatedStories: (f.relatedStories?.nodes ?? [])
      .map((n): StoryLink | null => {
        const s = clean(n?.slug);
        const t = clean(htmlToText(n?.title));
        return s && t ? { slug: s, title: t, timeFrame: clean(n?.storyDetails?.timeFrame) } : null;
      })
      .filter((n): n is StoryLink => n !== null),
  };
}
