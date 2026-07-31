# Garnet Ghost Town Website Project State

## Project

- Name: Garnet Ghost Town visitor website mockup
- Repository or working location: `/Users/trevorriggs/Documents/Garnet Ghost Town Website Mockup Number Two`
- Current site and deployment: Source/reference site at `https://garnetghosttown.org/`; complete local Next.js implementation; no public deployment
- Build type: Fresh redesign/mockup
- Working mode: Autonomous after user approval
- Current stage: Validated local preview
- Last updated: 2026-07-29

## Outcome

- Business or organizational goal: Help seasonal visitors confidently plan and enjoy a trip to Garnet while making its history and preservation feel worth caring about.
- Primary audience: Out-of-town visitors looking for a memorable half-day or day trip within roughly one hour of Missoula, Montana.
- Primary user action: Plan a visit, with directions and seasonal access expectations understood before departure.
- Success measures: Visitors quickly understand what Garnet is, whether and how they can reach it, what the experience includes, and what to prepare for.
- Non-negotiables: Excellent visitor experience; historically respectful presentation; seasonal and road-access information must be prominent and factual.

## Verified evidence

- Business and offer: Garnet is a preserved historic mining town managed by the Bureau of Land Management in partnership with the nonprofit Garnet Preservation Association.
- Brand: Existing positioning emphasizes Garnet as one of Montana's best-preserved ghost towns. The experience is historic, remote, uncommercialized, and embedded in the Garnet Mountains.
- Content and media: Existing public website includes history, directions, trails, nearby activities, cabin rentals, education, events, preservation, and membership. No user-supplied photos are available.
- Users and research: User identifies seasonal tourists and Missoula-area visitors seeking nearby things to do as the primary audience.
- Analytics and search data: Not supplied.
- Technical environment: Next.js 16.2.12, React 19.2.8, Tailwind CSS 4.3.3, TypeScript, npm.
- Claims and trust evidence: BLM currently lists a $10 entrance fee for visitors age 16 and older; those under 16 enter free. BLM says the visitor center is generally open daily from late May through September, 10:00 a.m.–4:30 p.m., depending on weather. The site is open year-round, but winter access is by snowmobile, snowshoes, or cross-country skis. The I-90/Bear Gulch route is steep, narrow, rough, and not recommended for trailers or RVs.
- Visitor-readiness evidence: Recreation.gov confirms no cellular coverage, roughly 6,000-foot elevation, rough minimally maintained roads, limited designated parking, and that a day pass does not guarantee a space. The Highway 200/Garnet Range Road approach is the safer default for ordinary vehicles; the I-90 route is reserved for high-clearance four-wheel-drive vehicles.
- Current-event evidence: "Step Back in Time," a living-history event, is listed for September 12, 2026 at 12:30 p.m.; $20 per person and free for ages 12 and younger.
- Evidence sources:
  - `https://www.blm.gov/visit/garnet-ghost-town`
  - `https://garnetghosttown.org/`
  - `https://visitmt.com/listing/garnet-ghost-town-908`
  - `https://www.recreation.gov/activitypass/AP23157`
  - `https://main.glaciermt.io/montana-event/52870`

## Assumptions requiring confirmation

- Assumption: This mockup should prioritize trip planning over the preservation association's organizational story.
- Why it is reasonable: The named primary audience is seasonal visitors choosing an activity near Missoula.
- What changes if it is wrong: Donation, membership, education, or association governance may need a more prominent conversion path.
- Assumption: "Plan Your Visit" is the primary call to action, with "Get Directions" as the final action.
- Why it is reasonable: Access conditions and route limitations are the greatest sources of visitor uncertainty.
- What changes if it is wrong: The homepage hierarchy and navigation would change.
- Assumption: Copy may be newly written from verified source facts but should not reproduce the existing site's prose.
- Why it is reasonable: The user requested inspiration from the existing site, not duplication.
- What changes if it is wrong: Rights and content-migration requirements would need clarification.

## Architecture

- Recommended sitemap:
  - Home
  - Plan Your Visit
  - Explore Garnet
  - History
  - Preserve Garnet
  - Optional later routes: Events, Education, Winter Cabins, Contact
- Route/template inventory:
  - `/`: Visitor-oriented overview, emotional hook, practical trip snapshot, highlights, history preview, preservation invitation
  - `/visit`: Hours/season, fees, road and vehicle guidance, directions, accessibility, preparation checklist, FAQs
  - `/explore`: Historic buildings, self-guided experience, trails, picnic/visitor center, nearby activities
  - `/history`: Editorial timeline and stories of Garnet's boom, decline, and preservation
  - `/preserve`: BLM/Garnet Preservation Association roles, preservation case, verified ways to support
