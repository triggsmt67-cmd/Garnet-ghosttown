import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGalleryAlbums } from "@/lib/content/galleries";
export const revalidate = 60;

export const metadata: Metadata = { title: "Photo Gallery", description: "Explore Garnet in photographs, from archival street scenes to the changing seasons.", robots: { index: false, follow: false } };
export default async function GalleryPage() {
  const { albums: galleryAlbums, source } = await getGalleryAlbums();
  const hasSamples = galleryAlbums.some(album => album.sample);
  return (
    <main id="main-content" className="bg-[#f2eee4] pt-40 pb-20 text-[#24352b] md:pt-48 md:pb-24">
      <div className="mx-auto max-w-[82rem] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#24352b]/25 pb-4 text-[0.65rem] font-semibold tracking-[0.16em] uppercase"><p>Garnet Ghost Town · Photo collections</p><span className="text-[#98613d]">{source === "preview" ? "Preview collection" : hasSamples ? "Sample albums" : "Photo collections"}</span></div>
        <header className="grid gap-6 pt-9 pb-10 md:gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end md:pt-12 md:pb-14">
          <h1 className="display-type text-[clamp(3.5rem,7.5vw,7rem)] leading-[.92] tracking-[-.045em]">Garnet, in<br /><em className="text-[#98613d]">photographs.</em></h1>
          <div className="max-w-md lg:justify-self-end"><p className="text-lg leading-8">Look closer at the town, the people, and the mountain setting. Choose an album and take your time.</p>{(source === "preview" || hasSamples) && <p className="mt-5 text-xs leading-6 text-[#625b50]">Demonstration albums using existing website photographs. The final selections, captions, and credits will be approved by the association.</p>}</div>
        </header>
        {galleryAlbums.length === 0 && <p className="border-t border-[#24352b]/25 py-10 text-lg">Photo albums will appear here as the collection is published.</p>}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {galleryAlbums.map((album, index) => <Link key={album.slug} href={`/gallery/${album.slug}`} className="group block"><div className="relative aspect-[4/3] overflow-hidden bg-[#ded8c9]"><Image src={album.cover.src} alt={album.cover.alt} fill priority={index < 3} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" /><span className="absolute bottom-3 left-3 bg-[#f2eee4]/95 px-3 py-1.5 text-[0.65rem] font-semibold tracking-wider">{String(index + 1).padStart(2, "0")} / {String(galleryAlbums.length).padStart(2, "0")}</span><span aria-hidden="true" className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center bg-[#24352b] text-lg text-white transition-colors group-hover:bg-[#98613d]">↗</span></div><div className="mt-5 flex items-baseline justify-between gap-3"><h2 className="display-type text-[1.9rem] leading-tight tracking-tight">{album.title}</h2><span className="shrink-0 text-xs text-[#625b50]">{album.photoCount} photos{album.sample ? " · Sample" : ""}</span></div><p className="mt-2 max-w-sm text-sm leading-6 text-[#4e5b4e]">{album.description}</p></Link>)}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#24352b]/25 pt-6 text-sm"><p className="display-type text-2xl italic">There is more to see in person.</p><Link href="/explore" className="border-b border-[#24352b]/50 pb-1 font-semibold">Explore the town <span aria-hidden="true">↗</span></Link></div>
      </div>
    </main>
  );
}
