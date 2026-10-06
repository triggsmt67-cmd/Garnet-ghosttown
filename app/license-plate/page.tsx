import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Ghost Town License Plate", description: "Support Garnet and other Montana ghost towns with the Explore Montana Ghost Towns specialty plate." };
const steps = [
  ["Visit your county treasurer.", "Go to a Montana County Treasurer Motor Vehicle Office to request the plate."],
  ["Ask for the ghost town plate.", "Request the Explore Montana Ghost Towns plate sponsored by the Garnet Preservation Association."],
  ["Pay the required fees.", "The plate includes a $20 sponsor donation and $20 in initial specialty plate administrative fees, in addition to your regular registration costs. The annual sponsor donation is $20."],
  ["Check timing and availability.", "Ask your county treasurer about switching before your renewal month. If the plate is not in stock, the office can issue a temporary registration permit while you wait."],
];
export default function LicensePlatePage() {
  return <main id="main-content" className="bg-[#f4f0e7] text-[#24352b]">
    <section className="bg-[#1e2f1f] px-5 pt-44 pb-14 text-[#f8f6f1] md:px-10 md:pt-48">
      <div className="mx-auto grid max-w-[82rem] items-center gap-10 lg:grid-cols-2">
        <div><p className="text-sm font-semibold text-[#e0c46d]">Explore Montana Ghost Towns</p><h1 className="display-type mt-4 text-5xl leading-tight md:text-6xl">A plate that helps preserve our past.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-white/80">The Garnet Preservation Association sponsors this Montana license plate. Your donation helps care for Garnet’s historic buildings and supports preservation at other ghost towns across the state.</p></div>
        <figure><Image src="/images/support/garnet-license-plate.png" alt="Explore Montana Ghost Towns specialty license plate, showing historic buildings at Garnet" width={1034} height={589} priority className="h-auto w-full" /><figcaption className="mt-3 text-xs text-white/70">Plate design from the Montana Motor Vehicle Division.</figcaption></figure>
      </div>
    </section>
    <section className="mx-auto max-w-[82rem] px-5 py-12 md:px-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div><p className="text-sm font-semibold text-[#98613d]">Where your donation goes</p><h2 className="display-type mt-3 text-4xl">Help at Garnet.<br />Help across Montana.</h2></div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="border-t-4 border-[#3d5a3e] pt-5"><p className="display-type text-6xl">75%</p><h3 className="mt-3 text-xl font-semibold">Stays at Garnet</h3><p className="mt-3 leading-7 text-[#625b50]">Supports stabilization and preservation of the historic buildings at Garnet.</p></div>
          <div className="border-t-4 border-[#a36b43] pt-5"><p className="display-type text-6xl">25%</p><h3 className="mt-3 text-xl font-semibold">Helps other ghost towns</h3><p className="mt-3 leading-7 text-[#625b50]">Goes into a statewide grant program. Other Montana ghost town groups can apply to preserve historic structures and create educational displays.</p></div>
        </div>
      </div>
      <div className="mt-16 border-t border-[#24352b]/20 pt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div><h2 className="display-type text-4xl">How to get yours</h2><p className="mt-4 max-w-sm leading-7 text-[#625b50]">Your county treasurer handles the request. Contact the office before you go to confirm current costs and availability.</p><a href="https://mvdmt.gov/county-treasurer-locations/" target="_blank" rel="noreferrer" className="mt-6 inline-block bg-[#3d5a3e] px-5 py-4 font-semibold text-white hover:bg-[#24352b]">Find your county treasurer ↗</a></div>
        <ol className="grid gap-7">{steps.map(([title, copy], index) => <li key={title} className="flex gap-5"><span className="display-type text-3xl text-[#98613d]" aria-hidden="true">0{index + 1}</span><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 leading-7 text-[#625b50]">{copy}</p></div></li>)}</ol>
      </div>
      <p className="mt-12 text-sm leading-6 text-[#625b50]">Details: <a href="https://mvdmt.gov/portfolio-item/garnet-preservation-association-inc/" className="underline underline-offset-4">Montana Motor Vehicle Division</a> · <a href="https://www.garnetghosttown.org/license-plate-grant" className="underline underline-offset-4">Ghost town grant program</a></p>
    </section>
  </main>;
}
