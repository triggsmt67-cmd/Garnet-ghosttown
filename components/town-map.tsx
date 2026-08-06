"use client";

import Link from "next/link";
import { useState } from "react";
import { buildings } from "@/lib/buildings";
import { ArrowRight } from "./icons";

export function TownMap() {
  const [activeSlug, setActiveSlug] = useState(buildings[0].slug);
  const active = buildings.find((building) => building.slug === activeSlug) ?? buildings[0];

  return (
    <section
      id="town-map"
      className="paper-grain overflow-hidden bg-[#0d1218] px-5 py-20 text-[#f8f6f1] md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[82rem]">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.2em] text-[#e0c46d] uppercase">
              Town sketch · Five stops
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/52">
              Select a building for a short field note, then open its full story.
            </p>
          </div>
          <h2 className="display-type text-5xl leading-[0.95] font-extrabold tracking-[-0.035em] md:text-7xl">
            Find the town inside
            <span className="block text-[#e0c46d]">the ghost town.</span>
          </h2>
        </div>

        <div className="mt-14 grid overflow-hidden border border-white/15 lg:grid-cols-[1.35fr_.65fr]">
          <div className="relative min-h-[31rem] overflow-hidden border-b border-white/15 bg-[#0e1c27] lg:min-h-[43rem] lg:border-r lg:border-b-0">
            <div className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(214,183,116,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(214,183,116,.2)_1px,transparent_1px)] [background-size:32px_32px]" />
            <svg
              aria-hidden="true"
              viewBox="0 0 700 620"
              className="absolute inset-0 h-full w-full text-[#e0c46d]/25"
              preserveAspectRatio="none"
            >
              <path
                d="M70 620C125 505 210 458 294 404c93-60 144-111 204-205 39-62 73-128 132-199"
                fill="none"
                stroke="currentColor"
                strokeWidth="34"
                strokeLinecap="round"
              />
              <path
                d="M70 620C125 505 210 458 294 404c93-60 144-111 204-205 39-62 73-128 132-199"
                fill="none"
                stroke="#0e1c27"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M102 590C230 560 338 560 447 604M286 408c100 12 206 4 325-46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="7 9"
              />
            </svg>

            <div className="absolute left-5 top-5 z-10 max-w-[14rem] border border-white/15 bg-[#0d1218]/88 px-4 py-3 backdrop-blur-sm">
              <p className="text-[0.6rem] font-bold tracking-[0.16em] text-[#e0c46d] uppercase">
                Interpretive town plan
              </p>
              <p className="mt-1 text-xs leading-5 text-white/45">Not intended for navigation</p>
            </div>

            {buildings.map((building) => {
              const selected = building.slug === active.slug;
              return (
                <button
                  key={building.slug}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Show ${building.name}`}
                  onClick={() => setActiveSlug(building.slug)}
                  className={`group absolute z-10 flex min-h-12 items-center justify-center border px-2 transition-[background,border-color,box-shadow,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0c46d] ${
                    selected
                      ? "border-[#e0c46d] bg-[#e0c46d] text-[#0d1218] shadow-[0_0_0_7px_rgba(214,183,116,.12)]"
                      : "border-[#d3b350]/45 bg-[#162a39] text-[#f8f6f1] hover:border-[#d3b350] hover:bg-[#213b4e]"
                  }`}
                  style={{
                    left: building.map.left,
                    top: building.map.top,
                    width: building.map.width,
                    height: building.map.height,
                    transform: `rotate(${building.map.rotate})`,
                  }}
                >
                  <span className="text-center text-[0.56rem] font-bold leading-tight tracking-[0.08em] uppercase md:text-[0.62rem]">
                    {building.name}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 text-[0.58rem] font-bold tracking-[0.15em] text-white/40 uppercase">
              <span className="h-px w-10 bg-[#e0c46d]/50" />
              First Chance Gulch
            </div>
          </div>

          <div
            className="flex min-h-[31rem] flex-col justify-between bg-[#f2eee4] p-7 text-[#18202a] md:p-10 lg:min-h-[43rem]"
            aria-live="polite"
          >
            <div>
              <div className="flex items-start justify-between gap-6">
                <p className="text-[0.63rem] font-bold tracking-[0.18em] text-[#3d5a3e] uppercase">
                  Selected building
                </p>
                <p className="text-right text-[0.6rem] font-bold tracking-[0.12em] text-black/42 uppercase">
                  {active.era}
                </p>
              </div>
              <p className="mt-5 text-xs font-bold tracking-[0.12em] text-black/42 uppercase">
                {active.type}
              </p>
              <h3 className="display-type mt-3 text-4xl leading-none font-extrabold md:text-5xl">
                {active.name}
              </h3>
              <p className="mt-7 text-sm leading-7 text-black/62">{active.summary}</p>

              <div className="mt-8 border-l-2 border-[#3d5a3e] pl-5">
                <p className="text-[0.61rem] font-bold tracking-[0.15em] text-[#3d5a3e] uppercase">
                  What to notice
                </p>
                <p className="mt-3 text-sm leading-7 text-black/58">{active.lookFor}</p>
              </div>
            </div>

            <div>
              <Link
                href={`/explore/${active.slug}`}
                className="group flex items-center justify-between border-t border-black/20 pt-5 text-[0.65rem] font-bold tracking-[0.15em] uppercase"
              >
                Read the building story
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
