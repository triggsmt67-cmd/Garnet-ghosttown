import Link from "next/link";
import { Mountain } from "./icons";
import { PageClosing } from "./page-closing";

export function Footer() {
  return (
    <footer className="paper-grain overflow-hidden bg-[#0d1218] text-[#f8f6f1]">
      <PageClosing />
      <aside aria-label="Travel recognition" className="border-b border-[#24352b]/15 bg-[#f4f0e7] px-5 py-7 text-center text-[#24352b] md:px-10">
        <p className="display-type text-xl leading-relaxed text-[#24352b] md:text-2xl">Named one of America’s coolest ghost towns by <span className="whitespace-nowrap text-[#98613d]">Travel + Leisure</span></p>
        <a href="https://www.smithsonianmag.com/travel/americas-coolest-ghost-towns-180952954/#:~:text=Garnet%2C%20Montana" target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs leading-6 text-[#625b50] underline underline-offset-4 hover:text-[#24352b]">Read the 2014 article, republished by Smithsonian ↗</a>
      </aside>
      <div className="mx-auto max-w-[90rem] px-5 py-10 md:px-10 md:py-12">
        <div className="grid gap-8 text-sm text-white/72 md:grid-cols-[1fr_auto_auto] md:gap-16">
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
              <Link className="hover:text-[#e0c46d]" href="/updates">Current updates</Link>
              <Link className="hover:text-[#e0c46d]" href="/faq">Common questions</Link>
              <Link className="hover:text-[#e0c46d]" href="/cabin-rentals">Winter cabin rentals</Link>
              <Link className="hover:text-[#e0c46d]" href="/explore">Explore</Link>
              <Link className="hover:text-[#e0c46d]" href="/about">About Garnet</Link>
              <Link className="hover:text-[#e0c46d]" href="/history">History timeline</Link>
              <Link className="hover:text-[#e0c46d]" href="/board">Board members</Link>
              <Link className="hover:text-[#e0c46d]" href="/license-plate">License plate</Link>
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
        <p className="mt-8 text-[0.65rem] tracking-[0.08em] text-white/55 uppercase">
          Visitor details can change with weather and season. Confirm current conditions with the BLM before travel.
        </p>
      </div>
    </footer>
  );
}
