import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { TownMap } from "@/components/town-map";

export const metadata: Metadata = {
  title: "Explore Garnet",
  description:
    "Discover preserved buildings, self-guided mining trails, scavenger hunts, geocaching, and mountain activities at Garnet Ghost Town.",
};

const experiences = [
  {
    title: "Walk the Historic Street",
    tag: "The Historic Street",
    copy: "Step inside the Wells Hotel, Kelly’s Saloon, family cabins, the general store, and the schoolhouse. Look for newspaper insulation, worn thresholds, and practical details that show how families built a community at 6,000 feet. Interpretive guides staff key buildings in season.",
  },
  {
    title: "Trace the Sierra Mine Loop",
    tag: "Self-Guided Trail · 0.5 Mi",
    copy: "Pick up the illustrated trail brochure at the Visitor Center. Numbered stops lead past mine openings, waste-rock piles, and machinery from the gold workings above town.",
  },
  {
    title: "Climb to Frank Warren’s Park",
    tag: "Mountain Hike · 1.5 Mi RT",
    copy: "Climb 400 vertical feet through the forest to Frank Warren’s cabin and the meadow where mining families once gathered for baseball games, dances, and picnics. The trail also opens to broad views across the Garnet Range.",
  },
];

const activities = [
  {
    title: "Townsite Scavenger Hunt",
    tag: "All Ages · Free at Visitor Center",
    copy: "Pick up a free card at the Visitor Center and search for architectural details, square nails, stove lids, and cellar doors. It is an easy way for families to slow down, look closely, and learn why artifacts should stay where they are.",
  },
  {
    title: "High-Country Geocaching",
    tag: "Backcountry GPS · Public Lands",
    copy: "Several geocaches are hidden on surrounding BLM public lands. Download coordinates before leaving cell service, then follow them through the forest around First Chance Gulch.",
  },
  {
    title: "Garnet Back Country Byway",
    tag: "Scenic 12-Mile Mountain Drive",
    copy: "Garnet Range Road is an official BLM Back Country Byway, with views toward the Blackfoot River Valley and Bob Marshall Wilderness. Watch for elk, mule deer, hawks, and seasonal wildflowers.",
  },
  {
    title: "Heritage Photography",
    tag: "Golden Hour · Historic Textures",
    copy: "Morning and late-afternoon light brings out the texture of weathered timber, old glass, and mountain streets. Bring a wider lens for building interiors and a longer lens for details you should not touch.",
  },
];

export default function ExplorePage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Explore Garnet"
        title="See Garnet building by building."
        intro="Walk Garnet's dirt lanes, enter preserved buildings, and follow mountain trails through the landscape that shaped this remote mining town."
        image="/images/garnet-hero.png"
        imageAlt="Historic buildings lining the main street at Garnet Ghost Town"
        imagePosition="object-[center_45%]"
      />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                Take Your Time
              </span>
              <h2 className="display-type mt-2 text-5xl leading-[0.9] tracking-[-0.04em] font-normal md:text-8xl">
                Take Main Street
                <span className="block text-[#3d5a3e]">at walking speed.</span>
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-black/65">
              Worn thresholds, handwritten shipping tags, original wallpaper, and hand-forged tools
              are easy to miss when you rush. Give yourself two or three hours for the townsite,
              with more time if you plan to hike.
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
            src="/images/garnet-fog.webp"
            alt="Historic timber buildings of Garnet framed by mountain fog"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex items-center px-5 py-20 md:px-16 lg:px-20">
          <Reveal>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Look Closely
            </span>
            <h2 className="display-type mt-4 max-w-3xl text-5xl leading-[1.02] font-normal md:text-7xl">
              Look into the rooms, not just the façades.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-white/70">
              Notice newspaper insulation, hand-planed timbers, wood cookstoves, and original
              schoolroom desks. These details make daily life in a late-19th-century Montana
              mining town easier to picture.
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
                Visiting with children, looking for geocaches, or bringing a camera? There is
                more to explore beyond the main street.
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
            <CtaLink href="/visit">Plan your visit</CtaLink>
            <CtaLink href="/events">See upcoming events</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
