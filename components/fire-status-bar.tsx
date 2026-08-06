"use client";

import { ArrowUpRight, Flame } from "./icons";
import { FIRE_MAP_URL, useFireRestrictions } from "./use-fire-restrictions";

export function FireStatusBar() {
  const { isLoading, isUrgent, status } = useFireRestrictions();

  return (
    <div
      className={`border-b text-white transition-colors duration-500 ${
        isUrgent
          ? "border-[#3d5a3e] bg-[#3d5a3e]"
          : "border-[#3d5a3e] bg-[#3d5a3e]"
      }`}
      role="status"
      aria-live="polite"
    >
      <a
        href={FIRE_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className="group mx-auto flex max-w-[90rem] items-center justify-center gap-2.5 px-4 py-3 text-xs sm:text-sm font-semibold tracking-wide md:gap-4 md:py-3.5"
      >
        <Flame className={`h-5 w-5 shrink-0 ${isUrgent ? 'animate-pulse text-[#e0c46d]' : 'text-[#f5d57b]'}`} />
        <span className="text-white/80 uppercase tracking-widest hidden sm:inline">Garnet fire status</span>
        <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full bg-[#f5d57b] sm:block" />
        <span className={`font-bold text-[13px] sm:text-[15px] drop-shadow-sm uppercase tracking-wide ${isUrgent ? 'text-[#ffcf40]' : 'text-white'}`}>{isLoading ? "Checking the official map…" : status}</span>
        <span className="hidden text-white/70 lg:inline">— Verify the morning you travel</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-white/70" />
      </a>
    </div>
  );
}
