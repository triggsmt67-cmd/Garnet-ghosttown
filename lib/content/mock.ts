import type { GarnetEvent, VisitorStatus } from "./types";

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
    detailsUrl: "/events",
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


export { mockStories } from "./mock-stories";
