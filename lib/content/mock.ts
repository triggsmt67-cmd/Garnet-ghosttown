import type { GarnetEvent, VisitorStatus } from "./types";

// Used only while WORDPRESS_GRAPHQL_URL is unset (local development and design
// review). Contains verified facts only — no invented events.

/**
 * Built per request so the sample event is always upcoming and the homepage
 * event section demonstrates itself in previews. Flagged isSample so the UI
 * can say plainly that the date is a placeholder, not a scheduled event.
 */
export function getMockEvents(): GarnetEvent[] {
  const start = new Date();
  start.setDate(start.getDate() + 21);
  start.setHours(12, 30, 0, 0);

  return [
    {
      id: "mock-step-back-in-time",
      title: "Step Back in Time",
      startDate: start.toISOString(),
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
      isSample: true,
    },
  ];
}


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
