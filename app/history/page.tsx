import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "History",
  description: "Follow Garnet from gold discovery and its 1898 boom through decline, abandonment, and preservation.",
};

const timeline = [
  {
    year: "1860s",
    title: "Gold in the gulches",
    copy: "Placer miners work the streams of the Garnet Mountains, washing gravel for free-floating gold.",
  },
  {
    year: "1895",
    title: "A town takes shape",
    copy: "Dr. Armistead Mitchell builds a stamp mill at the head of First Chance Gulch. A settlement grows around it.",
  },
  {
    year: "1898",
    title: "The height of the boom",
    copy: "Nearly 1,000 people live in Garnet, supported by hotels, stores, a school, livery stables, and thirteen saloons.",
  },
  {
    year: "1905",
    title: "Gold becomes harder to reach",
    copy: "Many mines are abandoned and the population falls to roughly 150. A 1912 fire later destroys much of the business district.",
  },
  {
    year: "1940s",
    title: "A ghost town",
    copy: "War work draws residents away again. Cabins, furnishings, and commercial buildings are left behind in the mountains.",
  },
  {
    year: "Today",
    title: "A story kept standing",
    copy: "The Bureau of Land Management and Garnet Preservation Association stabilize buildings and interpret the town for new generations.",
  },
];

export default function HistoryPage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="The story of Garnet"
        title="How a mining town became a ghost town."
        intro="Garnet rose quickly in a remote mountain gulch, lived loudly for a few brief years, and then emptied slowly enough to leave an extraordinary record behind."
      />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <h2 className="display-type text-5xl leading-[1.02]">
              The boom years
            </h2>
            <div>
              <p className="display-type text-4xl leading-[1.12] md:text-6xl">
                Garnet was named for the ruby-colored stone found in the mountains.
                But gold made it a town.
              </p>
              <div className="prose-copy mt-10 max-w-3xl text-base leading-8 text-black/58">
                <p>
                  Miners had worked the surrounding gulches for decades, but the richest
                  period came after new hard-rock claims and better milling brought people
                  back to the range. Buildings rose quickly, often without foundations,
                  because extracting ore mattered more than building for permanence.
                </p>
                <p>
                  At its height, Garnet was a working family town as much as a mining camp:
                  a school, doctor&apos;s office, butcher, hotels, shops, and gathering places
                  served nearly 1,000 residents.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="paper-grain relative min-h-[70svh] overflow-hidden bg-[#0d1218]">
        <Image
          src="/images/garnet-interior.png"
          alt="A quiet preserved saloon interior with a table, chairs, and cast-iron stove"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1218]/10 via-transparent to-[#0d1218]/70" />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[82rem] items-end justify-end px-5 py-14 md:px-10 md:py-20">
          <Reveal className="max-w-md bg-[#f5ead3] p-7 md:p-10">
            <h2 className="display-type text-4xl leading-[1.05]">
              Small rooms tell a practical story.
            </h2>
            <p className="mt-5 text-sm leading-7 text-black/55">
              Beds, stoves, worktables, and thin walls show what a Garnet winter required
              from the people who stayed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <h2 className="display-type max-w-4xl text-6xl leading-[0.92] tracking-[-0.04em] md:text-8xl">
              From first strike
              <span className="block text-[#3d5a3e]">to final departure.</span>
            </h2>
          </Reveal>

          <div className="relative mt-20">
            <div className="absolute top-0 bottom-0 left-[3.5rem] w-px bg-black/15 md:left-[10.5rem]" />
            {timeline.map((item, index) => (
              <Reveal
                key={item.year}
                className="relative grid grid-cols-[7rem_1fr] gap-5 pb-14 md:grid-cols-[21rem_1fr] md:gap-10 md:pb-20"
                delay={index * 60}
              >
                <div className="relative pr-7 text-right md:pr-12">
                  <span className="display-type text-2xl text-[#3d5a3e] md:text-4xl">{item.year}</span>
                  <span className="absolute top-2 -right-1 h-2 w-2 rounded-full bg-[#3d5a3e] ring-8 ring-[#f5ead3]" />
                </div>
                <div className="md:grid md:grid-cols-[.7fr_1.3fr] md:gap-10">
                  <h3 className="display-type text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-black/55 md:mt-1">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 border-t border-black/15 pt-12 text-center">
            <CtaLink href="/preserve">See how Garnet is preserved</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
