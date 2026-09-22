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

## WordPress and ACF integration

WordPress is a headless content-management system. Next.js controls every
layout and visual decision; WordPress editors only fill in forms.

### How content flows

- All WordPress reads go through `lib/content/` (server-only). Components never
  see raw WordPress data.
- **With `WORDPRESS_GRAPHQL_URL` unset, the site runs on built-in sample content**
  (`lib/content/mock.ts`). No WordPress install is needed to develop the frontend.
- Queries live in `lib/content/queries.ts`; mapping and validation live in
  `lib/content/wordpress.ts`. If a GraphQL field name changes in ACF, change it
  in `queries.ts` and the matching type in `wordpress.ts` only.
- Copy `.env.example` to `.env.local` to connect a WordPress install.

### Required WordPress plugins

- ACF Pro
- WPGraphQL
- WPGraphQL for ACF (the official ACF-maintained plugin)

Set the WordPress site timezone to **America/Denver** before creating date fields.

**Fast setup:** ACF → Tools → Import → choose `wordpress/acf-import.json`. It creates
the Events and Stories post types, the Road Report options page, and their field
groups with the GraphQL names below. Then Tools → Import → WordPress →
`wordpress/garnet-stories-import.xml` adds the first seven stories. Then copy
`wordpress/mu-plugins/garnet-revalidate.php` into `wp-content/mu-plugins/`.

If building by hand instead, turn on **Show in GraphQL** in every ACF item and use
the GraphQL names listed.

---

## Event custom post type

Create a custom post type with:

- Post type label: `Events`
- Post type key: `event`
- Public: Yes
- Has archive: Optional
- Show in GraphQL: Yes · GraphQL single name `event` · plural `events`
- Supports: Title, editor, featured image, revisions

Use the WordPress title for the event name, the editor for the complete event
description, and the featured image for event photography.

### ACF field group: Event Details

Display this field group when **Post Type is equal to Event**.
GraphQL field name: `eventDetails`. Each field's GraphQL name is its field name
in camelCase (for example, `event_start` → `eventStart`).

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

The frontend model is `GarnetEvent` in `lib/content/types.ts`. Selection rules
are implemented in `lib/content/index.ts` (`pickHomepageEvent`, `splitEvents`).
An event counts as upcoming until its end time, or 12 hours after its start
when no end time is entered.

---

## Current road and winter-access status

This information represents one current site-wide status, so it is better suited
to an **ACF Options Page** than a post type.

Options page shown to editors as **Road Report** (menu slug
`garnet-visitor-status`, capability `edit_posts` so Editors can use it) · GraphQL
type name `GarnetVisitorStatus` (queried as `garnetVisitorStatus`).
`road_last_verified` is stamped automatically on save by the mu-plugin.

### ACF field group: Road and Winter Access

Display this field group on the Garnet Visitor Status options page.
GraphQL field name: `roadAndWinterAccess`.

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

### Stale-report safeguard (implemented)

`toRoadReport()` in `lib/content/index.ts` turns the ACF fields into the hero's
`RoadReport`. If `road_last_verified` is older than 7 days
(`ROAD_REPORT_STALE_DAYS`), or the report is missing, the hero shows
“Not recently confirmed” with the BLM phone number instead of the saved status.
An unrecognized `road_tone` is treated as `caution`, never `open`.

---

## Stories of Garnet

Long-form stories about places, families, and people (for example, Kelly's
Saloon, or Samuel and Jennie Adams). Each story gets its own page at
`/stories/<slug>`, appears on the History page, and can link to a building on the
Explore map.

- Post type: `Stories` · key `garnet_story` · GraphQL `garnetStory` / `garnetStories`
- Field group: `Story Details` · GraphQL `storyDetails` (lead-in, time frame,
  starting year, story type, main photo and credit, "Voice from Garnet" quote,
  speaker and source, map building, source name and link)
- The editor holds the story text. It is sanitized in `lib/content/sanitize.ts`
  (paragraphs, emphasis, links, quotes, lists, images only).
- **The History timeline is built entirely from stories**, each placed at its
  "Year on the timeline" (`startYear`). There is no separate timeline post type.
- The timeline is grouped into five eras defined in `lib/content/timeline.ts`
  (Early Claims, The Boom, Lean Years, The Last Residents, Preservation).
- Quoted source material: editors use the editor's Quote button, then a line
  starting with `--` for the citation (styled via `.excerpt-cite`).
- `story_related_stories` (GraphQL `relatedStories`) links up to 3 stories.
- Story types: place, family, person, community, organization.
- `wordpress/story-paste-sheet.md` has the first two stories ready to paste.
- Free ACF: import `wordpress/acf-import-free.json` (no Road Report page).

## Content refresh strategy (implemented)

- WordPress is read on the server and cached with tags (`events`,
  `visitor-status`, `stories`). Visitors never request WordPress directly.
- Background refresh: road status every 2 minutes, other content every 5.
- On save, `wordpress/mu-plugins/garnet-revalidate.php` POSTs to
  `/api/revalidate` with the `x-revalidate-secret` header, so edits appear on
  the next page load.
- If WordPress is down at runtime, Next.js keeps serving the last good page.
  If it is down during a build, pages build with cautious fallbacks.

Environment variables (see `.env.example`):

```text
WORDPRESS_GRAPHQL_URL=https://cms.garnetghosttown.org/graphql
REVALIDATE_SECRET=<openssl rand -hex 32>
```

Never commit secrets or expose them in client-side JavaScript.

## Content that should remain outside WordPress

- Live weather should continue to come from the weather API.
- Fire restrictions come from Montana DNRC's restrictions layer, fetched on
  the server every 15 minutes (`lib/fire.ts`). The query point is inside
  **Missoula County**, the jurisdiction confirmed to govern Garnet visitors, and
  the UI names that jurisdiction.
- Layout, typography, spacing, component behavior, and routine interface labels
  should remain in Next.js.
- Avoid turning every heading or button into an ACF field; expose only content
  administrators genuinely need to maintain.

