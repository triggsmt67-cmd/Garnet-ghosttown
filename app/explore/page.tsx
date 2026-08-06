import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { TownMap } from "@/components/town-map";

export const metadata: Metadata = {
  title: "Explore Garnet",
  description: "Discover preserved buildings, self-guided trails, mining history, and mountain experiences at Garnet Ghost Town.",
};

const experiences = [
  {
    title: "Walk the town",
    copy: "Move at your own pace among preserved cabins, hotels, saloons, and the old commercial buildings that once served nearly 1,000 residents.",
  },
  {
    title: "Follow the mines",
    copy: "Pick up the self-guided interpretive brochure and trace early mining claims on the Sierra Mine Loop and connecting Placer Trail.",
  },
  {
    title: "Take the long trail",
    copy: "The Warren Park Trail leads through forest and open mountain terrain to the remains of a miner's cabin and old community picnic grounds.",
  },
];

export default function ExplorePage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Explore Garnet"
        title="See Garnet building by building."
        intro="Garnet is not an exhibit behind glass. Walk its streets, enter preserved buildings, and follow the trails that once connected work, home, and mountain life."
      />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h2 className="display-type text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl">
              Take Main Street
              <span className="block text-[#3d5a3e]">at walking speed.</span>
            </h2>
            <p className="max-w-lg leading-8 text-black/58">
              The thresholds, handwritten labels, room sizes, and worn tools are easy to
              miss on a rushed visit. Give the town at least a couple of hours before
              choosing a trail.
            </p>
          </Reveal>

          <div className="mt-16 divide-y divide-black/15 border-y border-black/15">
            {experiences.map((item, index) => (
              <Reveal
                key={item.title}
                className="grid gap-5 py-9 md:grid-cols-[.7fr_1.3fr] md:gap-12 md:py-12"
                delay={index * 90}
              >
                <h3 className="display-type text-4xl">{item.title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-black/55">{item.copy}</p>
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
            alt="A family walking between Garnet's historic wooden buildings"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex items-center px-5 py-20 md:px-16 lg:px-20">
          <Reveal>
            <p className="text-sm font-semibold text-[#e0c46d]">Inside the buildings</p>
            <h2 className="display-type mt-6 max-w-3xl text-5xl leading-[1.02] md:text-7xl">
              Look at the rooms, not only the façades.
            </h2>
            <p className="mt-8 max-w-lg leading-8 text-white/55">
              Notice the low ceilings, hand-worked timber, cast-iron stoves, and the short
              distance between home, store, saloon, and mine. Those proportions explain
              the town better than any ghost story.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="display-type text-5xl leading-none">Choose your distance.</h2>
              <p className="mt-5 max-w-xs text-sm leading-7 text-black/52">
                Pick a short interpretive loop or continue into the surrounding mountain.
              </p>
            </div>
            <div className="divide-y divide-black/15 border-t border-black/15">
              {[
                ["Sierra Mine Loop", "Self-guided", "Interpretive route past historic mining claims; brochure available at the visitor center."],
                ["Placer Trail", "About 1 hour", "A connecting trail through forest, bridges, old cabins, and back toward the visitor center."],
                ["Warren Park Trail", "2–3 hours round trip", "A longer mountain hike to the remains of Edward Brook Warren's cabin and park."],
              ].map(([name, time, copy], index) => (
                <Reveal key={name} className="grid gap-3 py-7 md:grid-cols-[1fr_.65fr_1.35fr]" delay={index * 70}>
                  <h3 className="display-type text-2xl">{name}</h3>
                  <p className="text-xs font-bold tracking-[0.12em] text-[#3d5a3e] uppercase">{time}</p>
                  <p className="text-sm leading-6 text-black/55">{copy}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <div className="mt-14 text-center">
            <CtaLink href="/visit">Prepare for your visit</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