- Navigation: Home; Plan Your Visit; Explore; History; Preserve. Persistent high-visibility "Plan Your Visit" action.
- Conversion paths:
  - Search/social/referral visitor → Home → Plan Your Visit → Directions
  - Ready-to-go visitor → Plan Your Visit → Seasonal status and route choice → Directions
  - Curious visitor → Explore or History → Plan Your Visit
  - Engaged visitor → History → Preserve Garnet
- Indexation rules: All substantive public routes indexable; no thin seasonal or keyword-only location pages.

## Design system

- Design principles: Visitor-first historical editorial; refined, restrained, tactile, and historically suggestive without theme-park Western styling or Halloween cues. The first viewport identifies Garnet as a preserved 1890s Montana mining town, establishes its proximity to Missoula, and hands visitors directly to planning, exploration, directions, and live conditions.
- Typography: Newsreader at a consistent medium weight for narrower, more refined display type; Barlow for compact labels, navigation, and readable body copy. Inter is not loaded or used. Hero and route-title scales were reduced so the typography feels editorial rather than poster-like.
- Color roles: A restrained Mount Vernon–informed system replaces the former multi-hue mineral palette: midnight (`#0d1218`) and colonial navy (`#0e1c27`) anchor immersive surfaces; warm white and stone form the reading ground; oxblood (`#33191a`) handles urgent historical panels; Washington red (`#a8333d`) is reserved for primary action; brass (`#d3b350`) is a narrow accent. Photography now supplies nearly all natural color.
- Spacing and layout: Fluid editorial type, generous section pacing, asymmetric desktop composition, and reordered single-column mobile layouts.
- Imagery and icons: Four original AI-generated mockup images in `public/images` receive restrained sepia/desaturation treatments. Minimal line icons are code-native. Replace generated scenes with verified real Garnet photography before an official public launch unless their illustrative nature is clearly disclosed.
- Components and states: A live fire-status strip above the transparent-to-solid sticky navigation, responsive menu with an inert collapsed state, primary/secondary actions, editorial route heroes without decorative page numbers, live weather integrated into the homepage hero, a three-link visitor utility bar, an early event announcement, immersive split-image story sections, one contextual admission/pass/parking panel, a four-season tabbed editorial panel, global preservation handoff, timeline, trail details, external-link treatments, custom 404, and visible keyboard focus.
- New visitor-discovery components: Seasonal access now contains the source-backed winter cabin application/BLM handoffs instead of interrupting the homepage as a standalone feature. The Explore route retains an interpretive town sketch with accessible building controls, a changing building-note panel, and five statically generated building-story routes; duplicate numbered controls were removed.
- Motion: The homepage uses one signature “Entering Garnet” sequence: the hero holds for a short additional scroll, the sepia treatment opens into natural color along the town road, the introduction recedes, the image advances subtly, and the event follows immediately after the visitor utility strip. Pointer depth, staged entry, intersection reveals, seasonal panel changes, navigation transitions, and restrained button feedback remain secondary; the pinned sequence collapses under `prefers-reduced-motion`.
- Accessibility constraints: Trip-critical details do not rely on imagery, color, hover, or animation. Semantic landmarks, ordered headings, descriptive image alternatives, a skip link, accessible mobile-menu states, and visible focus are implemented.

## Content and SEO

- Voice: Clear, grounded, inviting, historically respectful, and practical.
- Page briefs: Initial briefs recorded in route inventory.
- Metadata and canonical plan: Unique route titles/descriptions, shared title template, canonical base placeholder at `https://garnetghosttown.org`, and homepage social metadata are implemented. Canonical production host must be confirmed before publication.
- Structured data: Consider `TouristAttraction`, `Place`, `BreadcrumbList`, and supported `Event` data only where visible facts are current.
- Internal linking: Every experience/history route should link naturally to trip planning; preservation content should be available without interrupting the planning flow.
- Unsupported or owner-controlled claims: Live road conditions, exact daily operating status, current events, accessibility specifics, membership benefits, donation handling, and photo rights require confirmation or an authoritative live source. Fire-restriction categories are read from the official Montana interagency map for Garnet's coordinates and still require a day-of check.

## Technical plan

