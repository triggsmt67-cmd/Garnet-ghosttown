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
      />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
            <div>
              <h2 className="display-type text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl">
                Preservation begins
                <span className="block text-[#3d5a3e]">with what is original.</span>
              </h2>
            </div>
            <div className="prose-copy self-end text-base leading-8 text-black/58">
              <p>
                Garnet&apos;s buildings went up quickly, many with little or no foundation.
                Stabilizing them is careful, continuing work—protecting original materials
                and character without turning the town into something it never was.
              </p>
              <p>
                The Bureau of Land Management manages the historic site. The nonprofit
                Garnet Preservation Association supports interpretation, education,
                stabilization projects, oral-history work, and visitor-center programs.
              </p>
            </div>
          </Reveal>

          <Reveal className="image-reveal relative mt-16 aspect-[16/8] min-h-[24rem] overflow-hidden">
            <Image
              src="/images/garnet-hero.png"
              alt="Historic timber buildings set against Montana mountain ridges"
              fill
              sizes="100vw"
              className="object-cover object-[center_64%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <p className="display-type absolute bottom-7 left-7 z-10 max-w-xl text-3xl leading-tight text-white md:bottom-10 md:left-10 md:text-5xl">
              More than 30 historic buildings remain.
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
              ["Stabilization", "Careful work helps roofs, walls, foundations, and original materials withstand mountain weather."],
              ["Interpretation", "Signs, exhibits, programs, and visitor-center resources connect buildings to the people who lived in them."],
              ["Education", "School resources and public programs help Montana history travel beyond the town itself."],
            ].map(([title, copy], index) => (
              <Reveal
                key={title}
                className="grid gap-5 py-8 md:grid-cols-[.65fr_1.35fr] md:gap-12 md:py-10"
                delay={index * 90}
              >
                <h3 className="display-type text-3xl text-[#e0c46d]">{title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/55">{copy}</p>
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
            <p className="mt-6 max-w-2xl text-sm leading-7 text-black/55">
              Memberships and contributions support the Garnet Preservation Association&apos;s
              work. Visit the association&apos;s official site for current ways to participate.
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
