<?php
/** Plugin Name: Garnet Story Photos
 * Requires garnet-photo-galleries.php for shared photo metadata and display sizes.
 */
if (!defined('ABSPATH')) { exit; }
// A small free-ACF field using WordPress's native media uploader. Stored IDs
// stay compatible with the earlier Relationship field; no migration is needed.
add_action('acf/include_field_types', function () {
    if (!class_exists('acf_field')) { return; }
    class Garnet_Story_Photos_Field extends acf_field {
        public function initialize() {
            $this->name = 'garnet_story_photos';
            $this->label = 'Story photographs';
            $this->category = 'content';
        }
        public function render_field($field) {
            $photos = [];
            foreach ((array) $field['value'] as $id) {
                $id = absint($id);
                if (!$id || !wp_attachment_is_image($id)) { continue; }
                $photos[] = ['id' => $id, 'src' => wp_get_attachment_image_url($id, 'thumbnail'), 'title' => get_the_title($id)];
            }
            echo '<div class="garnet-story-photo-picker" data-input-name="' . esc_attr($field['name']) . '" data-photos="' . esc_attr(wp_json_encode($photos)) . '">';
            echo '<div class="garnet-story-photo-values"><input type="hidden" name="' . esc_attr($field['name']) . '" value="">';
            foreach ($photos as $photo) {
                echo '<input type="hidden" name="' . esc_attr($field['name']) . '[]" value="' . esc_attr($photo['id']) . '">';
            }
            echo '</div><ul class="garnet-story-photo-list" aria-label="Selected story photographs"></ul>';
            echo '<button type="button" class="button button-primary garnet-story-add-photos">Add photos</button> ';
            echo '<span class="garnet-story-photo-status" role="status" aria-live="polite"></span>';
            echo '<p class="description">Drag thumbnails into order, or use the move buttons. Remove only unlinks a photo from this story. Save / Update the story to keep your changes.</p></div>';
        }
        public function update_value($value, $post_id, $field) {
            return array_slice(array_values(array_filter(array_unique(array_map('absint', (array) $value)), 'wp_attachment_is_image')), 0, 30);
        }
        public function format_value($value, $post_id, $field) {
            return array_values(array_filter(array_map('absint', (array) $value)));
        }
    }
    acf_register_field_type('Garnet_Story_Photos_Field');
});

add_action('acf/input/admin_enqueue_scripts', function () {
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'garnet_story') { return; }
    wp_enqueue_media();
    $asset = 'garnet-story-assets/photo-picker.js';
    wp_enqueue_script('garnet-story-photo-picker', plugins_url($asset, __FILE__), ['jquery', 'jquery-ui-sortable', 'acf-input', 'media-views'], filemtime(__DIR__ . '/' . $asset), true);
    wp_enqueue_style('garnet-story-photo-picker', plugins_url('garnet-story-assets/photo-picker.css', __FILE__), [], filemtime(__DIR__ . '/garnet-story-assets/photo-picker.css'));
});

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field')) { return; }
    $group = acf_get_field_group('group_garnet_story_details');
    if (!$group) { return; }
    $fields = acf_get_fields($group) ?: [];
    $fields = array_values(array_filter($fields, function ($field) { return $field['key'] !== 'field_garnet_story_photos'; }));
    $fields[] = ['key' => 'field_garnet_story_photos', 'label' => 'Additional story photos', 'name' => 'story_photos', 'type' => 'garnet_story_photos', 'instructions' => 'Choose Add photos to upload or select several images. These appear below the story, separate from the main photo. Add captions, alternative text and credits in the media window or Media Library.', 'post_type' => ['attachment'], 'post_status' => ['inherit'], 'filters' => ['search'], 'elements' => ['featured_image'], 'return_format' => 'id', 'min' => 0, 'max' => 30, 'show_in_graphql' => 0, 'parent' => 'group_garnet_story_details', 'menu_order' => count($fields)];
    $group['fields'] = $fields;
    acf_add_local_field_group($group);
});
add_action('graphql_register_types', function () {
    if (!function_exists('garnet_gallery_photo')) { return; }
    register_graphql_field('GarnetStory', 'storyPhotos', [
        'type' => ['list_of' => 'GarnetGalleryPhoto'],
        'resolve' => function ($source) {
            $ids = get_post_meta((int) $source->databaseId, 'story_photos', true);
            if (!is_array($ids)) { return []; }
            $main = (int) get_post_meta((int) $source->databaseId, 'story_main_photo', true);
            $photos = [];
            foreach (array_slice(array_unique(array_map('absint', $ids)), 0, 30) as $id) {
                if ($id === $main || !wp_attachment_is_image($id) || get_post_field('post_status', $id, 'raw') !== 'inherit') { continue; }
                $photo = garnet_gallery_photo(['id' => $id, 'caption' => '']);
                if ($photo) { $photos[] = $photo; }
            }
            return $photos;
        },
    ]);
});

add_filter('acf/load_field/key=field_garnet_story_main_photo', function ($field) {
    $field['instructions'] = 'Choose a horizontal (landscape) image at least 1200 pixels wide for the main photo. Vertical (portrait) photographs belong in Additional story photos below. If an image will not upload here, check its width in Media Library.';
    return $field;
});

// Media captions, alt text, credits, deletion and regenerated sizes affect story pages too.
function garnet_refresh_story_photos() {
    if (function_exists('garnet_revalidate')) { garnet_revalidate(['stories']); }
}
foreach (['edit_attachment', 'delete_attachment'] as $hook) {
    add_action($hook, 'garnet_refresh_story_photos', 35);
}
foreach (['added_post_meta', 'updated_post_meta', 'deleted_post_meta'] as $hook) {
    add_action($hook, function ($meta_id, $post_id, $key) {
        if (get_post_type($post_id) === 'attachment' && in_array($key, ['_wp_attachment_image_alt', 'garnet_photo_credit', '_wp_attachment_metadata'], true)) { garnet_refresh_story_photos(); }
    }, 35, 3);
}
