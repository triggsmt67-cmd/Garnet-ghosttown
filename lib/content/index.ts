import "server-only";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { isWordPressConfigured, wpFetch } from "./client";
import { getMockVisitorStatus, mockEvents, mockTimeline } from "./mock";
import { EVENTS_QUERY, TIMELINE_QUERY, VISITOR_STATUS_QUERY } from "./queries";
import { formatShortDate } from "./time";
import type { GarnetEvent, RoadReport, Sourced, TimelineEntry, VisitorStatus } from "./types";
import {
  mapEvent,
  mapTimelineEntry,
  mapVisitorStatus,
  type WpEventsResponse,
  type WpTimelineResponse,
  type WpVisitorStatusResponse,
} from "./wordpress";

export * from "./types";
export * from "./time";

/** Cache tags. The WordPress webhook sends these to /api/revalidate. */
export const CONTENT_TAGS = {
  events: "events",
  visitorStatus: "visitor-status",
  timeline: "timeline",
} as const;

/** A road report older than this is treated as unconfirmed. */
export const ROAD_REPORT_STALE_DAYS = 7;

export const BLM_PHONE_DISPLAY = "406.329.3914";

/**
 * Outage policy:
 * - WordPress not configured → mock data (local development).
 * - Any WordPress error in development → cautious fallback plus a console
 *   warning, so a half-configured local WordPress never blanks the page.
 * - WordPress unreachable during `next build` → cautious fallback, build continues.
 * - WordPress unreachable at production runtime → rethrow. Next.js then keeps
 *   serving the last successfully generated page instead of caching a degraded one.
 */
async function load<T>(
  label: string,
  loader: () => Promise<T>,
  mock: () => T,
  fallback: () => T,
): Promise<Sourced<T>> {
  if (!isWordPressConfigured) return { data: mock(), source: "mock" };
  try {
    return { data: await loader(), source: "wordpress" };
  } catch (error) {
    const isBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
    const isDev = process.env.NODE_ENV !== "production";
    if (isBuild || isDev) {
      console.warn(
        `[content] ${label}: WordPress request failed; using fallback.\n  ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return { data: fallback(), source: "fallback" };
    }
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function getEvents(): Promise<Sourced<GarnetEvent[]>> {
  const result = await load(
    "Events",
    async () => {
      const data = await wpFetch<WpEventsResponse>(EVENTS_QUERY, { tags: [CONTENT_TAGS.events] });
      return (data.events?.nodes ?? []).map(mapEvent).filter((e): e is GarnetEvent => e !== null);
    },
    () => mockEvents,
    () => [],
  );
  result.data = [...result.data].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
  return result;
}

const DEFAULT_EVENT_LENGTH_MS = 12 * 60 * 60 * 1000;

/** An event stays "upcoming" until it ends (or 12 hours after start if no end is set). */
export function isUpcoming(event: GarnetEvent, now = new Date()): boolean {
  const end = event.endDate
    ? new Date(event.endDate).getTime()
    : new Date(event.startDate).getTime() + DEFAULT_EVENT_LENGTH_MS;
  return end >= now.getTime();
}

export function splitEvents(events: GarnetEvent[], now = new Date()) {
  const upcoming = events.filter((e) => isUpcoming(e, now));
  const recent = events
    .filter((e) => !isUpcoming(e, now))
    .reverse()
    .slice(0, 3);
  return { upcoming, recent };
}

/**
 * Homepage rule: earliest upcoming featured event; otherwise earliest upcoming
 * event; never a past event. Cancelled/postponed events still show, with status.
 */
export function pickHomepageEvent(events: GarnetEvent[], now = new Date()): GarnetEvent | null {
  const upcoming = events.filter((e) => isUpcoming(e, now));
  return upcoming.find((e) => e.featureOnHomepage) ?? upcoming[0] ?? null;
}

// ---------------------------------------------------------------------------
// Road and winter access
// ---------------------------------------------------------------------------

export async function getVisitorStatus(): Promise<Sourced<VisitorStatus | null>> {
  return load(
    "Road report",
    async () => {
      const data = await wpFetch<WpVisitorStatusResponse>(VISITOR_STATUS_QUERY, {
        tags: [CONTENT_TAGS.visitorStatus],
        // Road status is safety-relevant: refresh more often than other content.
        revalidate: 120,
      });
      return mapVisitorStatus(data);
    },
    getMockVisitorStatus,
    () => null,
  );
}

const unavailableReport: RoadReport = {
  status: "Confirm access before leaving",
  note: `Call the BLM Missoula Field Office · ${BLM_PHONE_DISPLAY}`,
  updatedLabel: "Road report unavailable",
  href: "#conditions",
  tone: "caution",
  needsConfirmation: true,
};

/** Applies the safety rules: missing or stale reports never read as "open". */
export function toRoadReport(status: VisitorStatus | null, now = new Date()): RoadReport {
  if (!status) return unavailableReport;

  const verifiedAt = new Date(status.lastVerified);
  const ageDays = (now.getTime() - verifiedAt.getTime()) / 86_400_000;
  const verifiedLabel = `Verified ${formatShortDate(status.lastVerified)}`;

  if (Number.isNaN(ageDays) || ageDays > ROAD_REPORT_STALE_DAYS) {
    return {
      ...unavailableReport,
      status: "Not recently confirmed",
      updatedLabel: Number.isNaN(ageDays) ? "Road report unavailable" : `Last ${verifiedLabel.toLowerCase()}`,
    };
  }

  return {
    status: status.roadStatus,
    note: status.roadNote,
    updatedLabel: status.isSample ? `Sample report · ${verifiedLabel}` : verifiedLabel,
    href: status.reportUrl || "#conditions",
    tone: status.tone,
  };
}

export async function getRoadReport(): Promise<RoadReport> {
  const { data } = await getVisitorStatus();
  return toRoadReport(data);
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

export async function getTimeline(): Promise<Sourced<TimelineEntry[]>> {
  const result = await load(
    "Timeline",
    async () => {
      const data = await wpFetch<WpTimelineResponse>(TIMELINE_QUERY, {
        tags: [CONTENT_TAGS.timeline],
      });
      return (data.timelineEntries?.nodes ?? [])
        .map(mapTimelineEntry)
        .filter((e): e is TimelineEntry => e !== null);
    },
    () => mockTimeline,
    () => mockTimeline, // History is stable; the built-in version is a safe fallback.
  );
  result.data = [...result.data].sort((a, b) => a.sortYear - b.sortYear);
  return result;
}
