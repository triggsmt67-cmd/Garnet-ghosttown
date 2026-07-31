import Link from "next/link";
import { ArrowUpRight, Mountain } from "./icons";
import { PreservationBanner } from "./preservation-banner";

export function Footer() {
  return (
    <footer className="paper-grain overflow-hidden bg-[#0d1218] text-[#f8f6f1]">
      <PreservationBanner />
      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#d3b350] uppercase">
              Preserved in the Garnet Mountains
            </span>
            <h2 className="display-type mt-6 max-w-3xl text-5xl leading-[0.95] font-medium md:text-7xl">
              Give Garnet two or three unhurried hours.
            </h2>
          </div>
          <div className="flex items-end lg:justify-end">
            <Link
              href="/visit"
              className="group flex w-full max-w-sm items-center justify-between border-b border-[#d3b350] py-5 text-sm font-bold tracking-[0.15em] uppercase"
            >
              Plan your visit
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 pt-10 text-sm text-white/55 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[#f8f6f1]">
              <Mountain className="h-8 w-12 text-[#d3b350]" />
              <span className="display-type text-2xl">Garnet Ghost Town</span>
            </div>
            <p className="max-w-md">
              About 35 miles east of Missoula, with the final 10–11 miles on mountain
              gravel. Check conditions before leaving pavement.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.15em] text-white uppercase">Explore</p>
            <div className="grid gap-2">
              <Link className="hover:text-[#e0c46d]" href="/visit">Plan Your Visit</Link>
              <Link className="hover:text-[#e0c46d]" href="/explore">Things to See</Link>
              <Link className="hover:text-[#e0c46d]" href="/history">History</Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.15em] text-white uppercase">Official</p>
            <div className="grid gap-2">
              <a className="hover:text-[#e0c46d]" href="https://www.blm.gov/visit/garnet-ghost-town" target="_blank" rel="noreferrer">BLM visitor page ↗</a>
              <a className="hover:text-[#e0c46d]" href="https://garnetghosttown.org/" target="_blank" rel="noreferrer">Preservation association ↗</a>
              <a className="hover:text-[#e0c46d]" href="tel:4063293914">406.329.3914</a>
            </div>
          </div>
        </div>
        <p className="mt-14 text-[0.65rem] tracking-[0.08em] text-white/30 uppercase">
          Concept redesign · Visitor details can change with weather and season. Confirm with the BLM before travel.
        </p>
      </div>
    </footer>
  );
}
