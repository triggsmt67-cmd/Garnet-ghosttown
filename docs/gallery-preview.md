# WordPress photo gallery integration — October 21, 2026

The local gallery is connected to the running `garnet-cms.local` WordPress site. The installed MU plugin is `wordpress/mu-plugins/garnet-photo-galleries.php`. It creates **Photo Galleries**, native bulk-upload/reorder Gallery blocks, ACF album fields, attachment photo-credit fields, a built-in editor help page, and paginated WPGraphQL photo fields. It works with the installed free ACF 6.8.10; ACF Pro is not required for this gallery. Road status now uses the existing Current Updates schema, with the BLM confirmation fallback retained.

Six demonstration albums and 21 unique media attachments were imported from existing website assets. All albums retain their sample flag. No historical dates, names, or photo credits were invented. The association still needs to approve and supply final selections, descriptions, and credits.

## Code and refresh behavior

- `lib/gallery-types.ts`: frontend models, independent of WordPress.
- `lib/gallery-preview.ts`: labeled design-review fallback only.
- `lib/content/galleries.ts`: server-only published album queries, first-photo cover fallback, ordering, metadata mapping, and bounded photo pages. Album index requests one photo per album; an album page requests 24.
- `app/api/gallery/[slug]/photos/route.ts`: next-photo pages; published albums only, cursor validation, no client-controlled fetch URL.
- `components/album-photo-grid.tsx`: loads additional batches and advances the photo viewer across page boundaries.
- `photo-galleries` cache tag is accepted by the existing revalidation endpoint. WordPress album saves, ACF updates, attachment alt/credit edits, and unpublishing/deletion invalidate this tag. Local frontend refresh configuration was added without printing or committing the shared secret. Production also has a 60-second refresh fallback.
- A configured public CMS remains authoritative. Published empty albums are omitted; drafts never become public. Development failures may show labeled examples; public production runtime errors preserve Next’s last successful cache instead of inserting fake content.
- A production build pointing at a `.local` hostname uses the labeled local examples, following the existing preview pattern. This is not a hosted CMS connection. Replace the endpoint at launch.

## Verification completed

- PHP syntax, lint, TypeScript, and production build.
- Native WordPress Gallery block loaded with editable photos/captions and no invalid-block warning; ACF description, cover, ordering, and sample fields visible.
- Description edited and saved through the actual WordPress editor appeared in rendered HTML; original wording restored afterward.
- Local WordPress-to-frontend revalidation returned HTTP 200 with the gallery tag.
- Isolated 26-photo fixture: draft hidden, publish visible, first render contained 24 photos, next API page contained the remaining 2 in order without duplicates.
- Real browser Load more button produced 26 photos and no failed loaded images; photo viewer advanced from photo 24 to 25 by fetching the next page.
- Photo reorder, cover change, description edit, and attachment credit/alt edits reached the frontend/API.
- Unpublishing removed the fixture from public GraphQL, the page, and photo API. Temporary album and five temporary attachments were removed; six demonstration albums remain.

## Local backup

Before gallery writes, a database dump, MU-plugin copies, and a private wp-config backup were saved outside the repository in `/Users/trevorriggs/Local Sites/garnet-cms/backups/gallery-2026-10-21/`. This backup contains configuration/database information and must not be committed or publicly served.

## Hosted launch still required

Install the MU plugin and its `garnet-gallery-assets/album-editor.js` companion on hosted WordPress alongside ACF, WPGraphQL, WPGraphQL for ACF, and the existing frontend-sync plugin. Migrate gallery records/media through a normal WordPress migration. Set the public GraphQL endpoint in the frontend, configure the hosted frontend URL and shared revalidation secret in WordPress, and verify the full editor → website flow on that deployment. Approve sample selections/credits, disable sample flags, and remove gallery noindex metadata only when ready to launch.

Editor instructions: `docs/gallery-editor-guide.md` and **Photo Galleries → How to manage photos** inside WordPress.

## Large-image handling

The gallery plugin registers a non-cropped `garnet-gallery-display` image size bounded to 2048 × 2048. New uploads anywhere in Media Library generate this derivative, and gallery photo responses use it instead of the original/full-size file. Explicit album covers use the same bounded `garnetGalleryImage` GraphQL field; Next Image still optimizes thumbnail delivery. Small images fall back to their existing size. Covers/grids use CSS object-cover in fixed aspect-ratio boxes; the full-photo viewer uses object-contain, so portrait and landscape files retain their proportions. WordPress retains original files; this is display optimization, not an archive-storage limit. Guidance is shown in Album Details, the WordPress help page, and the editor guide. Older media imported before the size was registered need scoped regeneration before the display-size guarantee applies to them.

Verified with real WordPress media imports: 4000 × 3000 JPEG → 2048 × 1536 display copy; 3000 × 4000 PNG → 1536 × 2048 display copy. Original dimensions were retained. Desktop and mobile viewing showed the full portrait composition with object-contain and no horizontal overflow. Temporary verification album and uploads were removed afterward.

## Album-first editor guidance

The album list includes Add photos actions. A persistent native editor notice names the destination album and opens the image picker; selected images append to the existing Gallery block without replacing it or duplicating existing attachment IDs. Save/Publish is still required. Media upload screens explain that library uploads have no automatic album membership. Photo Gallery is linked under Get Involved on desktop and mobile. Deploy the companion JavaScript directory with the MU plugin.

## Reliability update

Photo cursors contain an album membership/order fingerprint. Changing those images invalidates old cursors with `GARNET_ALBUM_CHANGED`; the frontend returns HTTP 409 and offers Refresh album rather than combining incompatible pages. Captions and credits can change without resetting order. Older position-only cursors also request a refresh.

For older media missing the custom size, the plugin selects the largest existing proportional derivative bounded to 2048 pixels. Cropped derivatives are excluded from the full-photo viewer. Small originals are allowed. An oversized image without any suitable derivative is omitted from public counts/photos until its sizes are regenerated; this also applies to explicit covers, which fall back to the first eligible album photo. Upload guidance remains advisory. Inspect/regenerate image sizes during migration so approved photos do not disappear from the selection.

CMS requests have a 10-second deadline; browser pagination requests have a 15-second deadline and retain the retry message. Install the updated MU plugin before updating the frontend because the cover query now uses its `garnetGalleryImage` field.