- Framework and package manager: Next.js App Router with TypeScript and npm; Tailwind CSS v4.
- Rendering and content source: Fully static prerendered routes; source-backed content is maintained in route components.
- Integrations: Google Maps directions handoff, official BLM and Recreation.gov visitor-information handoffs, BLM road-condition telephone link, Open-Meteo current weather at Garnet's coordinates with a National Weather Service forecast fallback, Montana DNRC's public ArcGIS fire-restrictions layer queried at Garnet's coordinates with an official MT Fire Info map and BLM Missoula Field Office fallback, Glacier Country event handoff, Garnet Preservation Association support handoff, and telephone link. No form, newsletter, donation-processing, or analytics integration is claimed.
- Winter-rental handoff: Recreation.gov currently handles the Garnet day-use pass, not the winter cabin application. Winter visitors are sent to the official Garnet cabin page and BLM phone number; the site does not imply that Recreation.gov books those cabins.
- Road-status handoff: The homepage hero now accepts a typed road-report object (`status`, `note`, `updatedLabel`, `href`, and `tone`) populated with clearly labeled mock data. Replace that object with the future WordPress/ACF response; retain a visible last-verified label and do not present weather-derived estimates as road status.
- Environments: Local only at present.
- Deployment: Pending; no publication authorized.
- Acceptance criteria: Static production build succeeds; primary routes return 200; unknown route returns branded 404; lint and type checks pass; homepage and visit route inspected at 1440px and 390px; mobile navigation and reduced-motion support implemented; no horizontal overflow or browser-console errors.

## Decisions

| Decision | Reason and evidence | Approved or assumed | Affected stages |
|---|---|---|---|
| Make trip planning the primary journey | User named seasonal Missoula-area visitors; access has meaningful seasonal and vehicle constraints | Approved | Architecture, content, design, implementation |
| Use newly written source-backed copy | Preserves factual value without copying the reference website | Approved through autonomous implementation | Content, SEO |
| Keep the primary navigation compact | Visitors need a fast path to practical information; current source navigation fragments related activities | Approved through autonomous implementation | Architecture, design |
| Use cinematic historical storytelling | The audience needs emotional motivation to accept a remote mountain drive while the committee needs to see preservation treated seriously | Assumed under autonomous direction | Design, imagery, motion, copy |
| Build with Next.js and Tailwind CSS | Explicit user request | Approved | Technical plan, implementation |
| Let desire precede logistics on the homepage | User explicitly rejected the former conditions-first stack and approved a narrative-led rebuild | Approved | Architecture, content, design, implementation |
| Remove model-generated component grammar | User identified decorative numbers, repeated eyebrows, and card patterns as obvious AI tells | Approved | Design system, shared components, route templates, copy |

## Quality findings

