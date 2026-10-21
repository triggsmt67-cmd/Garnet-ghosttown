# Managing Garnet’s photo galleries

## Open the gallery editor

In WordPress, choose **Photo Galleries → All Albums**. Choose **Add Photo Album** to create a collection, or select an existing album to edit it. The same guide is available under **Photo Galleries → How to manage photos**.

## Add photos

1. Enter a descriptive album title.
2. Choose **Add photos to this album** in the blue guidance box. Upload photographs from your computer or choose existing ones in **Media Library**, then choose **Add to this album**. The picker names the destination album. You can also use **Add photos** beneath the album name in All Albums.
3. Use the same button for additional images; photos already included are skipped. Drag photographs into order, or use their move controls.
4. Enter captions beneath the photographs. These captions belong to this album.
5. Under **Album Details**, add a short description and choose a cover photograph. If no cover is selected, the first album photo becomes the cover.
6. Set **Display order**: lower numbers appear first on the gallery landing page.
7. Save unfinished albums as drafts. Publish when ready, then refresh the website. Use **Save** when changing an existing published album.

Start with 15–30 strong photos per album. This is an editorial recommendation, not a technical limit. Larger albums load in batches of 24.

Remember: **choose the album → Add photos → Save**. Uploading through **Media → Add New** stores photos in the library but does not automatically add them to an album. Open the desired album and choose the uploaded photos from Media Library. A photograph can belong to several albums.

## Photo size and large uploads

**Upload web-ready copies and keep the originals in your own archive.**

- JPG or WebP is recommended. Aim for **1,600–2,400 pixels on the longest side**, ideally **under 2 MB per photo**.
- A 4,000 × 3,000 camera photo will not stretch the page. WordPress makes a proportional display copy no larger than **2,048 pixels on either side** for new uploads, and the website delivers smaller thumbnails as needed.
- Album covers and thumbnails crop to a consistent shape. Opening the photograph shows its full composition, without stretching.
- Very large files still take longer to upload, require server processing, and consume storage. Keep high-resolution scans in your archive and upload suitable web copies.
- Avoid tiny images, which may look blurry when enlarged.

These are recommendations, not a new hard upload limit. The server’s usual upload and processing limits still apply. Display copies are generated for new uploads; older uploads use a suitable existing smaller copy. If a large photo has no suitable copy, it is omitted until its image sizes are regenerated. Ask the website administrator to regenerate sizes if an uploaded photo does not appear.

## Alt text and photo credits

Open **Media → Library**, select a photograph, and enter useful **Alternative Text** describing what is visible. Enter approved attribution in **Photographer / archive credit**. If this field is not visible in the media popup, choose **Edit more details**.

Alt text and credits follow the photo wherever it is used. Captions typed directly into an album can differ between albums. Do not guess dates, names, or credits. Keep original high-resolution scans safely in your own archive; upload suitable web copies when possible.

## Change or remove photos

- Removing a photograph from an album does not delete it from Media Library.
- Deleting an image from Media Library affects every album using it.
- Change an album to **Draft**, or move it to **Trash**, to remove it from the public gallery.
- The six demonstration albums have **Sample / demonstration album** enabled. Keep this enabled until the association approves the photos, captions, and credits. Turn it off on approved collections.

## Current local installation

- WordPress albums: http://garnet-cms.local/wp-admin/edit.php?post_type=garnet_photo_album
- Editor help: http://garnet-cms.local/wp-admin/edit.php?post_type=garnet_photo_album&page=garnet-gallery-help
- Gallery website: http://localhost:3000/gallery

This is currently verified on Trevor’s computer. The same WordPress plugin, content, media files, and frontend connection must be moved to hosted WordPress before the association can use it on the live website. A Git push alone does not move WordPress content or media.
