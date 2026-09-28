export const SITE_URL = "https://garnetghosttown.org";

/**
 * Search engines are blocked unless SITE_INDEXABLE is explicitly "true".
 *
 * This is deliberately fail-safe: preview deployments, staging URLs, and any
 * environment nobody thought to configure stay out of search results. Set
 * SITE_INDEXABLE=true only on the real production deployment at launch.
 */
export const isIndexable = process.env.SITE_INDEXABLE === "true";
