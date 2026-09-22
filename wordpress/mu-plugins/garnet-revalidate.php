<?php
/**
 * Plugin Name: Garnet – Frontend sync
 * Description: Stamps the road report's "Last checked" time on save, and tells the
 *              Next.js frontend to refresh content when editors save.
 *
 * Install: copy to wp-content/mu-plugins/ and add to wp-config.php:
 *   define( 'GARNET_FRONTEND_URL', 'https://garnetghosttown.org' );
 *   define( 'GARNET_REVALIDATE_SECRET', '...same value as REVALIDATE_SECRET in Next.js...' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function garnet_revalidate( array $tags ) {
	if ( ! defined( 'GARNET_FRONTEND_URL' ) || ! defined( 'GARNET_REVALIDATE_SECRET' ) ) {
		return;
	}

	wp_remote_post(
		trailingslashit( GARNET_FRONTEND_URL ) . 'api/revalidate',
		array(
			'timeout'  => 5,
			'blocking' => false,
			'headers'  => array(
				'Content-Type'        => 'application/json',
				'x-revalidate-secret' => GARNET_REVALIDATE_SECRET,
			),
			'body'     => wp_json_encode( array( 'tags' => $tags ) ),
		)
	);
}

// Saving the road report IS verifying it: stamp "Last checked" with the current
// Mountain Time so editors never have to enter it by hand.
add_filter(
	'acf/update_value/name=road_last_verified',
	function ( $value, $post_id ) {
		if ( 'options' === $post_id || str_starts_with( (string) $post_id, 'options' ) ) {
			return current_time( 'Y-m-d H:i:s' );
		}
		return $value;
	},
	10,
	2
);

function garnet_tags_for_post_type( $post_type ) {
	$map = array(
		'event'        => array( 'events' ),
		'garnet_story' => array( 'stories' ),
	);
	return $map[ $post_type ] ?? null;
}

// Saves: runs after ACF has written its fields, so the frontend never
// refetches a half-saved record. Covers the road report options page too.
add_action(
	'acf/save_post',
	function ( $post_id ) {
		if ( 'options' === $post_id || str_starts_with( (string) $post_id, 'options' ) ) {
			garnet_revalidate( array( 'visitor-status' ) );
			return;
		}
		if ( 'publish' !== get_post_status( $post_id ) ) {
			return; // Drafts never reach the public site.
		}
		$tags = garnet_tags_for_post_type( get_post_type( $post_id ) );
		if ( $tags ) {
			garnet_revalidate( $tags );
		}
	},
	20
);

// Unpublish or trash: remove the item from the public site right away.
add_action(
	'transition_post_status',
	function ( $new_status, $old_status, $post ) {
		if ( 'publish' !== $old_status || 'publish' === $new_status ) {
			return;
		}
		$tags = garnet_tags_for_post_type( $post->post_type );
		if ( $tags ) {
			garnet_revalidate( $tags );
		}
	},
	10,
	3
);
