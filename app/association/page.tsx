import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About the Association",
  description: "Learn about the Garnet Preservation Association, its partnership with BLM, preservation work, and funding.",
};

export default function AssociationPage() {
  return (
    <main id="main-content" className="bg-[#f4f0e7] text-[#24352b]">
      <section className="bg-[#1e2f1f] px-5 pt-44 pb-14 text-[#f8f6f1] md:px-10 md:pt-48">
        <div className="mx-auto grid max-w-[82rem] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-[#e0c46d]">Garnet Preservation Association</p>
            <h1 className="display-type mt-4 text-5xl leading-tight md:text-6xl">About the Association</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">The Garnet Preservation Association (GPA) is a nonprofit organization of local community members dedicated to protecting and preserving Garnet Ghost Town.</p>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/getinvolved-missionstatement-garnet3.webp" alt="Two women seated at an outdoor event table with artwork, papers, and raffle tickets at Garnet" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
            </div>
          </figure>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div><p className="mb-5 text-sm font-semibold text-[#98613d]">Our mission</p><h2 className="display-type leading-[0.95] section-heading">Protecting Garnet.<span className="block text-[#3d5a3e]">Sharing its history.</span></h2></div>
          <div className="prose-copy text-base leading-8 text-black/72">
            <p>GPA works in partnership with the Bureau of Land Management (BLM). Together, they enhance the interpretation, education, and stabilization of Garnet.</p>
            <p>Coordinated activities include historic building assessment and restoration, co-sponsoring interpretive activities, assisting with oral history collection, and offering items for sale in the Visitor Center that have educational and interpretive value.</p>
            <p>The Garnet Preservation Association is supported mostly by contributions from people like you!</p>
          </div>
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-[82rem]">
          <figure className="max-w-4xl">
            <Image src="/images/getinvolved-missionstatement-garnet4.webp" alt="A group with guitars and ukuleles gathered beneath a canopy beside a wooden building at Garnet" width={1048} height={786} sizes="(min-width: 1024px) 65vw, 100vw" className="h-auto w-full" />
          </figure>
        </Reveal>
      </section>

      <section className="paper-grain bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-2 lg:gap-16">
          <div><p className="mb-5 text-sm font-semibold text-[#e0c46d]">How GPA is funded</p><h2 className="display-type leading-[0.95] section-heading">Your support<span className="block">goes back to Garnet.</span></h2></div>
          <div>
            <p className="text-base leading-8 text-white/74">We obtain 100% of our operating funds each year from memberships, Garnet Ghost Town license plate sales, donations, and revenue from our Visitor Center. All of this income goes directly back into preservation, interpretation, and stabilization of Garnet, but we need your help to keep it going!</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-semibold text-[#e0c46d]"><Link href="/preserve" className="border-b border-[#e0c46d]/60 pb-2">Get involved →</Link><Link href="/license-plate" className="border-b border-[#e0c46d]/60 pb-2">License plate &amp; grants →</Link></div>
          </div>
        </Reveal>
      </section>

      {/* Meetings and minutes are paused pending the association’s decision.
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div><p className="mb-5 text-sm font-semibold text-[#98613d]">Association meetings</p><h2 className="display-type leading-[0.95] section-heading">Meetings<span className="block text-[#3d5a3e]">and minutes.</span></h2></div>
            <div>
              <p className="text-base leading-8 text-black/72">GPA meetings are normally held on the third Tuesday of the month at 5:30 p.m. at the Bureau of Land Management Office.</p>
              <address className="mt-6 border-l-2 border-[#d3b350] pl-5 not-italic leading-8 text-black/72">Bureau of Land Management Office<br />3255 Fort Missoula Road<br />Missoula, Montana 59804</address>
              <p className="mt-6 text-sm leading-7 text-black/62">For meeting information, call <a href="tel:+14063293914" className="font-semibold underline underline-offset-4">406-329-3914</a> or email <a href="mailto:BLM_MT_Missoula_FO@blm.gov" className="break-all font-semibold underline underline-offset-4">BLM_MT_Missoula_FO@blm.gov</a>.</p>
            </div>
          </Reveal>
          <Reveal className="mt-12 grid gap-6 border-t border-black/15 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <h3 className="display-type text-3xl">Meeting minutes</h3>
            Add the January–September 2026 minutes when the actual files are supplied.
            <p className="text-base leading-8 text-black/72">Meeting minutes will be available here. Please contact the association to request a copy.</p>
          </Reveal>
        </div>
      </section>
      */}

      <section className="bg-[#e9e1d1] px-5 py-14 md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <h2 className="display-type leading-[0.95] section-heading">Contact the<span className="block text-[#3d5a3e]">association.</span></h2>
          <div><address className="not-italic text-base leading-8 text-black/72"><span className="font-semibold text-[#24352b]">Garnet Preservation Association, Inc.</span><br />PO Box 18295<br />Missoula, MT 59808</address><a href="tel:+14063293914" className="mt-6 inline-block border-b border-[#98613d] pb-2 font-semibold">406-329-3914</a></div>
        </Reveal>
      </section>
    </main>
  );
}
