import type { CSSProperties } from "react";
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

const eraColors: Record<string, string> = {
  "early-claims": "#3d5a3e",
  "the-boom": "#96503a",
  "lean-years": "#80601e",
  "last-residents": "#456277",
  preservation: "#52604a",
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
        intro="Garnet grew quickly when miners came looking for gold. Visit the buildings that remain and learn about the families who made their homes here."
        image="/images/historic/university-archive/garnet-ghost-town-mining-camp-and-mill-77-0022.webp"
        imageAlt="Archival view of Garnet's mining camp and mill"
        imagePosition="object-[center_42%]"
      />

      <section className="bg-[#e9e1d2] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:gap-20 xl:gap-24">
            <div className="lg:sticky lg:top-32">
              <h2 className="display-type leading-[1.02] section-heading">
                The boom years
              </h2>
              <figure className="mt-8">
                <div className="image-reveal relative aspect-[4/3] overflow-hidden bg-[#0d1218]">
                  <Image
                    src="/images/historic/university-archive/garnet-ghost-town-family-in-cabin-doorway-77-0003.webp"
                    alt="A Garnet family standing in the doorway of their wooden cabin"
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 border-l border-[#3d5a3e]/40 pl-4 text-sm leading-6 text-black/68">
                  A family at the threshold of a Garnet cabin. Households and children were part
                  of the town’s story alongside mines and mills. Courtesy of University of Montana.
                </figcaption>
              </figure>
            </div>
            <div className="lg:pt-2">
              <p className="display-type text-4xl leading-[1.12] md:text-6xl">
                Garnet took its name from the red stone found nearby.
                Gold mining brought people to the town.
              </p>
              <div className="prose-copy mt-10 max-w-3xl text-base leading-8 text-black/72">
                <p>
                  Miners had worked the nearby gulches for decades. New mining claims
                  and better ways to process ore brought more people to the mountains.
                  Buildings went up quickly, often without foundations. Getting gold out
                  of the ground mattered more than building a town that would last.
                </p>
                <p>
                  When Montana’s silver industry collapsed in 1893, experienced miners
                  began looking for gold work. A new wagon road and a mill that crushed
                  rock made it easier to mine Garnet’s gold-bearing quartz. Within a few
                  years, the seasonal camp had grown into a busy town.
                </p>
                <p>
                  At its height, Garnet was home to nearly 1,000 people. Families had a
                  school, a doctor, a butcher, hotels, and shops. Residents gathered for
                  union meetings, dances, and picnics. The rooms you can enter today
                  offer a glimpse of that everyday life.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="paper-grain bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
            <h2 className="display-type max-w-4xl leading-[0.92] tracking-[-0.04em] section-heading">
              From the first mines
              <span className="block text-[#e0c46d]">to the last residents.</span>
            </h2>
            <p className="max-w-lg text-base leading-8 text-white/76 lg:pb-2">
              Follow the town from early claims through boom years, decline, and the
              lives of its last residents. Choose a chapter or explore the stories
              in chronological order.
            </p>
          </Reveal>

          {chapters.length > 1 && (
            <nav aria-label="Chapters of Garnet's history" className="mt-14 border-y border-white/20">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 py-5">
                {chapters.map(({ era }) => (
                  <li key={era.slug}>
                    <a
                      href={`#${era.slug}`}
                      className="group inline-flex items-baseline gap-2 text-sm font-semibold text-white"
                    >
                      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#e0c46d] group-hover:text-[#e0c46d]">
                        {era.name}
                      </span>
                      <span className="text-xs font-normal text-white/65">{era.years}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <section className="bg-[#f5ead3] px-5 pb-20 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[82rem]">
          {chapters.map(({ era, stories: chapterStories }) => (
            <div key={era.slug} id={era.slug} style={{ "--era-color": eraColors[era.slug] } as CSSProperties} className="scroll-mt-32 pt-10 md:pt-12">
              <Reveal className="grid gap-2 border-b border-black/15 pb-5 md:grid-cols-[7rem_1fr] md:gap-6">
                <p className="text-sm font-semibold text-[var(--era-color)] md:text-right">{era.years}</p>
                <div className="border-l-[3px] border-[var(--era-color)] pl-4">
                  <h3 className="display-type text-3xl leading-none tracking-[-0.03em] md:text-4xl">
                    {era.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-black/70">{era.blurb}</p>
                </div>
              </Reveal>

              <div className="relative mt-2">
                <div aria-hidden="true" className="absolute top-0 bottom-0 left-[7.75rem] hidden w-px bg-[var(--era-color)]/30 md:block" />
                {chapterStories.map((story) => (
                  <Reveal
                    key={story.id}
                    className="relative min-w-0 md:grid md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6"
                  >
                    <div className="relative hidden pt-6 text-right md:block">
                      <span className="display-type text-2xl text-[var(--era-color)]">
                        {story.startYear}
                      </span>
                      <span aria-hidden="true" className="absolute top-8 -right-[18px] h-2.5 w-2.5 rotate-45 border border-[var(--era-color)] bg-[var(--era-color)] ring-4 ring-[#f5ead3]" />
                    </div>
                    <Link
                      href={`/stories/${story.slug}`}
                      className="group flex min-w-0 items-start gap-4 border-b border-black/15 py-5 transition-colors hover:border-[var(--era-color)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--era-color)] md:gap-5 md:py-6"
                    >
                      {story.mainPhoto && (
                        <div className="relative mt-1 h-16 w-16 shrink-0 overflow-hidden bg-[#0e1c27] sm:h-20 sm:w-20 md:h-24 md:w-24">
                          <Image
                            src={story.mainPhoto.url}
                            alt={story.mainPhoto.alt}
                            fill
                            sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 64px"
                            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-[var(--era-color)] uppercase">
                          <span className="md:hidden">{story.startYear} · </span>
                          {storyTypeLabel[story.storyType]}
                        </p>
                        <h4 className="display-type mt-1 text-2xl leading-[1.12] transition-colors group-hover:text-[var(--era-color)] md:text-[1.7rem]">
                          {story.title}
                        </h4>
                        <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-black/72">{story.leadIn}</p>
                        <span className="sr-only">Read the story</span>
                      </div>
                      <ArrowRight aria-hidden="true" className="mt-2 hidden h-4 w-4 shrink-0 text-[var(--era-color)] transition-transform motion-safe:group-hover:translate-x-1 sm:block" />
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
        <section id="stories" className="scroll-mt-28 bg-[#f2eee4] px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[82rem]">
            <Reveal className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-16">
              <h2 className="display-type leading-[0.95] tracking-[-0.035em] section-heading">
                Stories of Garnet
              </h2>
              <p className="max-w-xl text-lg leading-8 text-black/72 lg:pb-2">
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
                        <span className="mt-1 block text-xs text-black/65">
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
