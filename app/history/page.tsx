import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { getStories, type StoryType } from "@/lib/content";
import { buildTimeline } from "@/lib/content/timeline";

const storyTypeLabel: Record<StoryType, string> = {
  place: "Place",
  family: "Family",
  person: "Person",
  community: "Community",
  organization: "Preservation",
};

export const revalidate = 300;

export const metadata: Metadata = {
  title: "History",
  description: "Follow Garnet from gold discovery and its 1898 boom through decline, abandonment, and preservation.",
};

export default async function HistoryPage() {
  const { data: stories } = await getStories();
  const chapters = buildTimeline(stories);

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

          {chapters.length > 1 && (
            <nav aria-label="Chapters of Garnet's history" className="mt-14 border-y border-black/15">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 py-5">
                {chapters.map(({ era }) => (
                  <li key={era.slug}>
                    <a
                      href={`#${era.slug}`}
                      className="group inline-flex items-baseline gap-2 text-sm font-semibold text-[#18202a]"
                    >
                      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#3d5a3e]">
                        {era.name}
                      </span>
                      <span className="text-xs font-normal text-black/40">{era.years}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {chapters.map(({ era, stories: chapterStories }) => (
            <div key={era.slug} id={era.slug} className="scroll-mt-32 pt-16 md:pt-24">
              <Reveal className="grid gap-3 border-b border-black/15 pb-8 md:grid-cols-[21rem_1fr] md:gap-10">
                <p className="text-sm font-semibold text-[#3d5a3e] md:pr-12 md:text-right">{era.years}</p>
                <div>
                  <h3 className="display-type text-4xl leading-none tracking-[-0.03em] md:text-5xl">
                    {era.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-black/55">{era.blurb}</p>
                </div>
              </Reveal>

              <div className="relative pt-12">
                <div className="absolute top-0 bottom-0 left-[3.5rem] w-px bg-black/15 md:left-[10.5rem]" />
                {chapterStories.map((story, index) => (
                    <Reveal
                      key={story.id}
                      className="relative grid grid-cols-[7rem_1fr] gap-5 pb-12 md:grid-cols-[21rem_1fr] md:gap-10 md:pb-16"
                      delay={index * 50}
                    >
                      <div className="relative pr-7 text-right md:pr-12">
                        <span className="display-type text-2xl text-[#3d5a3e] md:text-4xl">
                          {story.startYear}
                        </span>
                        <span className="absolute top-1.5 -right-[7px] h-3.5 w-3.5 rotate-45 border-2 border-[#d3b350] bg-[#f2eee4] ring-8 ring-[#f5ead3]" />
                      </div>
                      <Link
                        href={`/stories/${story.slug}`}
                        className="group block border border-[#0e1c27]/12 bg-[#f8f6f1] transition-colors hover:border-[#3d5a3e]/40 md:grid md:grid-cols-[1fr_12rem]"
                      >
                        <div className="p-6 md:p-8">
                          <p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#3d5a3e] uppercase">
                            Story · {storyTypeLabel[story.storyType]} · {story.timeFrame}
                          </p>
                          <h4 className="display-type mt-3 text-3xl leading-[1.05] md:text-[2.1rem]">
                            {story.title}
                          </h4>
                          <p className="mt-3 max-w-xl text-sm leading-7 text-black/58">{story.leadIn}</p>
                          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#18202a]">
                            Read the story
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                        {story.mainPhoto && (
                          <div className="relative hidden min-h-full overflow-hidden bg-[#0e1c27] md:block">
                            <Image
                              src={story.mainPhoto.url}
                              alt={story.mainPhoto.alt}
                              fill
                              sizes="12rem"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                      </Link>
                    </Reveal>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 border-t border-black/15 pt-12 text-center">
            <CtaLink href="/preserve">See how Garnet is preserved</CtaLink>
          </div>
        </div>
      </section>
      {stories.length > 0 && (
        <section id="stories" className="scroll-mt-28 bg-[#f2eee4] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[82rem]">
            <Reveal className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-24">
              <h2 className="display-type text-5xl leading-[0.95] tracking-[-0.035em] md:text-7xl">
                Stories of Garnet
              </h2>
              <p className="max-w-xl text-lg leading-8 text-black/58 lg:pb-2">
                The people, families, and places behind the buildings, told through records
                and the memories of those who lived here. Every story, A to Z.
              </p>
            </Reveal>

            <ul className="mt-14 grid border-t border-[#0e1c27]/15 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10">
              {[...stories]
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((story) => (
                  <li key={story.id} className="border-b border-[#0e1c27]/15">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-5"
                    >
                      <span>
                        <span className="display-type block text-2xl leading-tight transition-colors group-hover:text-[#3d5a3e]">
                          {story.title}
                        </span>
                        <span className="mt-1 block text-xs text-black/45">
                          {storyTypeLabel[story.storyType]} · {story.timeFrame}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-black/35 transition-transform group-hover:translate-x-1 group-hover:text-[#3d5a3e]" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
