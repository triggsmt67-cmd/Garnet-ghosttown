"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto, GalleryPageInfo } from "@/lib/gallery-types";

export function AlbumPhotoGrid({ initialPhotos, albumTitle, albumSlug, initialPageInfo, totalCount }: { initialPhotos: GalleryPhoto[]; albumTitle: string; albumSlug: string; initialPageInfo: GalleryPageInfo; totalCount: number }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = selected !== null;
  const active = selected === null ? null : photos[selected];
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!isOpen) { if (element.open) element.close(); return; }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    return () => { document.body.style.overflow = previousOverflow; if (element.open) element.close(); };
  }, [isOpen]);
  async function loadMore(): Promise<number> {
    if (loading || !pageInfo.hasNextPage || !pageInfo.endCursor) return 0;
    setLoading(true); setLoadError("");
    try {
      const response = await fetch(`/api/gallery/${encodeURIComponent(albumSlug)}/photos?after=${encodeURIComponent(pageInfo.endCursor)}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load photos");
      const data = await response.json() as { photos: GalleryPhoto[]; pageInfo: GalleryPageInfo };
      const known = new Set(photos.map(photo => photo.id));
      const added = data.photos.filter(photo => !known.has(photo.id));
      if (data.pageInfo.hasNextPage && (!data.pageInfo.endCursor || data.pageInfo.endCursor === pageInfo.endCursor)) throw new Error("Photo pagination did not advance");
      setPhotos(current => { const ids = new Set(current.map(photo => photo.id)); return [...current, ...added.filter(photo => !ids.has(photo.id))]; }); setPageInfo(data.pageInfo);
      return added.length;
    } catch { setLoadError("Photos could not be loaded. Please try again."); return 0; }
    finally { setLoading(false); }
  }
  async function step(direction: number) {
    if (selected === null || loading) return;
    if (direction > 0 && selected === photos.length - 1 && pageInfo.hasNextPage) {
      if (await loadMore()) setSelected(current => current === selected ? selected + 1 : current);
      return;
    }
    setSelected(Math.max(0, Math.min(photos.length - 1, selected + direction)));
  }
  return (
    <>
      <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => <figure key={photo.id}><button type="button" onClick={() => setSelected(index)} aria-label={`Enlarge photo ${index + 1}: ${photo.alt}`} className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#ded8c9]"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" /><span aria-hidden="true" className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center bg-[#f2eee4]/95 text-xl text-[#24352b]">+</span></button><figcaption className="mt-3 text-sm leading-6 text-[#4e5b4e]">{photo.caption}{photo.credit && <span className="mt-1 block text-xs text-[#625b50]">{photo.credit}</span>}</figcaption></figure>)}
      </div>
      {pageInfo.hasNextPage && <div className="mt-10 text-center"><button type="button" disabled={loading} onClick={() => void loadMore()} className="bg-[#24352b] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{loading ? "Loading photos…" : "Load more photos"}</button></div>}
      {loadError && <p role="alert" className="mt-5 text-center text-sm">{loadError}</p>}
      <dialog ref={dialog} aria-label={`${albumTitle} photo viewer`} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }} className="gallery-lightbox">
        {active && <>
          <div className="flex items-center justify-between gap-4 pb-4"><p className="text-xs tracking-wider uppercase">{albumTitle} <span className="ml-3 text-white/60">{(selected ?? 0) + 1} / {totalCount}</span></p><button type="button" onClick={() => setSelected(null)} aria-label="Close photo viewer" className="grid h-11 w-11 shrink-0 place-items-center border border-white/40 text-2xl">×</button></div>
          <div className="relative min-h-0 flex-1"><Image src={active.src} alt={active.alt} fill sizes="95vw" className="object-contain" /></div>
          {loadError && <p role="alert" className="pt-3 text-center text-sm">{loadError} Use the next arrow to retry.</p>}
          <div className="flex items-center justify-between gap-5 pt-4"><button type="button" aria-label="Previous photo" disabled={selected === 0} aria-disabled={loading || selected === 0} onClick={() => void step(-1)} className="disabled:opacity-40 grid h-11 w-11 shrink-0 place-items-center border border-white/40 text-xl">←</button><div aria-live="polite" aria-atomic="true" className="max-w-2xl text-center text-sm leading-6"><p>{active.caption}</p>{active.credit && <p className="text-xs text-white/60">{active.credit}</p>}</div><button type="button" aria-label="Next photo" disabled={selected === photos.length - 1 && !pageInfo.hasNextPage} aria-disabled={loading || (selected === photos.length - 1 && !pageInfo.hasNextPage)} aria-busy={loading} onClick={() => void step(1)} className="disabled:opacity-40 grid h-11 w-11 shrink-0 place-items-center border border-white/40 text-xl">→</button></div>
        </>}
      </dialog>
    </>
  );
}
