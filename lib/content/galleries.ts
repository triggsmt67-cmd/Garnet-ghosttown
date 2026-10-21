import "server-only";
import { cache } from "react";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { isWordPressConfigured, wpFetch } from "./client";
import { galleryAlbums as previewAlbums } from "../gallery-preview";
import type { GalleryAlbum, GalleryPhoto, GalleryPageInfo } from "../gallery-types";

const photoFields = `id src alt caption credit width height`;
const albumFields = `slug title: albumTitle albumDetails { description displayOrder isSample coverImage { node { garnetGalleryImage { ${photoFields} } } } }`;
const listQuery = `query GarnetGalleryAlbums($after: String) { photoAlbums(first: 100, after: $after, where: {status: PUBLISH}) { pageInfo { hasNextPage endCursor } nodes { ${albumFields} galleryPhotos(first: 1) { totalCount nodes { ${photoFields} } pageInfo { hasNextPage endCursor } } } } }`;
const albumQuery = `query GarnetGalleryAlbum($slug: ID!, $after: String) { photoAlbum(id: $slug, idType: SLUG) { ${albumFields} galleryPhotos(first: 24, after: $after) { totalCount nodes { ${photoFields} } pageInfo { hasNextPage endCursor } } } }`;
type PhotoNode = { id?: string | null; src?: string | null; alt?: string | null; caption?: string | null; credit?: string | null; width?: number | null; height?: number | null };
type AlbumNode = { slug: string; title?: string | null; albumDetails?: { description?: string | null; displayOrder?: number | null; isSample?: boolean | null; coverImage?: { node?: { garnetGalleryImage?: PhotoNode | null } | null } | null } | null; galleryPhotos?: { totalCount: number; nodes: PhotoNode[]; pageInfo: GalleryPageInfo } | null };
function imageUrl(value?: string | null) { try { const url = new URL(value || ""); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; } }
function mapPhoto(node: PhotoNode): GalleryPhoto | null {
  const src = imageUrl(node.src);
  if (!src || !node.id) return null;
  return { id: node.id, src, alt: node.alt || node.caption || "Photograph of Garnet", caption: node.caption || "", credit: node.credit || undefined, width: node.width || undefined, height: node.height || undefined };
}
function mapAlbum(node: AlbumNode): GalleryAlbum | null {
  if (!node.galleryPhotos?.totalCount) return null;
  const photos = node.galleryPhotos.nodes.map(mapPhoto).filter((photo): photo is GalleryPhoto => photo !== null);
  const fields = node.albumDetails;
  const coverNode = fields?.coverImage?.node;
  const cover = (coverNode?.garnetGalleryImage ? mapPhoto(coverNode.garnetGalleryImage) : null) || photos[0];
  // A page beyond the last photo can still have a valid cover and total count.
  if (!cover) return null;
  return { slug: node.slug, title: node.title || "Photo album", description: fields?.description || "", cover, photos, photoCount: node.galleryPhotos.totalCount, sample: !!fields?.isSample, order: fields?.displayOrder || 0, pageInfo: node.galleryPhotos.pageInfo };
}
function previewMode() {
  if (!isWordPressConfigured) return true;
  if (process.env.NODE_ENV !== "production") return false;
  try { return new URL(process.env.WORDPRESS_GRAPHQL_URL || "").hostname.endsWith(".local"); } catch { return false; }
}
function canUsePreview(error: unknown) {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) throw error;
  console.warn("[content] Photo galleries unavailable; showing labeled local examples:", error instanceof Error ? error.message : String(error));
}
export const getGalleryAlbums = cache(async (): Promise<{ albums: GalleryAlbum[]; source: "wordpress" | "preview" }> => {
  if (previewMode()) return { albums: previewAlbums, source: "preview" };
  try {
    const albums: GalleryAlbum[] = [];
    let after: string | null = null;
    do {
      const data: { photoAlbums: { nodes: AlbumNode[]; pageInfo: GalleryPageInfo } } = await wpFetch(listQuery, { variables: { after }, tags: ["photo-galleries"], revalidate: 60 });
      albums.push(...data.photoAlbums.nodes.map(mapAlbum).filter((album): album is GalleryAlbum => album !== null));
      const next = data.photoAlbums.pageInfo;
      if (next.hasNextPage && (!next.endCursor || next.endCursor === after)) throw new Error("Album pagination did not advance");
      after = next.hasNextPage ? next.endCursor : null;
    } while (after);
    return { albums: albums.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)), source: "wordpress" };
  } catch (error) { canUsePreview(error); return { albums: previewAlbums, source: "preview" }; }
});
export const getGalleryAlbum = cache(async (slug: string, after: string | null = null): Promise<{ album: GalleryAlbum | null; source: "wordpress" | "preview" }> => {
  if (previewMode()) return { album: after ? null : previewAlbums.find(album => album.slug === slug) || null, source: "preview" };
  try {
    const data = await wpFetch<{ photoAlbum: AlbumNode | null }>(albumQuery, { variables: { slug, after }, tags: ["photo-galleries"], revalidate: 60 });
    return { album: data.photoAlbum ? mapAlbum(data.photoAlbum) : null, source: "wordpress" };
  } catch (error) {
    // Cursor errors must not be turned into a fake successful preview page.
    if (after) throw error;
    canUsePreview(error); return { album: previewAlbums.find(album => album.slug === slug) || null, source: "preview" };
  }
});
