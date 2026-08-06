"use client";

import { ArrowUpRight, Flame } from "./icons";
import { FIRE_MAP_URL, useFireRestrictions } from "./use-fire-restrictions";

export function FireRestrictionsCard({ compact = false }: { compact?: boolean }) {
  const { isLoading, office, status } = useFireRestrictions();

  if (compact) {
    return (
      <article className="relative overflow-hidden bg-[#1e2f1f] p-6 text-[#f8f6f1] md:p-8">
        <Flame className="absolute -right-4 -top-5 h-28 w-28 text-[#d3b350]/12" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.64rem] font-bold tracking-[0.18em] text-[#d3b350] uppercase">
              Fire restrictions · official map
            </p>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#d3b350] shadow-[0_0_0_6px_rgba(211,179,80,.12)]" />
          </div>
          <p className="display-type mt-5 text-3xl leading-none" aria-live="polite">
            {isLoading ? "Reading current status…" : status}
          </p>
          <p className="mt-3 text-xs leading-5 text-white/58">
            {office}. Recheck on the morning of your visit.
          </p>
          <a
            href={FIRE_MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-3 border-b border-[#d3b350]/70 pb-2 text-[0.62rem] font-bold tracking-[0.14em] uppercase"
          >
            Open restrictions map
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative min-h-[22rem] overflow-hidden bg-[#1e2f1f] p-7 text-[#f8f6f1] md:p-9">
      <Flame className="absolute -right-10 -top-9 h-52 w-52 text-[#d3b350]/10 transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:scale-105" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-[#d3b350] uppercase">
              Fire restrictions · Garnet
            </p>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#d3b350] shadow-[0_0_0_6px_rgba(211,179,80,.12)]" />
          </div>
          <p className="display-type mt-8 text-4xl leading-[1.02]" aria-live="polite">
            {isLoading ? "Reading the official map…" : status}
          </p>
          <p className="mt-5 text-sm leading-7 text-white/62">
            Current map result for the Garnet coordinates on land managed by the{" "}
            {office}. Restrictions and closures can change quickly in summer.
          </p>
          <a
            href="tel:4063293914"
            className="mt-4 inline-flex text-[0.62rem] font-bold tracking-[0.13em] text-white/72 uppercase underline decoration-white/30 underline-offset-4"
          >
            Field office · 406.329.3914
          </a>
        </div>
        <a
          href={FIRE_MAP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex items-center justify-between border-t border-white/18 pt-5 text-[0.68rem] font-bold tracking-[0.14em] uppercase"
        >
          Check the official map today
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </article>
  );
}
