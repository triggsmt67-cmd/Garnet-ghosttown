<?php
/**
 * Plugin Name: Garnet Photo Galleries
 * Description: Client-editable photo albums using the native Gallery block, free ACF, and paginated WPGraphQL fields.
 */
if (!defined('ABSPATH')) { exit; }

// A non-cropped display derivative keeps large camera images out of the gallery response.
// WordPress retains the uploaded original and generates this size for new image uploads.
add_action('after_setup_theme', function () {
    add_image_size('garnet-gallery-display', 2048, 2048, false);
});

add_action('init', function () {
    register_post_type('garnet_photo_album', [
        'labels' => ['name' => 'Photo Galleries', 'singular_name' => 'Photo Album', 'add_new_item' => 'Add Photo Album', 'edit_item' => 'Edit Photo Album', 'all_items' => 'All Albums'],
        'public' => true, 'publicly_queryable' => false, 'exclude_from_search' => true,
        'show_ui' => true, 'show_in_rest' => true, 'rewrite' => false,
        'menu_icon' => 'dashicons-format-gallery', 'supports' => ['title', 'editor', 'revisions'],
        'template' => [['core/gallery', ['linkTo' => 'none', 'columns' => 3]]],
        'show_in_graphql' => true, 'graphql_single_name' => 'PhotoAlbum', 'graphql_plural_name' => 'PhotoAlbums',
    ]);
});

add_filter('allowed_block_types_all', function ($allowed, $context) {
    if (isset($context->post) && $context->post->post_type === 'garnet_photo_album') {
        return ['core/gallery', 'core/image'];
    }
    return $allowed;
}, 10, 2);

// Choose the destination before uploading, while keeping WordPress's familiar media picker.
add_filter('post_row_actions', function ($actions, $post) {
    if ($post->post_type === 'garnet_photo_album' && $post->post_status !== 'trash' && current_user_can('edit_post', $post->ID) && current_user_can('upload_files')) {
        $url = get_edit_post_link($post->ID, 'raw');
        $actions = ['garnet_add_photos' => '<a href="' . esc_url($url) . '" aria-label="' . esc_attr('Add photos to ' . get_the_title($post)) . '"><strong>Add photos</strong></a>'] + $actions;
    }
    return $actions;
}, 10, 2);

add_action('admin_notices', function () {
    $screen = get_current_screen();
    if (!$screen) { return; }
    $albums_url = admin_url('edit.php?post_type=garnet_photo_album');
    if (in_array($screen->base, ['upload', 'media'], true) && current_user_can('edit_posts')) {
        echo '<div class="notice notice-info"><p><strong>Want these photos in an album?</strong> Uploading here stores photos in Media Library; it does not automatically add them to an album. Open <a href="' . esc_url($albums_url) . '">Photo Galleries</a>, choose your album, then select <strong>Add photos</strong> and choose them from Media Library. One photo can belong to several albums.</p></div>';
    } elseif ($screen->base === 'edit' && $screen->post_type === 'garnet_photo_album') {
        echo '<div class="notice notice-info"><p><strong>Choose an album first → Add photos → Save.</strong> Use <strong>Add photos</strong> beneath an album name to upload new photographs or choose existing ones. Photos are added to that album when you save it.</p></div>';
    }
});

