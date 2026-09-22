import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { VoiceQuote } from "@/components/voice-quote";
import { getBuilding } from "@/lib/buildings";
import { getStories, getStory } from "@/lib/content";

export const revalidate = 300;

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await getStories();
  return data.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.leadIn,
    openGraph: story.mainPhoto ? { images: [story.mainPhoto.url] } : undefined,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const [{ data: stories }, story] = await Promise.all([getStories(), getStory(slug)]);
  if (!story) notFound();

  const index = stories.findIndex((item) => item.slug === story.slug);
  const nextStory = stories.length > 1 ? stories[(index + 1) % stories.length] : null;
  const building = story.mapBuilding ? getBuilding(story.mapBuilding) : undefined;

  return (
    <main id="main-content">
      <section className="paper-grain relative flex min-h-[62svh] items-end overflow-hidden bg-[#0d1218] px-5 pb-14 pt-36 text-[#f8f6f1] md:px-10 md:pb-20">
        <Reveal className="relative z-10 mx-auto w-full max-w-[82rem]">
          <Link
            href="/history#stories"
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#e0c46d]"
          >
            <span aria-hidden="true">←</span>
            Stories of Garnet
          </Link>
          <p className="mt-14 text-sm font-semibold text-[#e0c46d]">{story.timeFrame}</p>
          <h1 className="display-type mt-4 max-w-5xl text-[clamp(3rem,7.5vw,7rem)] leading-[0.9] tracking-[-0.045em]">
            {story.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
            {story.leadIn}
          </p>
        </Reveal>
      </section>

      {story.mainPhoto && (
        <section className="bg-[#0d1218] px-5 md:px-10">
          <figure className="mx-auto max-w-[82rem] pb-12">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0e1c27]">
              <Image
                src={story.mainPhoto.url}
                alt={story.mainPhoto.alt}
                fill
                priority
                sizes="(min-width: 1312px) 82rem, 100vw"
                className="object-cover"
              />
            </div>
            {story.mainPhoto.credit && (
              <figcaption className="mt-3 text-xs text-white/45">{story.mainPhoto.credit}</figcaption>
            )}
          </figure>
        </section>
      )}

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div
              className="story-body text-[1.0625rem] leading-8 text-black/65"
              dangerouslySetInnerHTML={{ __html: story.bodyHtml }}
            />
          </Reveal>

          {story.voice && (
            <Reveal className="mt-16">
              <VoiceQuote voice={story.voice} />
            </Reveal>
          )}

          {(story.source || building) && (
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-5">
              {building && (
                <Link
                  href={`/explore/${building.slug}`}
                  className="group inline-flex items-center gap-3 border-b border-[#3d5a3e] pb-2 text-sm font-semibold"
                >
                  Find {building.name} on the town map
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {story.source?.url ? (
                <a
                  href={story.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-black/20 pb-2 text-sm font-semibold text-black/60"
                >
                  Source: {story.source.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : story.source ? (
                <p className="text-sm text-black/50">Source: {story.source.label}</p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {nextStory && (
        <section className="border-t border-black/15 bg-[#e8e2d7] px-5 py-14 md:px-10">
          <div className="mx-auto flex max-w-[82rem] flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-black/45">Another story from Garnet</p>
              <p className="display-type mt-2 text-3xl md:text-4xl">{nextStory.title}</p>
            </div>
            <Link
              href={`/stories/${nextStory.slug}`}
              className="group inline-flex items-center gap-4 text-sm font-semibold"
            >
              Read the next story
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
