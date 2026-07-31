import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { buildings, getBuilding } from "@/lib/buildings";

type BuildingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return buildings.map((building) => ({ slug: building.slug }));
}

export async function generateMetadata({ params }: BuildingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const building = getBuilding(slug);

  if (!building) return {};

  return {
    title: building.name,
    description: building.summary,
  };
}

export default async function BuildingPage({ params }: BuildingPageProps) {
  const { slug } = await params;
  const building = getBuilding(slug);

  if (!building) notFound();

  const index = buildings.findIndex((item) => item.slug === building.slug);
  const nextBuilding = buildings[(index + 1) % buildings.length];

  return (
    <main id="main-content">
      <section className="paper-grain relative flex min-h-[68svh] items-end overflow-hidden bg-[#0d1218] px-5 pb-14 pt-36 text-[#f8f6f1] md:px-10 md:pb-20">
        <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(214,183,116,.28)_1px,transparent_1px),linear-gradient(90deg,rgba(214,183,116,.28)_1px,transparent_1px)] [background-size:42px_42px]" />
        <Reveal className="relative z-10 mx-auto w-full max-w-[82rem]">
          <Link
            href="/explore#town-map"
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#e0c46d]"
          >
            <span aria-hidden="true">←</span>
            Back to the town map
          </Link>
          <p className="mt-14 text-sm text-white/48">
            {building.type}
          </p>
          <h1 className="display-type mt-4 max-w-5xl text-[clamp(4rem,9vw,8.5rem)] leading-[0.86] font-black tracking-[-0.05em]">
            {building.name}
          </h1>
          <p className="mt-7 text-sm font-semibold text-[#e0c46d]">
            {building.era}
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[82rem] gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <Reveal>
            <p className="display-type text-3xl leading-[1.18]">{building.summary}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="prose-copy max-w-3xl text-base leading-8 text-black/60">
              {building.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 border-l-2 border-[#a8333d] bg-[#f2eee4] p-6 md:p-8">
              <p className="text-[0.64rem] font-bold tracking-[0.15em] text-[#a8333d] uppercase">
                When you are there
              </p>
              <p className="mt-3 max-w-2xl leading-7 text-black/60">{building.lookFor}</p>
            </div>
            <a
              href={building.source}
              target="_blank"
              rel="noreferrer"
              className="group mt-9 inline-flex items-center gap-4 border-b border-[#a8333d] pb-2 text-[0.65rem] font-bold tracking-[0.14em] uppercase"
            >
              {building.sourceLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-black/15 bg-[#e8e2d7] px-5 py-14 md:px-10">
        <div className="mx-auto flex max-w-[82rem] flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-black/45">
              Continue to another building
            </p>
            <p className="display-type mt-2 text-3xl md:text-4xl">{nextBuilding.name}</p>
          </div>
          <Link
            href={`/explore/${nextBuilding.slug}`}
            className="group inline-flex items-center gap-4 text-sm font-semibold"
          >
            Continue through town
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
