# Garnet Ghost Town Website

Visitor-focused Next.js concept for Garnet Ghost Town, built with the App Router,
TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

The current local preview runs at `http://localhost:3002/`.

Validation commands:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Planned WordPress and ACF integration

WordPress will act as a headless content-management system. Next.js will continue
to control the layouts and visual system; WordPress administrators will manage
information that changes regularly.

The first two WordPress-managed content areas should be:

1. Upcoming events
2. Current road and winter-access status

Use either the WordPress REST API or WPGraphQL consistently. If using REST, enable
**Show in REST API** for the Event post type and both ACF field groups. The public
frontend should only request published content and should not contain WordPress
administrator credentials.

Set the WordPress site timezone to **America/Denver** before creating date fields.

---

## Event custom post type

Create a custom post type with:

- Post type label: `Events`
- Post type key: `event`
- Public: Yes
- Has archive: Optional
- Show in REST API: Yes
- Supports: Title, editor, excerpt, featured image, revisions

Use the WordPress title for the event name, the editor for the complete event
description, and the featured image for event photography.

### ACF field group: Event Details

Display this field group when **Post Type is equal to Event**.

| Field label | Field name | ACF type | Required | Notes or example |
|---|---|---:|:---:|---|
| Start date and time | `event_start` | Date Time Picker | Yes | Store in the WordPress site timezone |
| End date and time | `event_end` | Date Time Picker | No | Leave empty for an event with no published ending time |
| Homepage summary | `event_homepage_summary` | Textarea | Yes | Concise description; target 160–240 characters |
| Admission price | `event_price` | Number | No | Numeric value only, such as `20`; use `0` for a free event |
| Admission note | `event_price_note` | Text | No | Example: `Ages 12 and younger are free` |
| Event details URL | `event_details_url` | URL | No | Registration page or authoritative external event page |
| Parking or access advisory | `event_access_advisory` | Textarea | No | Only include current, event-specific guidance |
| Feature on homepage | `event_feature_on_homepage` | True / False | Yes | Default to false |
| Event status | `event_status` | Select | Yes | Choices listed below |
| Registration required | `event_registration_required` | True / False | No | Default to false |

Recommended `event_status` choices:

```text
scheduled : Scheduled
postponed : Postponed
cancelled : Cancelled
sold_out : Sold out
```

### Homepage event-selection rules

- Only published events are eligible.
- Prefer events with `event_feature_on_homepage` enabled.
- If several events are featured, display the earliest future event.
- Never continue showing a past event because the next event is unavailable.
- Show a quiet “No upcoming events currently scheduled” state when necessary.
- Display postponed, cancelled, or sold-out status visibly rather than silently
  removing an event visitors may already know about.
- Format dates in `America/Denver`.

The visible event section and its Schema.org `Event` structured data must be
generated from the same WordPress event record. Do not maintain a separate
hardcoded schema object.

### Suggested frontend event model

```ts
type GarnetEvent = {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
  homepageSummary: string;
  price?: number;
  priceNote?: string;
  detailsUrl?: string;
  accessAdvisory?: string;
  status: "scheduled" | "postponed" | "cancelled" | "sold_out";
  registrationRequired: boolean;
  featuredImage?: {
    url: string;
    alt: string;
  };
};
```

---

## Current road and winter-access status

This information represents one current site-wide status, so it is better suited
to an **ACF Options Page** than a post type.

Suggested options-page title: `Garnet Visitor Status`

### ACF field group: Road and Winter Access

Display this field group on the Garnet Visitor Status options page.

#### Fields required by the current hero

| Field label | Field name | ACF type | Required | Notes or example |
|---|---|---:|:---:|---|
| Road status | `road_status` | Text | Yes | Example: `Wheeled access open` |
| Short road note | `road_note` | Text | Yes | Example: `Highway 200 route recommended` |
| Last verified | `road_last_verified` | Date Time Picker | Yes | Frontend formats this into the update label |
| Status tone | `road_tone` | Select | Yes | Choices: `open`, `caution`, or `closed` |
| Road report URL | `road_report_url` | URL | No | Use an official report URL; otherwise link to `#conditions` |

Recommended `road_tone` choices:

```text
open : Open / Normal access
caution : Caution / Verify before travel
closed : Closed / Winter-only access
```

These fields map to the current `HeroRoadReport` component contract:

| ACF field | Hero property |
|---|---|
| `road_status` | `status` |
| `road_note` | `note` |
| Formatted `road_last_verified` | `updatedLabel` |
| `road_report_url` or `#conditions` | `href` |
| `road_tone` | `tone` |

The current TypeScript contract lives in
`components/hero-conditions.tsx`. Mock values currently live in `app/page.tsx`.

### Recommended supporting fields

These fields are not required by the compact hero display, but they will support
the detailed visitor-planning section and source transparency.

| Field label | Field name | ACF type | Notes or example |
|---|---|---:|---|
| Travel method | `road_travel_method` | Select | `wheeled_vehicle`, `snowmobile`, `ski_or_snowshoe`, `closed` |
| Full access advisory | `road_full_advisory` | WYSIWYG or Textarea | Detailed current guidance |
| Information source | `road_source_name` | Text | Example: `BLM Missoula Field Office` |
| Source URL | `road_source_url` | URL | Official BLM or MDT source |
| Source phone | `road_source_phone` | Text | Example: `406-329-3914` |
| Montana 511 URL | `road_511_url` | URL | `https://www.511mt.net/` |
| Winter trail note | `winter_trail_note` | Textarea | Current snowmobile, ski, or snowshoe guidance |
| Last grooming date | `winter_last_groomed` | Date Time Picker | Leave empty when not reported |
| Groomer tracker URL | `winter_groomer_tracker_url` | URL | Public Missoula Snowgoers Garmin MapShare link |

### Road-status safeguards

- Always show a visible last-verified date.
- Never calculate or infer “road open” from weather or snowfall data.
- If the WordPress response is missing, use the existing cautious fallback:
  `Confirm access before leaving`.
- A closure or winter-only status should visually outrank ordinary weather.
- Montana 511 covers I-90, Highway 200, and some secondary highways, but it
  should not be represented as a live report for Garnet Range Road.
- Keep the BLM Missoula Field Office phone number available for same-day
  confirmation.

### Example ACF-to-hero transformation

```ts
const roadReport = {
  status: fields.road_status,
  note: fields.road_note,
  updatedLabel: `Verified ${formatMountainTime(fields.road_last_verified)}`,
  href: fields.road_report_url || "#conditions",
  tone: fields.road_tone,
};
```

---

## Content refresh strategy

Recommended Next.js behavior:

- Cache public WordPress reads rather than requesting WordPress from every
  visitor’s browser.
- Revalidate events and visitor status every few minutes.
- Add a signed WordPress webhook that calls a Next.js revalidation endpoint when
  an event or visitor status is published or changed.
- Keep the previous verified response during a temporary WordPress outage.
- Use the cautious road-status fallback only when no previously verified response
  is available.

Suggested environment variable:

```text
WORDPRESS_API_URL=https://example.com/wp-json/wp/v2
```

Keep webhook secrets and any authenticated preview credentials in environment
variables. Never commit them to the repository or expose them in client-side
JavaScript.

## Content that should remain outside WordPress

- Live weather should continue to come from the weather API.
- Fire restrictions should continue to come from the official Montana
  restrictions data source.
- Layout, typography, spacing, component behavior, and routine interface labels
  should remain in Next.js.
- Avoid turning every heading or button into an ACF field; expose only content
  administrators genuinely need to maintain.

