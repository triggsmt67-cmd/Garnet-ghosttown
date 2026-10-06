import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "Preserve Garnet",
  description: "Learn how the Bureau of Land Management and Garnet Preservation Association protect and interpret Garnet Ghost Town.",
};

export default function PreservePage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Preserve Garnet"
        title="Help keep Garnet standing."
        intro="Snow loads roofs. Spring water shifts foundations. Summer visitors wear paths through fragile rooms. Preservation crews address that damage without rebuilding Garnet into something new."
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
                Preservation begins
                <span className="block text-[#3d5a3e]">with what is original.</span>
              </h2>
            </div>
            <div className="prose-copy min-w-0 self-end text-base leading-8 text-black/72">
              <p>
                Garnet&apos;s buildings went up quickly, many with little or no foundation.
                Keeping them standing takes careful work. Crews protect the old wood and
                other materials so the buildings still look and feel like Garnet.
              </p>
              <p>
                Some repairs are hidden from view. Crews support buildings below ground,
                add braces behind old boards, and strengthen weak roof beams. This helps
                protect the buildings while keeping their weathered surfaces.
              </p>
              <p>
                The Bureau of Land Management manages the historic site. The nonprofit
                Garnet Preservation Association helps fund repairs, school programs,
                visitor-center activities, and recordings of people’s memories.
              </p>
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

      <section className="paper-grain bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="max-w-5xl">
            <h2 className="display-type leading-[0.95] section-heading">
              Care for the buildings.
              <br />
              Share their history.
            </h2>
          </Reveal>

          <div className="mt-16 divide-y divide-white/15 border-y border-white/15">
            {[
              ["Building repairs", "Snow, water, and shifting ground wear down the buildings. Crews strengthen roofs, support weak walls, and repair foundations. They keep as much original material as possible so the buildings retain their historic appearance."],
              ["Sharing the stories", "Knowing who lived and worked in a room helps visitors picture its past. Signs, displays, recorded memories, and staff explain the people and everyday details behind Garnet’s buildings."],
              ["Learning at Garnet", "Students learn from the schoolhouse, mine trail, shops, and household objects. Field trips and classroom lessons show how the mountains, mining, and family life shaped the town."],
            ].map(([title, copy], index) => (
              <Reveal
                key={title}
                className="grid gap-5 py-8 md:grid-cols-[.65fr_1.35fr] md:gap-12 md:py-10"
                delay={index * 90}
              >
                <h3 className="display-type text-3xl text-[#e0c46d]">{title}</h3>
                <p className="max-w-2xl text-base leading-8 text-white/74">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <Reveal className="mx-auto max-w-[82rem] border border-black/15 p-7 md:p-12">
          <div>
            <div>
              <h2 className="display-type leading-[0.96] section-heading">
                Support the care of Garnet.
                <span className="block text-[#3d5a3e]">Become a member.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/72">
                Your membership helps care for Garnet and share its history.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-12 border-t border-black/15 pt-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <h3 className="display-type text-3xl text-[#0e1c27]">Membership benefits include:</h3>
              <ul className="mt-6 grid gap-4 text-base leading-7 text-black/72">
                <li className="border-l-2 border-[#d3b350] pl-4">10% off items sold at the Visitor Center.</li>
                <li className="border-l-2 border-[#d3b350] pl-4">
                  A quarterly newsletter with the latest restoration work, historical projects,
                  cabin acquisitions, and more.
                </li>
                <li className="border-l-2 border-[#d3b350] pl-4">
                  Free admission to Garnet on every visit for all Garnet Preservation Association,
                  Inc. members.
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
                  ["Lifetime", "$500.00"],
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
            100% of your donation to this 501(c)(3) nonprofit organization goes back into the
            care of Garnet’s buildings and programs that share its history.
          </p>
          <p className="mt-3 text-sm leading-7 text-black/62">
            Membership enrollment details will be added here when the current application
            information is confirmed.
          </p>
        </Reveal>
      </section>
      <section className="bg-[#e9e1d1] px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-[82rem] gap-8 md:grid-cols-2">
          <div><h2 className="display-type text-3xl">Meet our board</h2><p className="mt-3 leading-7">Learn about the people who guide the association’s work.</p><Link href="/board" className="mt-4 inline-block border-b border-[#98613d] pb-2 font-semibold">Board members →</Link></div>
          <div><h2 className="display-type text-3xl">Support history with your plate</h2><p className="mt-3 leading-7">The ghost town plate helps fund preservation at Garnet and across Montana.</p><Link href="/license-plate" className="mt-4 inline-block border-b border-[#98613d] pb-2 font-semibold">Explore the license plate →</Link></div>
        </div>
      </section>
    </main>
  );
}
