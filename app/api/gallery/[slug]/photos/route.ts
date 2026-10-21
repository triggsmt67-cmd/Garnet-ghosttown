import { getGalleryAlbum } from "@/lib/content/galleries";
import { WordPressError } from "@/lib/content/client";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const after = request.nextUrl.searchParams.get("after");
  if (!/^[a-z0-9-]+$/.test(slug) || !after || after.length > 160 || !/^[A-Za-z0-9+/=]+$/.test(after)) return Response.json({ message: "Invalid photo page." }, { status: 400 });
  try {
    const { album } = await getGalleryAlbum(slug, after);
    if (!album) return Response.json({ message: "Album not found." }, { status: 404 });
    return Response.json({ photos: album.photos, pageInfo: album.pageInfo }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof WordPressError && error.code === "GARNET_ALBUM_CHANGED") return Response.json({ message: "This album has changed. Refresh to see the current photographs." }, { status: 409 });
    return Response.json({ message: "Photos could not be loaded. Please try again." }, { status: 503 }); }
}