add_action('enqueue_block_editor_assets', function () {
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'garnet_photo_album' || !current_user_can('upload_files')) { return; }
    wp_enqueue_media();
    $asset = 'garnet-gallery-assets/album-editor.js';
    wp_enqueue_script('garnet-album-editor', plugins_url($asset, __FILE__), ['wp-plugins', 'wp-element', 'wp-data', 'wp-blocks', 'wp-notices', 'wp-editor', 'media-views'], filemtime(__DIR__ . '/' . $asset), true);
});

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) { return; }
    acf_add_local_field_group([
        'key' => 'group_garnet_album', 'title' => 'Album Details', 'show_in_graphql' => 1, 'graphql_field_name' => 'albumDetails',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'garnet_photo_album']]],
        'fields' => [
            ['key' => 'field_garnet_album_help', 'label' => 'How to add an album', 'name' => '', 'type' => 'message', 'message' => '1. Give the album a title.<br>2. Choose Add photos to this album above, upload or select photos, then choose Add to this album. Drag photos to reorder them; add captions beneath them.<br>3. Add a short description and cover below. The first photo is used when no cover is chosen.<br>4. Publish, then refresh the website. Keep unfinished albums as drafts. Edit alt text and photo credit in Media Library.'],
            ['key' => 'field_garnet_album_image_help', 'name' => '', 'label' => 'Before uploading photos', 'type' => 'message', 'message' => '<strong>Use web-ready copies, not your only archive originals.</strong><br>JPG or WebP is recommended. Aim for 1,600–2,400 pixels on the longest side and ideally less than 2 MB per photo. Larger photos are resized automatically for the website, but very large files take longer to upload and use more storage.<br>Covers and thumbnails are cropped to fit. Open a photo to see the complete image without stretching.'],
            ['key' => 'field_garnet_album_description', 'name' => 'album_description', 'label' => 'Short description', 'type' => 'textarea', 'rows' => 3, 'graphql_field_name' => 'description', 'instructions' => 'One or two sentences introducing this collection.'],
            ['key' => 'field_garnet_album_cover', 'name' => 'album_cover', 'label' => 'Album cover', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium', 'library' => 'all', 'graphql_field_name' => 'coverImage', 'instructions' => 'Choose a landscape photo. Leave blank to use the first album photo.'],
            ['key' => 'field_garnet_album_order', 'name' => 'album_order', 'label' => 'Display order', 'type' => 'number', 'default_value' => 0, 'min' => 0, 'step' => 1, 'graphql_field_name' => 'displayOrder', 'instructions' => 'Lower numbers appear first on the gallery page.'],
            ['key' => 'field_garnet_album_sample', 'name' => 'is_sample', 'label' => 'Sample / demonstration album', 'type' => 'true_false', 'ui' => 1, 'default_value' => 0, 'graphql_field_name' => 'isSample', 'instructions' => 'Keep enabled on demonstration albums. Disable only when the association has approved the photographs, captions, and credits.'],
        ],
    ]);
    acf_add_local_field_group([
        'key' => 'group_garnet_photo_credit', 'title' => 'Photo Credit',
        'location' => [[['param' => 'attachment', 'operator' => '==', 'value' => 'image']]],
        'fields' => [['key' => 'field_garnet_photo_credit', 'name' => 'garnet_photo_credit', 'label' => 'Photographer / archive credit', 'type' => 'text', 'instructions' => 'Use the approved attribution. Leave blank while unknown; do not guess. This credit is shared wherever this photo appears.']],
    ]);
});

