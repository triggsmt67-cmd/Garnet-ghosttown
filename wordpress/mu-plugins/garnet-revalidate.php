<?php
/**
 * Plugin Name: Garnet – Revalidate Next.js on save
 * Description: Tells the Next.js frontend to refresh content when editors save.
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

function garnet_tag_for_post_type( $post_type ) {
	$map = array(
		'event'          => 'events',
		'timeline_entry' => 'timeline',
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
		$tag = garnet_tag_for_post_type( get_post_type( $post_id ) );
		if ( $tag ) {
			garnet_revalidate( array( $tag ) );
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
		$tag = garnet_tag_for_post_type( $post->post_type );
		if ( $tag ) {
			garnet_revalidate( array( $tag ) );
		}
	},
	10,
	3
);
