<?php
/**
 * Plugin Name: Garnet Board Members
 * Description: Editable board profiles for the headless Garnet website. Requires WPGraphQL and ACF.
 */
if (!defined('ABSPATH')) { exit; }
add_action('init', function () {
    register_post_type('garnet_board_member', [
        'labels' => ['name' => 'Board Members', 'singular_name' => 'Board Member', 'add_new_item' => 'Add Board Member', 'edit_item' => 'Edit Board Member'],
        'public' => true, 'publicly_queryable' => false, 'show_ui' => true,
        'show_in_rest' => true, 'exclude_from_search' => true,
        'supports' => ['title', 'thumbnail', 'revisions'], 'menu_icon' => 'dashicons-groups',
        'show_in_graphql' => true, 'graphql_single_name' => 'BoardMember', 'graphql_plural_name' => 'BoardMembers',
        'rewrite' => false,
    ]);
});
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) { return; }
    acf_add_local_field_group([
        'key' => 'group_garnet_board_details', 'title' => 'Board Profile',
        'show_in_graphql' => 1, 'graphql_field_name' => 'boardDetails',
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'garnet_board_member']]],
        'fields' => [
            ['key' => 'field_garnet_board_role', 'label' => 'Board role', 'name' => 'role', 'type' => 'text'],
            ['key' => 'field_garnet_board_bio', 'label' => 'Short biography', 'name' => 'short_bio', 'type' => 'textarea', 'rows' => 4, 'instructions' => 'A short paragraph about this member.'],
            ['key' => 'field_garnet_board_order', 'label' => 'Display order', 'name' => 'display_order', 'type' => 'number', 'default_value' => 0, 'min' => 0, 'step' => 1],
        ],
    ]);
});
