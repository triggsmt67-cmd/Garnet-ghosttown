import type { GarnetEvent } from "./types";

// Schema.org data generated from the same record the page displays,
// so the visible event and its structured data can never disagree.

const GARNET_PLACE = {
  "@type": "Place",
  name: "Garnet Ghost Town",
  address: {
    "@type": "PostalAddress",
    addressRegion: "MT",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.82559,
    longitude: -113.33945,
  },
} as const;

const EVENT_STATUS_URL: Record<GarnetEvent["status"], string> = {
  scheduled: "https://schema.org/EventScheduled",
  postponed: "https://schema.org/EventPostponed",
  cancelled: "https://schema.org/EventCancelled",
  sold_out: "https://schema.org/EventScheduled",
};

export function eventSchema(event: GarnetEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.homepageSummary || undefined,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: EVENT_STATUS_URL[event.status],
    location: GARNET_PLACE,
    image: event.featuredImage?.url,
    url: event.detailsUrl,
    offers:
      typeof event.price === "number"
        ? {
            "@type": "Offer",
            price: event.price,
            priceCurrency: "USD",
            url: event.detailsUrl,
            availability:
              event.status === "sold_out"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
          }
        : undefined,
  };
}

/** JSON for a <script type="application/ld+json">, safe against "</script>" injection. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
