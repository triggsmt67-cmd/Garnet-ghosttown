import "server-only";

/**
 * Minimal WPGraphQL client.
 *
 * - Runs on the server only; no WordPress URL or credential reaches the browser.
 * - Every request is cached and tagged so the WordPress save webhook
 *   (app/api/revalidate) can refresh exactly the content that changed.
 * - Throws on any failure; lib/content/index.ts decides how to degrade.
 */

const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;

/** Background refresh even if a webhook is missed. */
export const DEFAULT_REVALIDATE_SECONDS = 300;

export const isWordPressConfigured = Boolean(WORDPRESS_GRAPHQL_URL);

export class WordPressError extends Error {
  name = "WordPressError";
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function wpFetch<T>(
  query: string,
  {
    variables,
    tags,
    revalidate = DEFAULT_REVALIDATE_SECONDS,
  }: {
    variables?: Record<string, unknown>;
    tags: string[];
    revalidate?: number;
  },
): Promise<T> {
  if (!WORDPRESS_GRAPHQL_URL) {
    throw new WordPressError("WORDPRESS_GRAPHQL_URL is not set");
  }

  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate, tags: ["wordpress", ...tags] },
  });

  if (!response.ok) {
    throw new WordPressError(`HTTP ${response.status} for tags ${tags.join(",")}`);
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new WordPressError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new WordPressError("Empty GraphQL response");
  }

  return json.data;
}
