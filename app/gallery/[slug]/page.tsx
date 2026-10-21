import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryAlbum, getGalleryAlbums } from "@/lib/content/galleries";
import { AlbumPhotoGrid } from "@/components/album-photo-grid";

export const revalidate = 60;

export async function generateStaticParams() { const { albums } = await getGalleryAlbums(); return albums.map(album => ({ slug: album.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { album } = await getGalleryAlbum(slug);
  return { title: album ? `${album.title} | Photo Gallery` : "Album not found", robots: { index: false, follow: false } };
}
export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { album } = await getGalleryAlbum(slug);
  if (!album) notFound();
  const { albums: galleryAlbums } = await getGalleryAlbums();
  return <main id="main-content" className="bg-[#f2eee4] pt-40 pb-20 text-[#24352b] md:pt-48"><div className="mx-auto max-w-[82rem] px-5 md:px-10"><Link href="/gallery" className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold">← All albums</Link><header className="grid gap-5 border-b border-[#24352b]/25 pt-6 pb-9 md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-10"><div><p className="mb-4 text-xs font-semibold tracking-widest text-[#98613d] uppercase">{album.sample ? "Sample album · " : ""}{album.photoCount} photographs</p><h1 className="display-type text-5xl leading-[.95] tracking-[-.035em] md:text-7xl">{album.title}</h1></div><div><p className="max-w-lg text-lg leading-8">{album.description}</p><p className="mt-3 text-xs text-[#625b50]">Select a photograph to see it in full.</p></div></header><div className="pt-9"><AlbumPhotoGrid key={album.slug} initialPhotos={album.photos} albumTitle={album.title} albumSlug={album.slug} initialPageInfo={album.pageInfo} totalCount={album.photoCount} /></div><nav aria-label="Other photo albums" className="mt-14 border-t border-[#24352b]/25 pt-7"><p className="mb-4 text-xs font-semibold tracking-widest uppercase">Keep looking</p><div className="flex flex-wrap gap-x-7 gap-y-4">{galleryAlbums.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/gallery/${item.slug}`} className="border-b border-[#24352b]/30 pb-1 text-sm font-semibold">{item.title} ↗</Link>)}</div></nav></div></main>;
}
