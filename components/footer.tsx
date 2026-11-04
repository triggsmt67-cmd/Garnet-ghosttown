import Link from "next/link";
import { Mountain } from "./icons";
import { PageClosing } from "./page-closing";

export function Footer() {
  return (
    <footer className="paper-grain overflow-hidden bg-[#0d1218] text-[#f8f6f1]">
      <PageClosing />
      <aside aria-label="Travel recognition" className="border-b border-[#24352b]/15 bg-[#f4f0e7] px-5 py-7 text-center text-[#24352b] md:px-10">
        <p className="display-type text-xl leading-relaxed text-[#24352b] md:text-2xl">Named one of America’s coolest ghost towns by <span className="whitespace-nowrap text-[#98613d]">Travel + Leisure</span></p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="https://www.smithsonianmag.com/travel/americas-coolest-ghost-towns-180952954/#:~:text=Garnet%2C%20Montana" target="_blank" rel="noreferrer" className="inline-block text-xs leading-6 text-[#625b50] underline underline-offset-4 hover:text-[#24352b]">Read the 2014 article, republished by Smithsonian ↗</a>
          <a href="https://www.travelandleisure.com/garnet-ghost-town-montana-12147011" target="_blank" rel="noreferrer" className="inline-block text-xs leading-6 text-[#625b50] underline underline-offset-4 hover:text-[#24352b]">Read the Garnet feature ↗</a>
        </div>
      </aside>
      <div className="mx-auto max-w-[90rem] px-5 py-10 md:px-10 md:py-12">
        <div className="grid gap-8 text-sm text-white/72 lg:grid-cols-[.85fr_2fr] lg:gap-16">
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
          <nav aria-label="Footer navigation" className="grid gap-x-8 gap-y-8 min-[360px]:grid-cols-2 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.15em] text-white uppercase">Visit</p>
              <div className="grid gap-2">
                <Link className="hover:text-[#e0c46d]" href="/visit">Plan Your Visit</Link>
                <Link className="hover:text-[#e0c46d]" href="/updates">Current updates</Link>
                <Link className="hover:text-[#e0c46d]" href="/faq">Common questions</Link>
                <Link className="hover:text-[#e0c46d]" href="/cabin-rentals">Winter cabin rentals</Link>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.15em] text-white uppercase">Explore</p>
              <div className="grid gap-2">
                <Link className="hover:text-[#e0c46d]" href="/explore">Explore</Link>
                <Link className="hover:text-[#e0c46d]" href="/gallery">Photo Gallery</Link>
                <Link className="hover:text-[#e0c46d]" href="/montana-ghost-towns">Montana ghost towns</Link>
                <Link className="hover:text-[#e0c46d]" href="/about">About Garnet</Link>
                <Link className="hover:text-[#e0c46d]" href="/history">History timeline</Link>
              </div>
            </div>
            <div className="min-[360px]:col-span-2 sm:col-span-1">
              <p className="mb-4 text-xs font-bold tracking-[0.15em] text-white uppercase">Get Involved</p>
              <div className="grid gap-2">
                <Link className="hover:text-[#e0c46d]" href="/association">About the Association</Link>
                <Link className="hover:text-[#e0c46d]" href="/license-plate">License Plate &amp; Grants</Link>
              </div>
              <p className="mt-6 mb-4 text-xs font-bold tracking-[0.15em] text-white uppercase">Official</p>
              <div className="grid gap-2">
                <a className="hover:text-[#e0c46d]" href="https://www.blm.gov/visit/garnet-ghost-town" target="_blank" rel="noreferrer">BLM visitor page ↗</a>
                <Link className="hover:text-[#e0c46d]" href="/association">Preservation association</Link>
                <a className="hover:text-[#e0c46d]" href="tel:4063293914">406.329.3914</a>
              </div>
            </div>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-start md:justify-between md:gap-8">
          <p className="max-w-3xl text-[0.65rem] tracking-[0.08em] text-white/55 uppercase">
            Visitor details can change with weather and season. Confirm current conditions with the BLM before travel.
          </p>
          <a href="https://truepath406.com" target="_blank" rel="noreferrer" className="self-start text-xs leading-6 text-white/60 underline underline-offset-4 transition-colors hover:text-[#e0c46d] md:shrink-0">Powered by TruePath Digital</a>
        </div>
      </div>
    </footer>
  );
}
