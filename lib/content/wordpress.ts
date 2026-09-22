// Raw WPGraphQL response shapes and their mapping to frontend models.
// Mappers are defensive: a half-filled WordPress record is dropped or
// degraded, never allowed to crash a page.

import { toDenverISO } from "./time";
import type {
  ContentImage,
  EventStatus,
  GarnetEvent,
  RoadTone,
  TimelineEntry,
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

export type WpTimelineResponse = {
  timelineEntries?: {
    nodes: Array<{
      databaseId: number;
      slug?: string | null;
      title?: string | null;
      content?: string | null;
      timelineDetails?: {
        yearLabel?: string | null;
        sortYear?: number | null;
        summary?: string | null;
        photoCredit?: string | null;
        mainPhoto?: WpImageEdge;
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

type WpTimelineNode = NonNullable<WpTimelineResponse["timelineEntries"]>["nodes"][number];

export function mapTimelineEntry(node: WpTimelineNode): TimelineEntry | null {
  const f = node.timelineDetails;
  const title = clean(htmlToText(node.title));
  const yearLabel = clean(f?.yearLabel) ?? (f?.sortYear ? String(f.sortYear) : undefined);
  if (!f || !title || !yearLabel) return null;

  const parsedYear = Number.parseInt(yearLabel, 10);
  const sortYear =
    typeof f.sortYear === "number" ? f.sortYear : Number.isNaN(parsedYear) ? 9999 : parsedYear;

  return {
    id: String(node.databaseId),
    yearLabel,
    sortYear,
    title,
    summary: clean(f.summary) ?? "",
    slug: htmlToText(node.content) && node.slug ? node.slug : undefined,
    mainPhoto: mapImage(f.mainPhoto, f.photoCredit),
  };
}
