# Customer review story snapshot

The website includes a snapshot of the 13 published local WordPress stories and their five referenced image files, exported October 21, 2026. It preserves titles, story text, captions, alternative text, credits, related stories and image order. Drafts are excluded. Media lives in `public/images/story-snapshot/`; original WordPress files are untouched.

`lib/content/story-snapshot.json` contains the published GraphQL response with local media references replaced by website image paths. Existing mapping/sanitization remains in use. The snapshot supplies stories only when no WordPress endpoint is configured, or production points to a `.local` hostname. Local development with WordPress continues reading current CMS content. A configured hosted CMS remains authoritative; its errors never silently replace current content with this snapshot.

To refresh from the running local `garnet-cms.local` site, run:

```sh
python3 scripts/export-story-snapshot.py
```

The exporter rejects an empty result, GraphQL errors, pagination beyond its 200-story limit, missing media and unresolved local URLs. It copies only referenced media from the local uploads folder. Review the resulting content/images before committing and deploying. WordPress edits made after export appear publicly only after refreshing and deploying another snapshot. Hosted CMS setup and migration remain pending.
