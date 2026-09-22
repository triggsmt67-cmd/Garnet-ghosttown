// Mountain Time helpers. Garnet content is always entered and displayed in
// America/Denver, regardless of where the server runs.

export const SITE_TIME_ZONE = "America/Denver";

/** Offset like "-06:00" for a given instant in America/Denver. */
function denverOffset(date: Date): string {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE_TIME_ZONE,
    timeZoneName: "longOffset",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;

  // "GMT-06:00" -> "-06:00"; "GMT" -> "+00:00"
  const offset = part?.replace("GMT", "") ?? "";
  return offset || "+00:00";
}

/**
 * Normalize a WordPress/ACF date-time string to ISO 8601 with a Denver offset.
 * Accepts values that already carry an offset, or naive "YYYY-MM-DD HH:mm:ss"
 * / "YYYY-MM-DDTHH:mm:ss" values entered in the WordPress site timezone.
 */
export function toDenverISO(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(" ", "T");

  if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    const parsed = new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? undefined : trimmed;
  }

  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2})(?::(\d{2}))?)?$/);
  if (!match) return undefined;

  const [, day, hm = "00:00", ss = "00"] = match;
  const local = `${day}T${hm}:${ss}`;
  // Two passes handle DST boundaries: guess the offset, then confirm it.
  const guess = new Date(`${local}Z`);
  const offset = denverOffset(new Date(`${local}${denverOffset(guess)}`));
  return `${local}${offset}`;
}

export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: SITE_TIME_ZONE,
  });
}

/** "Saturday · 12:30 p.m." */
export function formatEventDayTime(iso: string): string {
  const date = new Date(iso);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long", timeZone: SITE_TIME_ZONE });
  const time = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: SITE_TIME_ZONE })
    .replace("AM", "a.m.")
    .replace("PM", "p.m.");
  return `${weekday} · ${time}`;
}

/** "Sep 21" */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: SITE_TIME_ZONE,
  });
}
