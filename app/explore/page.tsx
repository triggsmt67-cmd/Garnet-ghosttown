import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { TownMap } from "@/components/town-map";

export const metadata: Metadata = {
  title: "Explore Garnet",
  description:
    "Discover 29 preserved buildings, self-guided mining trails, scavenger hunts, geocaching, and mountain activities at Garnet Ghost Town.",
};

const experiences = [
  {
    title: "Walk the Historic Street",
    tag: "29 Preserved Structures",
    copy: "Step directly inside 29 surviving wooden buildings in authentic arrested decay—from the two-story Wells Hotel and Kelly’s Saloon to family parlors, the general store, and the schoolhouse. Five landmark buildings are staffed by interpretive guides daily from 10:00 a.m. to 4:30 p.m. in season.",
  },
  {
    title: "Trace the Sierra Mine Loop",
    tag: "Self-Guided Trail · 0.5 Mi",
    copy: "Pick up the illustrated trail brochure at the Visitor Center to explore the gold-bearing quartz veins above town. Numbered stations lead past original adits, collapsed stopes, waste rock dumps, and mining machinery that yielded over $950,000 during the 1898 boom.",
  },
  {
    title: "Climb to Frank Warren’s Park",
    tag: "Mountain Hike · 1.5 Mi RT",
    copy: "Follow the forest trail climbing 400 vertical feet to Frank Warren’s hand-hewn cabin and the mountain meadow where 1890s mining families gathered for summer baseball games, dances, and picnics. Enjoy sweeping panoramic vistas across the Garnet Range.",
  },
];

const activities = [
  {
    title: "Townsite Scavenger Hunt",
    tag: "All Ages · Free at Visitor Center",
    copy: "Pick up a free scavenger hunt card from the Visitor Center. A favorite for families and kids, this self-guided challenge prompts you to locate authentic 1890s architectural clues, hand-forged square nails, ornate cast-iron stove lids, and hidden cellar doors—encouraging close observation while teaching everyone to leave artifacts undisturbed.",
  },
  {
    title: "High-Country Geocaching",
    tag: "Backcountry GPS · Public Lands",
    copy: "The Garnet Range hosts several backcountry geocaches hidden on surrounding BLM public lands. Download offline GPS coordinates before leaving cell coverage to embark on a modern treasure hunt through mountain pine forests with rewarding views across First Chance Gulch.",
  },
  {
    title: "Garnet Back Country Byway",
    tag: "Scenic 12-Mile Mountain Drive",
    copy: "Designated as an official BLM Back Country Byway, the drive up Garnet Range Road offers scenic pullouts and sweeping panoramic vistas of the Blackfoot River Valley and Bob Marshall Wilderness. Keep an eye out for elk, mule deer, red-tailed hawks, and seasonal mountain wildflowers.",
  },
  {
    title: "Heritage Photography",
    tag: "Golden Hour · Historic Textures",
    copy: "With no utility poles, billboards, or modern storefronts, Garnet provides an unblemished historic backdrop for photographers. The soft morning and late afternoon light streaming through original wavy window panes and illuminating weathered silver timbers creates striking visual studies in frontier history.",
  },
];

export default function ExplorePage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Explore Garnet"
        title="See Garnet building by building."
        intro="Garnet is not an exhibit behind glass or a recreated movie set. Walk authentic 1890s dirt lanes, enter preserved wooden structures in arrested decay, and follow the mountain trails that sustained Montana's richest gold rush."
      />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                Authentic Frontier Immersion
              </span>
              <h2 className="display-type mt-2 text-6xl leading-[0.9] tracking-[-0.04em] font-normal md:text-8xl">
                Take Main Street
                <span className="block text-[#3d5a3e]">at walking speed.</span>
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-black/65">
              The worn door thresholds, handwritten shipping tags, original wallpaper, and hand-forged tools
              are easy to overlook when rushed. Plan at least two to four hours to fully experience the townsite
              and surrounding trails.
            </p>
          </Reveal>

          <div className="mt-16 divide-y divide-black/15 border-y border-black/15">
            {experiences.map((item, index) => (
              <Reveal
                key={item.title}
                className="grid gap-4 py-8 md:grid-cols-[.7fr_1.3fr] md:gap-12 md:py-10"
                delay={index * 90}
              >
                <div>
                  <h3 className="display-type text-3xl font-normal text-[#0e1c27] md:text-4xl">{item.title}</h3>
                  <span className="mt-2 inline-block rounded-full bg-[#3d5a3e]/10 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#3d5a3e]">
                    {item.tag}
                  </span>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-black/65">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TownMap />

      <section className="grid bg-[#0d1218] text-[#f8f6f1] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[34rem]">
          <Image
            src="/images/garnet-visitors.png"
            alt="Visitors walking along Garnet's historic timber buildings"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex items-center px-5 py-20 md:px-16 lg:px-20">
          <Reveal>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Authentic Arrested Decay
            </span>
            <h2 className="display-type mt-4 max-w-3xl text-5xl leading-[1.02] font-normal md:text-7xl">
              Look into the rooms, not just the façades.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-white/70">
              Notice the newspaper insulation, hand-planed timbers, rusted wood cookstoves, and original schoolroom desks.
              Because Garnet is preserved in authentic arrested decay rather than reconstructed like a theme park,
              every weathered surface tells the unembellished truth of late-19th-century Montana gold mining life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                More Ways to Explore
              </span>
              <h2 className="display-type mt-2 text-5xl leading-[0.98] font-normal md:text-6xl">
                Beyond the boardwalks.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/65">
                Whether you are visiting with children, hunting for hidden geocaches, or capturing the mountain light,
                Garnet offers immersive activities across the townsite and ridge.
              </p>
            </div>
            <div className="divide-y divide-black/15 border-t border-black/15">
              {activities.map((item, index) => (
                <Reveal key={item.title} className="py-7" delay={index * 60}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="display-type text-2xl font-normal text-[#0e1c27]">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-[#3d5a3e]/10 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#3d5a3e]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-black/65">
                    {item.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 border-t border-black/15 pt-12 text-center">
            <CtaLink href="/visit">Plan your trip &amp; check road report</CtaLink>
            <CtaLink href="/events">View upcoming living history events</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
