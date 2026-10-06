<?php
/**
 * Plugin Name: Garnet Current Updates
 * Description: Client-maintained visitor updates and meeting records exposed through WPGraphQL.
 */
if (!defined('ABSPATH')) { exit; }
add_action('init', function () {
    register_post_type('garnet_update', [
        'labels' => ['name' => 'Current Updates', 'singular_name' => 'Update', 'add_new_item' => 'Add Update'],
        'public' => true, 'publicly_queryable' => false, 'show_ui' => true, 'show_in_rest' => true,
        'exclude_from_search' => true, 'supports' => ['title', 'revisions'], 'menu_icon' => 'dashicons-megaphone',
        'show_in_graphql' => true, 'graphql_single_name' => 'VisitorUpdate', 'graphql_plural_name' => 'VisitorUpdates', 'rewrite' => false,
    ]);
});
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) { return; }
    acf_add_local_field_group([
        'key' => 'group_garnet_update_details', 'title' => 'Update Details', 'show_in_graphql' => 1, 'graphql_field_name' => 'updateDetails',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'garnet_update']]],
        'fields' => [
            ['key' => 'field_garnet_update_sample', 'name' => 'is_sample', 'label' => 'Sample content', 'type' => 'true_false', 'ui' => 1, 'instructions' => 'Clearly labels this as a demonstration. Keep enabled for mock data.'],
            ['key' => 'field_garnet_update_category', 'name' => 'category', 'label' => 'Category', 'type' => 'select', 'required' => 1, 'default_value' => 'announcement', 'choices' => ['road' => 'Road status', 'snow' => 'Snow conditions', 'grooming' => 'Trail grooming', 'access' => 'Seasonal access', 'fire' => 'Fire restrictions and danger', 'map' => 'Snowmobile trail maps', 'event' => 'Event notice', 'announcement' => 'Public announcement', 'seasonal' => 'Beargrass and seasonal updates', 'alert' => 'Visitor alert', 'land-scam' => 'Land-sale scam information', 'meeting' => 'Meeting dates and minutes']],
            ['key' => 'field_garnet_update_summary', 'name' => 'summary', 'label' => 'Short summary', 'type' => 'textarea', 'required' => 1, 'rows' => 3],
            ['key' => 'field_garnet_update_details', 'name' => 'details', 'label' => 'Full update', 'type' => 'textarea', 'rows' => 8, 'instructions' => 'Plain text. Separate paragraphs with a blank line.'],
            ['key' => 'field_garnet_update_verified', 'name' => 'verified_at', 'label' => 'Last checked', 'type' => 'date_time_picker', 'required' => 1, 'return_format' => 'Y-m-d H:i:s', 'instructions' => 'When this information was actually confirmed, not merely edited. Recheck road, snow, grooming, access, and fire updates at least weekly.'],
            ['key' => 'field_garnet_update_expiry', 'name' => 'expires_at', 'label' => 'Remove after', 'type' => 'date_time_picker', 'return_format' => 'Y-m-d H:i:s', 'instructions' => 'Optional. Expired updates disappear from the public page.'],
            ['key' => 'field_garnet_update_link', 'name' => 'resource_url', 'label' => 'Source, map, or minutes URL', 'type' => 'url', 'instructions' => 'For a PDF or minutes file, upload it to Media and paste its URL here.'],
            ['key' => 'field_garnet_update_link_label', 'name' => 'resource_label', 'label' => 'Link label', 'type' => 'text'],
            ['key' => 'field_garnet_update_meeting', 'name' => 'meeting_at', 'label' => 'Meeting date and time', 'type' => 'date_time_picker', 'return_format' => 'Y-m-d H:i:s'],
            ['key' => 'field_garnet_update_home', 'name' => 'feature_on_homepage', 'label' => 'Feature on home page', 'type' => 'true_false', 'ui' => 1],
        ],
    ]);
});
