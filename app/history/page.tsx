import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { getStories, getTimeline } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "History",
  description: "Follow Garnet from gold discovery and its 1898 boom through decline, abandonment, and preservation.",
};

export default async function HistoryPage() {
  const [{ data: timeline }, { data: stories }] = await Promise.all([getTimeline(), getStories()]);

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
                key={item.id}
                className="relative grid grid-cols-[7rem_1fr] gap-5 pb-14 md:grid-cols-[21rem_1fr] md:gap-10 md:pb-20"
                delay={index * 60}
              >
                <div className="relative pr-7 text-right md:pr-12">
                  <span className="display-type text-2xl text-[#3d5a3e] md:text-4xl">{item.yearLabel}</span>
                  <span className="absolute top-2 -right-1 h-2 w-2 rounded-full bg-[#3d5a3e] ring-8 ring-[#f5ead3]" />
                </div>
                <div className="md:grid md:grid-cols-[.7fr_1.3fr] md:gap-10">
                  <h3 className="display-type text-3xl">{item.title}</h3>
                  <div>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-black/55 md:mt-1">{item.summary}</p>
                    {item.relatedStory && (
                      <Link
                        href={`/stories/${item.relatedStory.slug}`}
                        className="group mt-4 inline-flex items-center gap-2 border-b border-[#3d5a3e]/50 pb-1 text-sm font-semibold text-[#18202a] transition-colors hover:border-[#3d5a3e]"
                      >
                        Read the story
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    {item.mainPhoto && (
                      <figure className="mt-6 max-w-lg">
                        <div className="relative aspect-[3/2] overflow-hidden bg-[#0e1c27]">
                          <Image
                            src={item.mainPhoto.url}
                            alt={item.mainPhoto.alt}
                            fill
                            sizes="(min-width: 768px) 32rem, 90vw"
                            className="object-cover"
                          />
                        </div>
                        {item.mainPhoto.credit && (
                          <figcaption className="mt-2 text-xs text-black/42">
                            {item.mainPhoto.credit}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 border-t border-black/15 pt-12 text-center">
            <CtaLink href="/preserve">See how Garnet is preserved</CtaLink>
          </div>
        </div>
      </section>
      {stories.length > 0 && (
        <section id="stories" className="scroll-mt-28 bg-[#f2eee4] px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto max-w-[82rem]">
            <Reveal className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-24">
              <h2 className="display-type text-5xl leading-[0.95] tracking-[-0.035em] md:text-7xl">
                Stories of Garnet
              </h2>
              <p className="max-w-xl text-lg leading-8 text-black/58 lg:pb-2">
                The families, homes, and businesses behind the buildings, told through
                records and the memories of people who lived here.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden border border-[#0e1c27]/15 bg-[#0e1c27]/15 md:grid-cols-2">
              {stories.map((story, i) => (
                <Reveal key={story.id} delay={i * 70} className="bg-[#f8f6f1]">
                  <Link
                    href={`/stories/${story.slug}`}
                    className="group flex h-full flex-col"
                  >
                    {story.mainPhoto && (
                      <div className="relative aspect-[3/2] overflow-hidden bg-[#0e1c27]">
                        <Image
                          src={story.mainPhoto.url}
                          alt={story.mainPhoto.alt}
                          fill
                          sizes="(min-width: 768px) 41rem, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7 md:p-10">
                      <p className="text-sm font-semibold text-[#3d5a3e]">{story.timeFrame}</p>
                      <h3 className="display-type mt-3 text-3xl leading-[1.02] tracking-[-0.02em] md:text-4xl">
                        {story.title}
                      </h3>
                      <p className="mt-4 max-w-lg leading-7 text-black/58">{story.leadIn}</p>
                      <span className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold">
                        Read the story
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
