import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import towns from "./towns.json";

export const metadata: Metadata = {
  title: "Montana Ghost Towns",
  description: "Explore 20 Montana ghost towns and historic communities, with short descriptions and links to visitor websites and town histories.",
  alternates: { canonical: "/montana-ghost-towns" },
  openGraph: {
    title: "Montana Ghost Towns | Garnet Ghost Town",
    description: "Follow Montana’s mining history beyond Garnet. Discover 20 ghost towns and historic communities.",
    images: [{ url: "/images/montana-ghost-towns-map.webp", width: 2048, height: 1143, alt: "Vintage-style illustration of Montana ghost towns" }],
  },
};

export default function MontanaGhostTownsPage() {
  return (
    <main id="main-content" className="bg-[#f4f0e7] text-[#24352b]">
      <section className="bg-[#1e2f1f] px-5 pt-44 pb-10 text-[#f8f6f1] md:px-10 md:pt-48 md:pb-14">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid items-end gap-7 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-[#e0c46d] uppercase">Beyond Garnet · A Montana field guide</p>
              <h1 className="display-type mt-5 text-5xl leading-[.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">Montana’s <br />ghost towns.</h1>
            </div>
            <div className="max-w-xl">
              <p className="text-lg leading-8 text-white/80">Gold camps, silver towns, quiet main streets. Follow Montana’s mining past from preserved storefronts to the remnants of towns tucked into the mountains.</p>
              <a href="#towns" className="mt-6 inline-flex min-h-11 items-center gap-4 border-b border-[#e0c46d]/70 py-2 text-sm font-semibold text-[#e0c46d]">Explore the 20 towns <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="mt-10 md:mt-14">
            <Image src="/images/montana-ghost-towns-map.webp" alt="" width={2048} height={1143} priority sizes="(min-width: 1392px) 1312px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" />
            <figcaption className="mt-4 text-xs leading-6 text-white/65">An illustrated view of Montana’s ghost towns. Decorative artwork, not a navigation map. Use the individual town links for visitor information.</figcaption>
          </figure>
        </div>
      </section>

      <section id="towns" aria-labelledby="towns-heading" className="scroll-mt-36 px-5 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid gap-5 border-b border-[#24352b]/25 pb-8 md:grid-cols-2 md:gap-16">
            <div><p className="text-xs font-semibold tracking-[.14em] text-[#98613d] uppercase">The town directory</p><h2 id="towns-heading" className="display-type mt-3 text-4xl leading-tight md:text-5xl">Find your next stop.</h2></div>
            <p className="max-w-xl self-end text-base leading-7 text-[#625b50]">Some are state parks or museums; others are living communities or remote ruins. Check seasonal access and permissions before visiting, respect private property, stay out of unstable buildings and mine openings, and leave artifacts undisturbed.</p>
          </div>
          <div className="grid gap-x-16 lg:grid-cols-2">
            {towns.map((town, index) => (
              <article key={town.name} className="flex flex-col border-b border-[#24352b]/20 py-8 md:py-10">
                <div className="flex items-baseline gap-4"><span className="text-xs font-semibold tabular-nums tracking-[.12em] text-[#98613d]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="display-type text-3xl leading-tight md:text-4xl">{town.name}</h3></div>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#625b50]">{town.summary}</p>
                <div className="mt-auto pt-5">
                  {town.url.startsWith("/") ? <Link href={town.url} className="inline-flex min-h-11 items-center gap-3 border-b border-[#3d5a3e]/45 py-2 text-sm font-semibold text-[#24352b] hover:border-[#98613d] hover:text-[#98613d]" aria-label={`${town.linkLabel}: ${town.name}`}>{town.linkLabel}<span aria-hidden="true">→</span></Link> : <a href={town.url} target="_blank" rel="noreferrer" aria-label={`${town.linkLabel}: ${town.name} (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-3 border-b border-[#3d5a3e]/45 py-2 text-sm font-semibold text-[#24352b] hover:border-[#98613d] hover:text-[#98613d]">{town.linkLabel}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>}
                  <p className="mt-2 text-xs leading-5 text-[#625b50]">{town.source}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
