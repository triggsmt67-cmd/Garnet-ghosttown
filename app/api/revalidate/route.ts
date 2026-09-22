import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { CONTENT_TAGS } from "@/lib/content";

/**
 * Called by WordPress when an editor saves an event, timeline entry, or the
 * road report, so the change is live within seconds instead of minutes.
 *
 *   POST /api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *   Body:   { "tags": ["events"] }   // or omit body to refresh all WordPress content
 */

const ALLOWED_TAGS = new Set<string>(["wordpress", ...Object.values(CONTENT_TAGS)]);

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }

  let requested: unknown = ["wordpress"];
  try {
    const body = (await request.json()) as { tags?: unknown };
    if (body?.tags) requested = body.tags;
  } catch {
    // Empty or non-JSON body: refresh everything from WordPress.
  }

  const tags = (Array.isArray(requested) ? requested : [requested]).filter(
    (tag): tag is string => typeof tag === "string" && ALLOWED_TAGS.has(tag),
  );

  if (tags.length === 0) {
    return Response.json({ revalidated: false, message: "No valid tags" }, { status: 400 });
  }

  // Expire immediately (not stale-while-revalidate): an editor who saves the
  // road report and refreshes the site must see their change on the first load.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: true, tags, now: Date.now() });
}
