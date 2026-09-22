import type { GarnetEvent, TimelineEntry, VisitorStatus } from "./types";

// Used only while WORDPRESS_GRAPHQL_URL is unset (local development and design
// review). Contains verified facts only — no invented events.

export const mockEvents: GarnetEvent[] = [
  {
    id: "mock-step-back-in-time-2026",
    title: "Step Back in Time",
    startDate: "2026-09-12T12:30:00-06:00",
    homepageSummary:
      "Meet Garnet's 1917 residents inside five historic buildings, then stay for a chili feed, live music, and a street dance. Event ticket is separate from the standard day pass.",
    description:
      "Meet Garnet's 1917 residents inside five historic buildings, then stay for a chili feed, live music, and a street dance. Costumed interpreters bring the mining era to life in ways no sign ever could.",
    price: 20,
    priceNote: "Ages 12 and younger are free",
    detailsUrl: "https://main.glaciermt.io/montana-event/52870",
    featureOnHomepage: true,
    status: "scheduled",
    registrationRequired: false,
  },
];

/** Built per request so the sample never trips the stale-report safeguard. */
export function getMockVisitorStatus(): VisitorStatus {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  return {
    roadStatus: "Wheeled access open",
    roadNote: "Highway 200 route recommended",
    lastVerified: yesterday,
    tone: "open",
    isSample: true,
  };
}

export const mockTimeline: TimelineEntry[] = [
  {
    id: "mock-1860s",
    yearLabel: "1860s",
    sortYear: 1860,
    title: "Gold in the gulches",
    summary:
      "Placer miners work the streams of the Garnet Mountains, washing gravel for free-floating gold.",
  },
  {
    id: "mock-1895",
    yearLabel: "1895",
    sortYear: 1895,
    title: "A town takes shape",
    summary:
      "Dr. Armistead Mitchell builds a stamp mill at the head of First Chance Gulch. A settlement grows around it.",
  },
  {
    id: "mock-1898",
    yearLabel: "1898",
    sortYear: 1898,
    title: "The height of the boom",
    summary:
      "Nearly 1,000 people live in Garnet, supported by hotels, stores, a school, livery stables, and thirteen saloons.",
  },
  {
    id: "mock-1905",
    yearLabel: "1905",
    sortYear: 1905,
    title: "Gold becomes harder to reach",
    summary:
      "Many mines are abandoned and the population falls to roughly 150. A 1912 fire later destroys much of the business district.",
  },
  {
    id: "mock-1940s",
    yearLabel: "1940s",
    sortYear: 1940,
    title: "A ghost town",
    summary:
      "War work draws residents away again. Cabins, furnishings, and commercial buildings are left behind in the mountains.",
  },
  {
    id: "mock-today",
    yearLabel: "Today",
    sortYear: 9999,
    title: "A story kept standing",
    summary:
      "The Bureau of Land Management and Garnet Preservation Association stabilize buildings and interpret the town for new generations.",
  },
];
