import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Support Garnet Ghost Town through membership, donations, historical contributions, and BLM volunteer opportunities.",
};

export default function PreservePage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Get Involved"
        title="Help keep Garnet standing."
        intro="Become a member, make a contribution, share a piece of Garnet’s history, or lend your skills. Your support helps the Garnet Preservation Association protect the town and keep its stories alive."
        image="/images/preserve/garnet-preservation-team.jpg"
        imageAlt="Four members of the Garnet preservation community gathered behind a historic wooden bar"
        imagePosition="object-[60%_42%] sm:object-[center_42%] lg:origin-left lg:scale-[1.12]"
        contentClassName="mt-40 sm:mt-24 md:mt-0"
      />

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid min-w-0 gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="min-w-0">
              <h2 className="display-type leading-[0.9] tracking-[-0.04em] section-heading">
                Help preserve
                <span className="block text-[#3d5a3e]">Garnet’s history.</span>
              </h2>
            </div>
            <div className="prose-copy min-w-0 self-end text-base leading-8 text-black/72">
              <p>The Garnet Preservation Association (GPA) is a nonprofit organization of local community members dedicated to protecting and preserving Garnet Ghost Town. GPA works in partnership with the Bureau of Land Management (BLM) to enhance interpretation, education, and stabilization at Garnet. Coordinated activities include historic building assessment and restoration, co-sponsoring interpretive activities, assisting with oral history collection, and offering educational and interpretive items for sale in the Visitor Center.</p>
              <p>GPA receives 100% of its annual operating funds from memberships, Garnet Ghost Town license plate sales, donations, and Visitor Center revenue. All of this income goes directly back into preservation, interpretation, and stabilization of Garnet. Contributions from people like you help keep this work going.</p>
              <nav aria-label="Ways to get involved" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#3d5a3e]">
                <a href="#membership" className="underline underline-offset-4">Membership</a>
                <a href="#donations" className="underline underline-offset-4">Donations</a>
                <a href="#history" className="underline underline-offset-4">Share history</a>
                <a href="#volunteer" className="underline underline-offset-4">Volunteer</a>
              </nav>
            </div>
          </Reveal>

          <Reveal className="image-reveal relative mt-10 aspect-[4/3] overflow-hidden sm:aspect-[16/7]">
            <Image
              src="/images/historic/university-archive/garnet-ghost-town-storefront-under-restoration-72-0593.webp"
              alt="Historic Garnet storefront braced with lumber during restoration work"
              fill
              sizes="100vw"
              className="object-cover object-center contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <p className="display-type absolute bottom-7 left-7 z-10 max-w-xl text-2xl leading-tight text-white md:bottom-10 md:left-10 md:text-3xl">
              Repairing Garnet’s original buildings.
            </p>
          </Reveal>
          <p className="archive-caption text-black/65">Lumber braces a Garnet storefront during restoration. Courtesy of University of Montana.</p>
        </div>
      </section>

      <section id="membership" className="scroll-mt-28 px-5 py-14 md:px-10 md:py-20">
        <Reveal className="mx-auto max-w-[82rem] border border-black/15 p-7 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
            <div>
              <h2 className="display-type leading-[0.96] section-heading">
                Support the care of Garnet.
                <span className="block text-[#3d5a3e]">Become a member.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/72">
                Your membership supports preservation, interpretation, and stabilization at Garnet. Choose the level that works for you and stay connected to the town throughout the year.
              </p>
            </div>
          <figure>
            <Image src="/images/getinvolved-missionstatement-garnet2.webp" alt="A woman holding two plates of pie behind a table of desserts inside a historic Garnet building" width={1048} height={786} sizes="(min-width: 768px) 40vw, 100vw" className="h-auto w-full" />
          </figure>
          </div>

          <div className="mt-12 grid gap-12 border-t border-black/15 pt-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <h3 className="display-type text-3xl text-[#0e1c27]">Membership benefits include:</h3>
              <ul className="mt-6 grid gap-4 text-base leading-7 text-black/72">
                <li className="border-l-2 border-[#d3b350] pl-4">10% off items sold at the Visitor Center.</li>
                <li className="border-l-2 border-[#d3b350] pl-4">
                  A quarterly newsletter with restoration updates, historical stories and photographs, events, and more.
                </li>
                <li className="border-l-2 border-[#d3b350] pl-4">
                  Free admission to Garnet on every visit for all Garnet Preservation Association,
                  Inc. members. Display a copy of your membership card on your dashboard for the rangers to see.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="display-type text-3xl text-[#0e1c27]">Membership options:</h3>
              <dl className="mt-6 divide-y divide-black/12 border-y border-black/12">
                {[
                  ["Individual", "$20.00"],
                  ["Family", "$30.00"],
                  ["Sponsor", "$50.00"],
                  ["Benefactor", "$100.00"],
                ].map(([name, price]) => (
                  <div key={name} className="flex items-center justify-between gap-6 py-3.5">
                    <dt className="font-semibold text-[#0e1c27]">{name}</dt>
                    <dd className="text-black/65">{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <p className="mt-10 border-t border-black/15 pt-8 text-sm leading-7 text-black/62">
            100% of membership money and donations to GPA, a 501(c)(3) nonprofit organization, stays at Garnet and is used for its management, interpretation, and stabilization.
          </p>
          <p className="mt-3 text-sm leading-7 text-black/62">
            For membership and application information, call <a href="tel:+14063293914" className="font-semibold underline underline-offset-4">406-329-3914</a>.
          </p>
          {/* Replace this placeholder with the association’s Zeffy membership embed when supplied. */}
          <div aria-label="Zeffy membership form placeholder" className="mt-8 flex min-h-64 flex-col items-center justify-center border border-dashed border-[#3d5a3e]/40 bg-[#e9e1d1]/40 p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3d5a3e]">Online membership</p>
            <h3 className="display-type mt-3 text-3xl text-[#0e1c27]">Become a member through Zeffy</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-black/62">Online membership registration is coming soon. For now, please call the number above for membership information.</p>
          </div>
        </Reveal>
      </section>
      <section id="donations" className="paper-grain scroll-mt-28 bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[82rem] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 text-sm font-semibold text-[#e0c46d]">Make a donation</p>
            <h2 className="display-type leading-[0.95] section-heading">Help care for<br />what remains.</h2>
            <p className="mt-7 text-base leading-8 text-white/74">Garnet welcomes four kinds of contributions: money, time, help recording the past, and the return of artifacts that once belonged in the town.</p>
            <p className="mt-5 text-base leading-8 text-white/74">Financial donations support operating costs, restoration, preservation, interpretation, structural stabilization, historical artifact preservation, and educational programs. Your generosity helps protect Garnet’s cabins, saloons, and storefronts for generations to explore. Donations are tax deductible.</p>
            <p className="mt-5 text-base leading-8 text-white/74">To ask about making a contribution, call <a href="tel:+14063293914" className="font-semibold text-[#e0c46d] underline underline-offset-4">406-329-3914</a> or write to Garnet Preservation Association, Inc., PO Box 18295, Missoula, MT 59808.</p>
            {/* Replace this placeholder with the association’s Zeffy donation embed when supplied. */}
            <div aria-label="Zeffy donation form placeholder" className="mt-8 flex min-h-64 flex-col items-center justify-center border border-dashed border-[#e0c46d]/50 bg-white/5 p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e0c46d]">Online donations</p>
              <h3 className="display-type mt-3 text-3xl">Make a donation through Zeffy</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/74">Online donations are coming soon. For now, please contact GPA using the details above to ask about contributing.</p>
            </div>
          </div>
          <figure>
            <div className="image-reveal relative aspect-[4/3] overflow-hidden">
              <Image src="/images/getinvolved-donations-oldbuilding.webp" alt="Snow surrounds a partially collapsed wooden building among evergreen trees at Garnet" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="archive-caption text-white/65">A weathered building at Garnet shows how much can be lost to time and the elements.</figcaption>
          </figure>
        </Reveal>
      </section>

      <section id="history" className="scroll-mt-28 px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <h2 className="display-type leading-[0.95] section-heading">Do you have a piece<span className="block text-[#3d5a3e]">of Garnet’s history?</span></h2>
            <div className="prose-copy text-base leading-8 text-black/72">
              <p>Helping record the history of Garnet and its people is another way to donate. If you have family members who lived in Garnet and have photographs, family histories, diaries, stories, or recordings, GPA would love for you to share them. There are many stories the association hopes to capture before they are lost to time.</p>
              <p>Garnet stood empty after the Dahl family left in the 1960s, before BLM became involved in the early 1970s. After Frank Davey died in 1947, an auction of goods from his store and the hotel was scheduled for November. Snow postponed the sale until July 1948. Other objects were removed during the years the town was abandoned. Some survived because people took them home and cared for them.</p>
              <p className="text-sm"><a href="https://www.blm.gov/sites/default/files/docs/2021-07/THE%20ROAD%20TO%20GARNET%27S%20GOLD%20%28002%29.pdf#page=147" className="underline underline-offset-4">Historical reference: BLM, The Road to Garnet’s Gold (2021), p. 139 ↗</a></p>
              <p>Items that have returned to Garnet include diaries, logbooks, photo albums, a mortar and pestle, watches, shoemaking supplies, and Frank Davey’s buggy. GPA purchased the buggy from a local farmer who had stored it in a barn since the auction. The association appreciates the generosity of everyone who has helped bring Garnet’s history back.</p>
              <p>If you have an artifact that once belonged in Garnet and are willing to part with it, GPA would be happy to work with you.</p>
              <p>Have a story or an object to share? Call <a href="tel:+14063293914" className="font-semibold text-[#3d5a3e] underline underline-offset-4">406-329-3914</a> to discuss its connection to Garnet.</p>
            </div>
          </Reveal>
          <Reveal className="mt-14 grid items-center gap-10 border-t border-black/15 pt-12 md:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <figure className="mx-auto w-full max-w-md">
              <div className="image-reveal relative aspect-[3/4] overflow-hidden">
                <Image src="/images/getinvolved-donations-staircaseinhotel.webp" alt="Wooden staircase and banister inside the Wells Hotel at Garnet" fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="archive-caption text-black/65">The Wells Hotel staircase was crafted and installed by a carpenter who donated his expertise.</figcaption>
            </figure>
            <div>
              <h3 className="display-type text-4xl leading-tight text-[#0e1c27]">Your skills have a place here, too.</h3>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/72">Giving your time can mean helping at an event, contributing to the Visitor Center, or bringing a particular skill to a project. Writing, grant writing, art, poetry, and carpentry are all ways to contribute. The staircase in the Wells Hotel is one example of what donated expertise can make possible.</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-black/72">Contact GPA to share your ideas. For seasonal on-site volunteer positions, see the BLM information below.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="volunteer" className="scroll-mt-28 bg-[#e9e1d1] px-5 py-14 md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <p className="mb-5 text-sm font-semibold text-[#98613d]">Volunteer at Garnet</p>
            <h2 className="display-type leading-[0.95] section-heading">Lend a hand.<br />Spend time with history.</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-black/72">The Bureau of Land Management handles employment and seasonal volunteer positions at Garnet. The usual volunteer season runs from May 14 through October 1. Housing and an RV site may be available; confirm current openings and arrangements with BLM.</p>
            <p className="mt-5 text-base leading-8 text-black/72">Garnet is remote and has limited modern conveniences. Consider those conditions before applying. Seasonal opportunities may be listed through <a href="https://www.volunteer.gov/" className="font-semibold text-[#3d5a3e] underline underline-offset-4">Volunteer.gov</a>.</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-semibold text-[#3d5a3e]">
              <a href="tel:+14063293914" className="underline underline-offset-4">Call BLM: 406-329-3914</a>
              <a href="mailto:BLM_MT_Missoula_FO@blm.gov" className="break-all underline underline-offset-4">Email the Missoula Field Office</a>
            </div>
            <aside className="mt-8 border-l-2 border-[#98613d] pl-5 text-sm leading-7 text-black/72">
              <h3 className="font-semibold text-[#0e1c27]">A note about volunteering</h3>
              <p className="mt-2">Online claims that Garnet gives away free land or lets people move here for free and get paid to volunteer are incorrect. Garnet does not offer free land. You cannot move to Garnet to live or acquire land; it is public land managed by BLM. Volunteers must apply and be hired through BLM, including a background check.</p>
            </aside>
          </div>
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-[82rem]">
          <figure>
            <Image src="/images/Getinvolved-volunteer.webp" alt="A large group in period clothing gathered on a wooden boardwalk outside a historic Garnet building" width={1048} height={786} sizes="(min-width: 1024px) 80vw, 100vw" className="h-auto w-full" />
          </figure>
        </Reveal>
      </section>
      <section className="px-5 py-10 md:px-10">
        <div className="mx-auto max-w-[82rem]">
          <h2 className="display-type text-3xl">Support history with your plate</h2>
          <p className="mt-3 max-w-2xl leading-7 text-black/72">The Ghost Town license plate helps fund preservation at Garnet and across Montana.</p>
          <Link href="/license-plate" className="mt-4 inline-block border-b border-[#98613d] pb-2 font-semibold">Explore the license plate →</Link>
        </div>
      </section>
    </main>
  );
}