| Severity | Route/component | Evidence | Resolution | Verified |
|---|---|---|---|---|
| High | Global visitor information | Operating dates/hours vary by season and weather; source-site wording differs from current BLM wording | BLM treated as authority; seasonal qualifiers and official verification links included | Yes |
| High | Directions | One approach is unsuitable for RVs/trailers and both involve remote gravel roads | Route comparison and vehicle warning appear before map handoff | Yes |
| Blocker for official publication | Imagery | No supplied or licensed real Garnet photography; current scenes are generated mockup artwork | Replace with attributable real photography or explicitly approve and disclose generated illustrative imagery | Open; does not block local concept review |
| Low | Development dependency audit | npm reports transitive development-only advisories | Production audit is clean after safe PostCSS and Sharp overrides | Yes |
| High | Visitor readiness | Initial build omitted cell-service, limited-parking, current-weather, and same-day road-condition guidance | Added live weather/elevation, offline/pass instructions, limited-parking guidance, safer route recommendation, and BLM phone verification | Yes |
| Medium | Homepage engagement | Initial versions alternated between storytelling and trip logistics without a coherent reason for the next scroll | Re-authored the sequence as comprehension → historical desire → on-site experience → preparation → seasonal choice → current event → preservation | Yes |
| High | Submitted seasonal details | Submitted operating hours, parking capacity, road names, and current fire status conflict with or exceed current official evidence | Used current BLM/Recreation.gov hours and route names; omitted unverified parking capacity and recurring July–August programming; made fire status an authoritative live link | Yes |
| Medium | Seasonal planning depth | Seven expandable field notes repeated information from the live conditions board and felt like documentation | Replaced them with one four-season editorial selector; each season explains only what changes, with official handoffs where needed | Yes |
| Medium | Winter trip discovery | The standalone winter cabin feature interrupted the dominant day-visit story before visitors understood the town | Moved winter access, primitive facilities, cabin application, and BLM contact details into the Winter state of the seasonal selector | Yes |
| Medium | Building discovery | The explore route listed building types but gave visitors no way to orient themselves or continue into individual stories | Added an explicitly interpretive (non-navigation) town sketch, five selectable landmarks, and five source-linked building pages | Yes |
| High | Copy credibility | Two presentation lines were styled as quotations without a named source; several sections relied on generic contrast slogans | Removed quotation styling and rewrote the affected homepage, Explore, History, Preserve, seasonal, and footer copy around concrete visitor details | Yes |
| Low | Town map geography | Exact building coordinates suitable for wayfinding were not available from an unrestricted authoritative public dataset | Map is intentionally schematic and visibly labeled “Not intended for navigation”; official map/directions remain separate | Yes |
| High | Visual art direction | The first palette pass relied too heavily on muted pine, beige, and garnet; the Bitter display face was too round and heavy at large sizes | Reframed the system as mineral editorial, moved all display roles to Newsreader, reduced hero/title scales, expanded color roles, and introduced stronger high-contrast section fields | Yes |
| Medium | Seasonal field guide | The seven-card accordion was visually repetitive and unattractive when opened | Replaced the entire card system with text tabs and one large image-led information panel with native tab semantics | Yes |
| Medium | Sitewide preservation handoff | Preservation support appeared only as a small late-page link and was easy to miss | Added a global, source-conservative preservation banner above every footer with a direct official membership/support handoff | Yes |
| High | Summer fire readiness | Fire restrictions were present only as a static expandable note and could be missed before departure | Added a prominent coordinate-specific status card on the homepage and Visit route, backed by Montana DNRC's public restrictions layer, official map handoff, cautious day-of language, failure state, and BLM Missoula Field Office phone fallback | Yes |
| High | First-10-second comprehension | The former poetic hero required visitors to infer that Garnet is a preserved 1890s mining town and delayed useful trip decisions behind an animated ticker | Rewrote the hero to identify the place and experience explicitly, surfaced distance/context in plain language, and placed access, directions, and live conditions in a three-link utility bar immediately below it | Yes |
| High | Palette cohesion | The former green, magenta, rust, mustard, blue, purple, and pastel system made adjacent sections compete and read as templated | Audited Mount Vernon's rendered interface and replaced the rainbow system with midnight/navy, oxblood/red, brass, warm white, and stone; photography now supplies the natural hues | Yes |
| Medium | Conditions hierarchy | Four equally weighted saturated cards made weather, roads, fire, and offline preparation feel like unrelated modules | Rebuilt the area as one conditions board with a dominant live-weather panel and a grouped fire/road/offline decision stack | Yes |
| High | Homepage narrative flow | Conditions, seasonal cards, winter rentals, experience content, and a second road-planning section were stacked in the order they were built rather than the order visitors think | Moved historical and on-site experience content before logistics, consolidated road/pass/weather/fire information once, folded winter into season, and removed the late duplicate planning section | Yes |
| High | AI-generated design tells | Decorative route numbering, numbered feature cards, repeated eyebrows, giant numeral watermarks, circular CTAs, and formulaic section templates made the site feel assembled by a model | Removed decorative route and feature numbers, eliminated homepage eyebrows, replaced grids of numbered cards with editorial rows or tabs, simplified CTAs, removed repeated map numbering, and rewrote contrast-slogan copy around concrete details | Yes |
| High | Opening utility hierarchy | Weather, fire, road, pass, and parking information competed inside a large dashboard, while the event remained below most of the page | Moved live weather into the hero, placed coordinate-specific fire status above navigation, elevated the verified event directly after the opening utility strip, and replaced the dashboard with a single contextual admission/pass/parking decision panel | Yes |
| Medium | Scroll engagement | The narrative copy was stronger than the scrolling experience; the first scroll did not materially change the visitor’s sense of entering the town | Added one short, non-hijacking pinned hero transition with a sepia-to-color road reveal and subtle visual advance; kept the rest of the page calm and included a reduced-motion fallback | Yes |
| Medium | Mobile navigation focus | The collapsed CSS-grid menu remained present in the accessibility tree and could expose hidden links to keyboard users | Added `inert` and `aria-hidden` while collapsed; verified hidden links leave the accessibility snapshot and return when the menu opens | Yes |

## Gate status

- Strategy and architecture: Approved
- Visual direction and representative page: Completed under autonomous direction
- Validated preview: Sixth-pass local preview completed; production build, lint, production dependency audit, desktop and 390px mobile first viewports, the “Entering Garnet” transition, weather and fire states, event handoff, contextual admission/pass/parking section, mobile navigation accessibility, heading sequence, horizontal overflow, and browser console validated
- Publication authorization: Not granted

## Next action

- Next stage: User review, then photography replacement and publication planning if requested
- Required input: Public deployment authorization and final photography decision
- Responsible skill or capability: `build-premium-website`; hosting workflow only after authorization
