# Garnet Ghost Town: handoff (as of 2026-09-22)

Read this first in a new session. It summarizes what's built, how the local
WordPress is set up, what's waiting on the client, and what's next.

## Where the code is

- Repo: `triggsmt67-cmd/Garnet-ghosttown`, branch **`wp-data-layer`** (not yet
  merged to `main`). Trevor edits in the Antigravity IDE and prefers paste-ready
  prompts for its agent over manual steps.
- Next.js 16 App Router, React 19, Tailwind 4, TypeScript. Headless WordPress via
  WPGraphQL + ACF. See `README.md` for field names and setup.

## What's built

| Area | Where | Notes |
|---|---|---|
| Content data layer | `lib/content/` | Server-only. Mock data when `WORDPRESS_GRAPHQL_URL` is unset; in dev, WordPress errors log `[content]` warnings and fall back instead of crashing |
| Events | `app/events`, `components/event-banner.tsx` | Past events auto-hide; schema generated from the same record |
| Road report | `toRoadReport()` in `lib/content/index.ts` | Reports older than 7 days show "Not recently confirmed" plus the BLM phone number |
| Stories of Garnet | `app/stories/[slug]`, `lib/content/mock-stories.ts` | Main content type: people, families, places. Voice quote, document excerpts (`--` citation lines), related stories, map-building links |
| History timeline | `app/history`, `lib/content/timeline.ts` | Built only from stories, grouped into 5 eras; A-to-Z story index. Timeline Entries post type was **removed** |
| Fire restrictions | `lib/fire.ts` | Server-fetched every 15 min; queries a Missoula County point (client confirmed that jurisdiction); UI names the county |
| Revalidation | `app/api/revalidate`, `wordpress/mu-plugins/garnet-revalidate.php` | mu-plugin also auto-stamps the road report's "Last checked" time |
| WordPress setup files | `wordpress/` | `acf-import.json` (needs ACF Pro), `acf-import-free.json` (no Road Report), `garnet-stories-import.xml` (7 stories), `story-paste-sheet.md` |

## Local WordPress (Trevor's Mac)

- LocalWP site **`garnet-cms`** → `http://garnet-cms.local`; `.env.local` has
  `WORDPRESS_GRAPHQL_URL=http://garnet-cms.local/graphql`.
- **PHP version was changed** in Local to fix a macOS crash (502/503 on wp-admin).
  Keep it on the current version.
- Plugins: WPGraphQL, WPGraphQL for ACF, **free ACF** (not Pro yet).
- Imported `garnet-acf-import-v3-stories.json` (free version). The seven stories
  XML was provided for Tools → Import → WordPress (confirm it was imported).
- mu-plugin is installed in `wp-content/mu-plugins/`.
- **Pending cleanup:** trash the leftover **Timeline Entries** post type and
  **Timeline Details** field group in ACF.
- Events query confirmed working (no warnings). The event **time display is
  unverified**: confirm 12:30 p.m. in WordPress shows as 12:30 p.m. on the site.
- Expected warning until ACF Pro: `[content] Road report: … garnetVisitorStatus`.

## Waiting on the client

Verification email sent (Trevor has the text). Open items:
- Spellings: Leshou/Lehsou, Philip/Phillip, Ritchie/Ritchey, Warren Park/Warren's Park.
- Warren Park: Edward or Frank Warren? (The Events page says Frank.)
- Leshou: the "secret legacy of gold" line (cut pending the real story), the $16/oz
  figure (removed), and the Bozeman Trail wording (needs approval).
- Sources: Frank Fitzgerald quote; John Toole passages (possible copyright,
  long excerpts); the original 1898 Butte Daily Post clipping.
- Seadin: school name in 1923; Kelly descendants still visiting yearly?
- Story collection plan (~20 stories) is at the bottom of `wordpress/story-paste-sheet.md`.

## Next steps (suggested order)

1. **ACF Pro** → re-import `acf-import.json` → Road Report page works.
2. **Simplify the WordPress admin for non-technical editors:** Editor role, hide
   unneeded menus, a dashboard with three big buttons (Update road report / Add an
   event / Add a story), a phone-friendly road report screen.
3. **Working Preview button** (Next.js `draftMode` plus an authenticated GraphQL request).
4. Earlier review items not yet done: remove `unoptimized` from `next/image` once
   real photos are in; move hard-coded colors to Tailwind `@theme` tokens; split the
   371-line homepage into section components; remove or wire up the hard-coded
   "4.7 · 1,171 Google reviews" badge (the avatars are broken).
5. **Deployment:** WordPress on `cms.garnetghosttown.org`. DNS and email for
   garnetghosttown.org run through **Intertune** (the site is on DigitalOcean), so
   DNS changes must not break the association's email. Trevor emailed the client
   to find out who holds the Intertune account. Frontend on Vercel (or similar),
   with `REVALIDATE_SECRET` and the mu-plugin constants set.
6. Merge `wp-data-layer` into `main` when Trevor has reviewed it.

## Things to know

- Sandbox builds can't reach Google Fonts; verify builds with fonts stubbed in a
  scratch copy (don't commit that).
- `lib/content/mock-stories.ts` is the source for `story-paste-sheet.md` and
  `garnet-stories-import.xml`; regenerate both if the stories change.
