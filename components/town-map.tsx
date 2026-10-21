"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildings } from "@/lib/buildings";
import { ArrowRight } from "./icons";

// Positions follow the supplied building identifications in this photograph.
// The fixed 1048:700 crop keeps photo coordinates stable on every screen.
const photoStops: Record<string, { x: number; y: number }> = {
  "wells-hotel": { x: 56, y: 47 },
  "kellys-saloon": { x: 75, y: 47 },
  "davey-store": { x: 87, y: 35 },
  schoolhouse: { x: 28, y: 27 },
  "dahl-cabin": { x: 72, y: 80 },
};

export function TownMap() {
  const [activeSlug, setActiveSlug] = useState(buildings[0].slug);
  const active = buildings.find((building) => building.slug === activeSlug) ?? buildings[0];

  return (
    <section id="town-map" className="paper-grain scroll-mt-36 overflow-hidden bg-[#0d1218] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
      <div className="mx-auto max-w-[82rem]">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.2em] text-[#e0c46d] uppercase">Explore the town · Landmark stops</p>
            <p id="town-map-instructions" className="mt-4 max-w-sm text-sm leading-relaxed text-white/74">Select a numbered marker on the photograph, or choose a building below, to see its field notes and history.</p>
          </div>
          <h2 className="display-type text-4xl leading-[0.95] font-normal tracking-[-0.035em] md:text-6xl">Find the town inside<span className="block text-[#e0c46d]">the ghost town.</span></h2>
        </div>

        <div className="mx-auto mt-9 max-w-[64rem] overflow-hidden border border-white/15">
          <div className="relative isolate aspect-[1048/700] overflow-hidden bg-[#344632]" role="group" aria-label="Interactive photograph of Garnet" aria-describedby="town-map-instructions">
            <Image src="/images/Explore-Top-Banner.webp" alt="An overview of Garnet’s wooden buildings and hillside, with numbered markers for the landmark stops" fill sizes="(min-width: 1104px) 1024px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="object-cover object-[50%_45%]" />
            {buildings.map(building => {
              const selected = building.slug === activeSlug;
              const stop = photoStops[building.slug];
              return (
                <button key={building.slug} type="button" aria-pressed={selected} aria-controls="town-building-details" aria-label={`Show ${building.name}`} onClick={() => setActiveSlug(building.slug)} style={{ left: `${stop.x}%`, top: `${stop.y}%` }} className={`group absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-sm font-bold shadow-[0_3px_14px_rgba(0,0,0,.35)] transition-[background,color,box-shadow] focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${selected ? "border-[#f8f6f1] bg-[#e0c46d] text-[#0d1218] ring-4 ring-[#0d1218]/25" : "border-[#f8f6f1] bg-[#24352b] text-white hover:bg-[#3d5a3e]"}`}>
                  {building.number}
                  <span aria-hidden="true" className={`pointer-events-none absolute w-max max-w-32 border border-white/30 bg-[#0d1218]/95 px-2 py-1.5 text-center text-[0.625rem] leading-4 font-semibold text-white shadow-lg sm:text-xs ${building.slug === "wells-hotel" || building.slug === "dahl-cabin" ? "right-[calc(100%+7px)] top-1/2 -translate-y-1/2" : building.slug === "kellys-saloon" ? "left-1/2 top-[calc(100%+7px)] -translate-x-1/2" : building.slug === "davey-store" ? "bottom-[calc(100%+7px)] right-0" : "bottom-[calc(100%+7px)] left-1/2 -translate-x-1/2"}`}>{building.name}</span>
                </button>
              );
            })}
          </div>

          <p className="border-t border-white/15 bg-[#18271f] px-4 py-2 text-[0.6rem] leading-4 font-semibold tracking-[0.08em] text-white/65 uppercase">Townsite photo <span aria-hidden="true" className="mx-1 text-white/35">·</span> Select a numbered marker</p>
          <div className="grid grid-cols-2 border-t border-white/20 bg-[#18271f] sm:grid-cols-3 lg:grid-cols-5" role="group" aria-label="Choose a landmark">
            {buildings.map(building => <button key={building.slug} type="button" aria-pressed={activeSlug === building.slug} aria-controls="town-building-details" onClick={() => setActiveSlug(building.slug)} className={`flex min-h-16 cursor-pointer items-center gap-3 border-r border-b border-white/10 px-4 py-4 text-left text-xs font-semibold transition-colors ${activeSlug === building.slug ? "bg-[#e0c46d] text-[#18271f]" : "text-white/85 hover:bg-white/10"}`}><span className="text-[0.65rem] opacity-70">{building.number}</span>{building.name}</button>)}
          </div>

          <div id="town-building-details" className="bg-[#f2eee4] p-6 text-[#18202a] md:p-8" aria-live="polite" aria-atomic="true">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <p className="text-[0.63rem] font-bold tracking-[0.18em] text-[#3d5a3e] uppercase">Selected building · {active.number}</p>
                <h3 className="display-type mt-3 text-3xl leading-none md:text-4xl">{active.name}</h3>
                <p className="mt-4 text-xs font-semibold tracking-wide text-black/60">{active.type} · {active.era}</p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-black/75">{active.summary}</p>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <div className="border-l-2 border-[#3d5a3e] pl-5">
                  <p className="text-[0.61rem] font-bold tracking-[0.15em] text-[#3d5a3e] uppercase">What to notice</p>
                  <p className="mt-3 text-sm leading-7 text-black/75">{active.lookFor}</p>
                </div>
                <Link href={`/explore/${active.slug}`} className="group flex items-center justify-between gap-5 border-t border-black/20 pt-5 text-[0.65rem] font-bold tracking-[0.15em] text-[#0e1c27] uppercase hover:text-[#3d5a3e]">Read full building history &amp; records<ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
