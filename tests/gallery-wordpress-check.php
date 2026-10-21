<?php
// Run with WP-CLI eval-file on the local development site only. Own fixture is deleted in finally.
if (!defined('ABSPATH') || parse_url(home_url(), PHP_URL_HOST) !== 'garnet-cms.local') {
    throw new RuntimeException('This integration check requires the local garnet-cms site.');
}
function garnet_check($condition, $message) {
    if (!$condition) { throw new RuntimeException($message); }
    echo "PASS: $message\n";
}
$ids = get_posts(['post_type' => 'attachment', 'post_mime_type' => 'image', 'numberposts' => 3, 'fields' => 'ids']);
garnet_check(count($ids) === 3, 'Three existing images available; none will be changed');
$blocks = function ($ids) {
    return serialize_blocks([['blockName' => 'core/gallery', 'attrs' => [], 'innerContent' => array_fill(0, count($ids), null), 'innerBlocks' => array_map(function ($id) {
        return ['blockName' => 'core/image', 'attrs' => ['id' => $id], 'innerBlocks' => [], 'innerContent' => ['<figure><img /></figure>'], 'innerHTML' => '<figure><img /></figure>'];
    }, $ids)]]);
};
$id = wp_insert_post(['post_type' => 'garnet_photo_album', 'post_title' => 'Temporary reliability check', 'post_status' => 'publish', 'post_content' => $blocks($ids)], true);
if (is_wp_error($id)) { throw new RuntimeException($id->get_error_message()); }
$metadata_filter = null;
try {
    $query = 'query($id: ID!, $after: String) { photoAlbum(id: $id, idType: DATABASE_ID) { galleryPhotos(first: 2, after: $after) { totalCount nodes { id } pageInfo { hasNextPage endCursor } } } }';
    $page = graphql(['query' => $query, 'variables' => ['id' => (string) $id]]);
    garnet_check(empty($page['errors']), 'First album page resolves through actual GraphQL schema');
    $connection = $page['data']['photoAlbum']['galleryPhotos'];
    garnet_check(count($connection['nodes']) === 2 && $connection['pageInfo']['hasNextPage'], 'First page has two images and a next cursor');
    $cursor = $connection['pageInfo']['endCursor'];
    $next = graphql(['query' => $query, 'variables' => ['id' => (string) $id, 'after' => $cursor]]);
    garnet_check(count($next['data']['photoAlbum']['galleryPhotos']['nodes']) === 1, 'Unchanged album continues without duplicates');
    wp_update_post(['ID' => $id, 'post_content' => $blocks(array_slice($ids, 1))]);
    $changed = graphql(['query' => $query, 'variables' => ['id' => (string) $id, 'after' => $cursor]]);
    garnet_check(($changed['errors'][0]['extensions']['code'] ?? '') === 'GARNET_ALBUM_CHANGED', 'Removing a previously loaded photo rejects the outdated cursor');
    $fresh = graphql(['query' => $query, 'variables' => ['id' => (string) $id]]);
    garnet_check($fresh['data']['photoAlbum']['galleryPhotos']['totalCount'] === 2, 'Refreshing restarts with the current album membership');
    $metadata_filter = function ($data, $attachment_id) use ($ids) {
        if ((int) $attachment_id !== (int) $ids[0]) { return $data; }
        return ['width' => 4000, 'height' => 3000, 'file' => $data['file'], 'sizes' => [
            'large' => ['file' => 'test-large.jpg', 'width' => 1024, 'height' => 768],
            'thumbnail' => ['file' => 'test-cropped.jpg', 'width' => 150, 'height' => 150],
        ]];
    };
    add_filter('wp_get_attachment_metadata', $metadata_filter, 10, 2);
    $photo = garnet_gallery_photo(['id' => $ids[0], 'caption' => '']);
    garnet_check($photo && $photo['width'] === 1024 && $photo['height'] === 768, 'Large older upload uses proportional existing size rather than original or cropped thumbnail');
    remove_filter('wp_get_attachment_metadata', $metadata_filter, 10);
    $metadata_filter = function ($data, $attachment_id) use ($ids) {
        if ((int) $attachment_id === (int) $ids[0]) { $data['width'] = 4000; $data['height'] = 3000; $data['sizes'] = []; }
        return $data;
    };
    add_filter('wp_get_attachment_metadata', $metadata_filter, 10, 2);
    garnet_check(garnet_gallery_photo(['id' => $ids[0], 'caption' => '']) === null, 'Missing all suitable display sizes never sends a giant original');
} catch (Throwable $error) {
    echo "FAIL: " . $error->getMessage() . "\n";
    throw $error;
} finally {
    if ($metadata_filter) { remove_filter('wp_get_attachment_metadata', $metadata_filter, 10); }
    wp_delete_post($id, true);
    echo "Temporary album removed. Existing media unchanged.\n";
}