/** Preserve Gallery block ordering and per-album captions, including legacy gallery IDs. */
function garnet_album_photo_items($album_id) {
    $album = get_post($album_id);
    if (!$album || $album->post_type !== 'garnet_photo_album') { return []; }
    $items = [];
    $walk = function ($blocks, $inside_gallery = false) use (&$walk, &$items) {
        foreach ($blocks as $block) {
            $name = $block['blockName'] ?? '';
            if ($name === 'core/gallery' && !empty($block['attrs']['ids'])) {
                foreach ($block['attrs']['ids'] as $id) { $items[] = ['id' => absint($id), 'caption' => '']; }
            }
            if ($name === 'core/image') {
                $id = absint($block['attrs']['id'] ?? 0);
                $caption = '';
                if (preg_match('/<figcaption\b[^>]*>(.*?)<\/figcaption>/si', $block['innerHTML'] ?? '', $match)) {
                    $caption = html_entity_decode(wp_strip_all_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
                }
                if ($id) { $items[] = ['id' => $id, 'caption' => $caption]; }
            }
            if (!empty($block['innerBlocks'])) { $walk($block['innerBlocks'], $inside_gallery || $name === 'core/gallery'); }
        }
    };
    $walk(parse_blocks($album->post_content));
    $seen = [];
    return array_values(array_filter($items, function ($item) use (&$seen) {
        if (isset($seen[$item['id']]) || !wp_attachment_is_image($item['id'])) { return false; }
        $seen[$item['id']] = true;
        return true;
    }));
}

function garnet_gallery_photo($item) {
    $id = $item['id'];
    $image = wp_get_attachment_image_src($id, 'garnet-gallery-display');
    if (!$image) { return null; }
    $caption = $item['caption'] ?: wp_strip_all_tags(wp_get_attachment_caption($id) ?: '');
    return [
        'id' => (string) $id, 'src' => $image[0], 'width' => (int) $image[1], 'height' => (int) $image[2],
        'alt' => (string) get_post_meta($id, '_wp_attachment_image_alt', true),
        'caption' => html_entity_decode($caption, ENT_QUOTES | ENT_HTML5, 'UTF-8'),
        'credit' => (string) get_post_meta($id, 'garnet_photo_credit', true),
    ];
}

add_action('graphql_register_types', function () {
    register_graphql_field('PhotoAlbum', 'albumTitle', ['type' => 'String', 'resolve' => function ($source) { return (string) get_post_field('post_title', (int) $source->databaseId, 'raw'); }]);
    register_graphql_object_type('GarnetGalleryPhoto', ['fields' => [
        'id' => ['type' => 'ID'], 'src' => ['type' => 'String'], 'alt' => ['type' => 'String'],
        'caption' => ['type' => 'String'], 'credit' => ['type' => 'String'],
        'width' => ['type' => 'Int'], 'height' => ['type' => 'Int'],
    ]]);
    register_graphql_object_type('GarnetGalleryPageInfo', ['fields' => [
        'hasNextPage' => ['type' => 'Boolean'], 'endCursor' => ['type' => 'String'],
    ]]);
    register_graphql_object_type('GarnetGalleryPhotoConnection', ['fields' => [
        'nodes' => ['type' => ['list_of' => 'GarnetGalleryPhoto']],
        'pageInfo' => ['type' => 'GarnetGalleryPageInfo'], 'totalCount' => ['type' => 'Int'],
    ]]);
    register_graphql_field('PhotoAlbum', 'galleryPhotos', [
        'type' => 'GarnetGalleryPhotoConnection',
        'args' => ['first' => ['type' => 'Int', 'defaultValue' => 24], 'after' => ['type' => 'String']],
        'resolve' => function ($source, $args) {
            $id = (int) $source->databaseId;
            $items = garnet_album_photo_items($id);
            $first = min(48, max(1, (int) ($args['first'] ?? 24)));
            $start = 0;
            if (!empty($args['after'])) {
                $cursor = base64_decode($args['after'], true);
                if (!$cursor || !preg_match('/^garnet-gallery:' . $id . ':(\d+)$/', $cursor, $match)) {
                    throw new \GraphQL\Error\UserError('Invalid album photo cursor.');
                }
                $start = (int) $match[1] + 1;
            }
            $page = array_slice($items, $start, $first);
            $end = $start + count($page);
            return [
                'nodes' => array_values(array_filter(array_map('garnet_gallery_photo', $page))),
                'totalCount' => count($items),
                'pageInfo' => ['hasNextPage' => $end < count($items), 'endCursor' => $page ? base64_encode('garnet-gallery:' . $id . ':' . ($end - 1)) : null],
            ];
        },
    ]);
});

// Refresh cover, ordering, photo membership, and caption changes after WordPress saves.
function garnet_refresh_photo_galleries() {
    if (function_exists('garnet_revalidate')) { garnet_revalidate(['photo-galleries']); }
}
add_action('save_post_garnet_photo_album', function ($id) {
    if (!wp_is_post_revision($id) && !wp_is_post_autosave($id)) { garnet_refresh_photo_galleries(); }
}, 30);
add_action('acf/save_post', function ($id) {
    if (is_numeric($id) && in_array(get_post_type((int) $id), ['garnet_photo_album', 'attachment'], true)) { garnet_refresh_photo_galleries(); }
}, 30);
add_action('edit_attachment', 'garnet_refresh_photo_galleries', 30);
add_action('add_attachment', 'garnet_refresh_photo_galleries', 30);
add_action('delete_attachment', 'garnet_refresh_photo_galleries', 30);
add_action('transition_post_status', function ($new, $old, $post) {
    if ($post->post_type === 'garnet_photo_album' && ($new === 'publish' || $old === 'publish')) { garnet_refresh_photo_galleries(); }
}, 30, 3);

// Media alt text and credit can be written after edit_attachment has fired.
foreach (['added_post_meta', 'updated_post_meta', 'deleted_post_meta'] as $hook) {
    add_action($hook, function ($meta_id, $post_id, $key) {
        if (get_post_type($post_id) === 'attachment' && in_array($key, ['_wp_attachment_image_alt', 'garnet_photo_credit', '_wp_attachment_metadata'], true)) { garnet_refresh_photo_galleries(); }
    }, 30, 3);
}
add_action('deleted_post', function ($id, $post) {
    if (in_array($post->post_type, ['garnet_photo_album', 'attachment'], true)) { garnet_refresh_photo_galleries(); }
}, 30, 2);

add_action('admin_menu', function () {
    add_submenu_page('edit.php?post_type=garnet_photo_album', 'Managing Photo Galleries', 'How to manage photos', 'edit_posts', 'garnet-gallery-help', function () {
        echo '<div class="wrap" style="max-width:900px"><h1>Managing Photo Galleries</h1><p>You can maintain the albums yourself. No website code changes are needed.</p>';
        echo '<h2>Create or update an album</h2><ol><li>Choose <strong>Photo Galleries → Add Photo Album</strong>, or open an existing album.</li><li>Give the album a clear title. Choose <strong>Add photos to this album</strong> in the blue guidance box, upload new photos or select existing images, then choose <strong>Add to this album</strong>. You can also choose <strong>Add photos</strong> beneath an album name in All Albums.</li><li>Use the same Add photos button to add more images. Already included photos are skipped. Drag images into order, or use their move controls. Type a caption beneath each photograph.</li><li>Open <strong>Album Details</strong> below the editor. Add a short description, choose a cover, and set the display order. A blank cover uses the first photo.</li><li>Save unfinished albums as drafts. Choose <strong>Publish</strong> (or <strong>Save</strong> for an existing album), then refresh the gallery website.</li></ol>';
        echo '<h2>Remember: choose the album first</h2><p><strong>Photo Galleries → choose an album → Add photos → Save.</strong> Uploading through Media → Add New only stores a file in Media Library; it does not place it in an album. Open the desired album and select that file from Media Library. The same photograph can be used in more than one album.</p><h2>Photo descriptions and credits</h2><p>In <strong>Media → Library</strong>, open a photograph. Add useful alternative text describing what is visible, and enter the approved <strong>Photographer / archive credit</strong>. You may need <strong>Edit more details</strong> to see the credit field. Credit and alt text are shared wherever that photo appears. A caption entered directly in an album belongs to that album.</p>';
        echo '<h2>Choosing the collection</h2><p>Start with 15–30 strong photographs per album, remove near-duplicates, and group larger collections into clear subjects. The website loads 24 photographs at a time. Keep original high-resolution scans in your own archive; upload web-ready copies when possible. WordPress creates display sizes and the website delivers optimized thumbnails.</p>';
        echo '<h2>Photo size and large uploads</h2><p><strong>Use web-ready copies and keep your original photographs in your own archive.</strong> JPG or WebP is recommended; aim for 1,600–2,400 pixels on the longest side and ideally less than 2 MB per photo. A 4,000 × 3,000 photo can be uploaded: WordPress creates a proportional display copy with a longest side of 2,048 pixels, and the website delivers smaller thumbnails as needed. Very large files still take longer to upload, need server processing, and use more storage.</p><p>Album covers and thumbnails crop to a consistent shape. Opening a photo shows the full composition without stretching it. Avoid tiny images, which can look blurry when enlarged. These are recommendations, not a new hard upload limit; the server’s normal upload limit still applies. The automatic display size applies to new uploads. Older images may need their image sizes regenerated.</p>';
        echo '<h2>Sample albums and removing content</h2><p>The six demonstration albums are labeled as samples. Replace or review their photos, captions, and credits, then switch off <strong>Sample / demonstration album</strong>. Changing an album back to Draft or moving it to Trash removes it from the public gallery. Removing a photo from an album does not delete it from Media Library; deleting it from Media Library affects every album that uses it.</p>';
        if (defined('GARNET_FRONTEND_URL')) {
            echo '<p><a class="button button-primary" target="_blank" rel="noopener noreferrer" href="' . esc_url(trailingslashit(GARNET_FRONTEND_URL) . 'gallery') . '">Open photo gallery</a></p>';
        }
        echo '</div>';
    });
});
