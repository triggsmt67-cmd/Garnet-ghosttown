# Additional story photographs

Implemented locally on October 21, 2026. Existing stories and their selected main photos are preserved.

## Editing

1. Open a Garnet Story. Keep **Main photo** for its header and History timeline thumbnail.
2. In **Additional story photos**, choose **Add photos**. In the native WordPress media window, use **Upload files** for new photographs or **Media Library** for existing ones. Click several photos, then choose **Add to story**. Previously selected photographs are skipped automatically.
3. Drag thumbnails into the desired order, or use each photo's left/right buttons. **Remove** unlinks a photograph from this story without deleting the media file. Up to 30 photos are supported.
4. Save/update the story, then reload its website page. Closing the media window without choosing Add to story leaves selections unchanged.

Give each media item useful alternative text, a caption, and a photo credit. Captions and credits belong to the shared media item, so editing them affects every place that uses that photograph.

Additional photographs appear in **Photographs from this story**, below the text and sources and above connected/next stories. The section is omitted when empty. Click a photograph to see its full proportions, caption, credit, and next/previous controls. Escape closes the viewer. The main photograph and duplicate selections are excluded from this section automatically. No editor needs to put photographs inside story prose.

This works with free ACF, using a custom image field with WordPress’s native media picker. Existing ordered attachment IDs from the earlier Relationship field are retained without migration. New uploads retain originals; display images use the existing gallery plugin's proportional size bounded to 2048 pixels. Older oversized uploads without a suitable display derivative need image-size regeneration before they can appear.

## Installation and deployment order

Install `wordpress/mu-plugins/garnet-story-photos.php` **and its `garnet-story-assets/` companion directory** on WordPress **before deploying the frontend**, alongside the existing `garnet-photo-galleries.php` and its companion assets, ACF, WPGraphQL, WPGraphQL for ACF, and the frontend revalidation plugin. The new plugin extends the current Story Details group without requiring a database reimport. Both ACF import files also include the field for new installations. Do not delete or replace an existing field group to add it.

The plugin adds `GarnetStory.storyPhotos`, returning ordered, bounded display-image metadata. Frontend story queries require that schema. Story saves invalidate the existing `stories` tag; attachment caption/alt/credit/size changes and deletion also invalidate it. The five-minute fallback remains in place.

Installed on `garnet-cms.local` only. Hosted WordPress installation and frontend deployment remain pending.

## Verification

Checked against the local WordPress GraphQL schema. The native WordPress editor was tested with a temporary draft: selecting multiple images, appending without duplicates, reordering with move buttons, saving/reloading ordered IDs, and removing all photos/saving an empty selection. An isolated sample story verified ordered selections, duplicate removal, and main-photo exclusion. Browser checks confirmed captions, enlarged images, next-photo navigation, and Escape close. Temporary sample stories were removed; existing stories/media were unchanged. Editor checks used the authenticated Chrome WordPress session. No existing family story was modified.

## Portrait and landscape display

Story main photos use a bounded display area with object-contain, centering the complete photograph against a dark background. Additional story thumbnails also use object-contain against a neutral background, without hover zoom that could crop edges. Portrait and landscape uploads keep their proportions; the existing full-photo viewer remains unchanged. Other album pages retain their existing thumbnail treatment. Verified the complete John Leshou portraits on the local story page.
