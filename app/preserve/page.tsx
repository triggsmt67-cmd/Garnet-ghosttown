import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
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
        title="Old wood needs patient hands."
        intro="Snow loads roofs. Spring water shifts foundations. Summer visitors wear paths through fragile rooms. Preservation crews address that damage without rebuilding Garnet into something new."
        image="/images/preserve/garnet-preservation-team.jpg"
        imageAlt="Four members of the Garnet preservation community gathered behind a historic wooden bar"
        imagePosition="object-[60%_42%] sm:object-[center_42%] lg:origin-left lg:scale-[1.12]"
        contentClassName="mt-40 sm:mt-24 md:mt-0"
      />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid min-w-0 gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
            <div className="min-w-0">
              <h2 className="display-type text-[clamp(2.75rem,15vw,3.75rem)] leading-[0.9] tracking-[-0.04em] md:text-8xl">
                Preservation begins
                <span className="block text-[#3d5a3e]">with what is original.</span>
              </h2>
            </div>
            <div className="prose-copy min-w-0 self-end text-base leading-8 text-black/72">
              <p>
                Garnet&apos;s buildings went up quickly, many with little or no foundation.
                Stabilizing them is careful, continuing work—protecting original materials
                and character without turning the town into something it never was.
              </p>
              <p>
                Much of the strongest work is meant to disappear: a footing hidden below the
                dirt, bracing tucked behind old boards, or a failing roof beam strengthened
                without replacing the weathered surface a visitor sees.
              </p>
              <p>
                The Bureau of Land Management manages the historic site. The nonprofit
                Garnet Preservation Association supports interpretation, education,
                stabilization projects, oral-history work, and visitor-center programs.
              </p>
            </div>
          </Reveal>

          <Reveal className="image-reveal relative mt-16 aspect-[4/5] overflow-hidden sm:aspect-[16/9] md:min-h-[24rem]">
            <Image
              src="/images/garnet-interior.png"
              alt="Sunlight crossing original timber walls inside a preserved Garnet building"
              fill
              sizes="100vw"
              className="object-cover object-center sepia-[.18] saturate-[.78] contrast-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <p className="display-type absolute bottom-7 left-7 z-10 max-w-xl text-3xl leading-tight text-white md:bottom-10 md:left-10 md:text-5xl">
              Original buildings still line the gulch.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="paper-grain bg-[#0e1c27] px-5 py-20 text-[#f8f6f1] md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="max-w-5xl">
            <h2 className="display-type text-5xl leading-[0.95] md:text-7xl">
              Keep the buildings stable.
              <br />
              Keep the stories visible.
            </h2>
          </Reveal>

          <div className="mt-16 divide-y divide-white/15 border-y border-white/15">
            {[
              ["Stabilization", "Snow, water, settling earth, and gravity never stop working. Crews reinforce roofs, straighten vulnerable walls, improve hidden footings, and preserve as much historic material as possible without making the building look newly rebuilt."],
              ["Interpretation", "A room becomes more meaningful when visitors know who slept there, what work happened there, and why a newspaper page ended up inside the wall. Signs, exhibits, oral histories, and staff connect the surviving structures to individual lives."],
              ["Education", "The schoolhouse, mine trail, household objects, and commercial buildings let students work from physical evidence. Field trips and classroom resources turn Garnet into a place for asking how geography, labor, family life, and national events shaped one community."],
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

      <section className="px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mx-auto grid max-w-[82rem] gap-10 border border-black/15 p-7 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="display-type text-5xl leading-[0.96] md:text-7xl">
              Help keep the next roof standing.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-black/72">
              Memberships and contributions help the Garnet Preservation Association support
              stabilization, interpretation, education, and the volunteer effort behind the
              visitor experience. Visit the association&apos;s official site for current projects
              and ways to participate.
            </p>
          </div>
          <a
            href="https://garnetghosttown.org/membership.php"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-4 bg-[#3d5a3e] px-7 py-4 text-sm font-semibold text-white transition-transform duration-500 hover:-translate-y-1"
          >
            Support Garnet
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
      </section>
    </main>
  );
}
