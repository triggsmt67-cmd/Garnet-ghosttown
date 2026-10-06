import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";
import { HeroConditions, type HeroRoadReport } from "./hero-conditions";

export function HomeHero({ roadReport }: { roadReport?: HeroRoadReport }) {
  return (
    <section className="home-hero relative overflow-hidden bg-[#0d1218] text-[#f8f6f1]">
      <Image
        src="/images/garnet-town.JPG"
        alt="Weathered timber buildings of Garnet along a mountain dirt lane"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] lg:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,18,24,.9)_0%,rgba(13,18,24,.72)_48%,rgba(13,18,24,.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1218]/70 via-transparent to-[#0d1218]/30" />
        <div className="relative z-10 mx-auto grid w-full max-w-[90rem] items-center gap-8 px-5 pt-40 pb-10 md:gap-10 md:px-10 md:pt-44 md:pb-14 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold text-[#e0c46d] md:mb-7 md:text-sm">
              About one hour east of Missoula · Garnet, Montana
            </p>
            <h1 className="display-type max-w-4xl text-[clamp(2.5rem,11vw,5.8rem)] leading-[0.94] tracking-[-0.035em] md:text-[clamp(3.35rem,6vw,5.8rem)] md:leading-[0.9]">
              Garnet, a glimpse into{" "}
              <span className="mt-1 block text-[#e0c46d]">Montana&apos;s past…</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-white/78 md:mt-8 md:text-lg md:leading-7">
              Walk the streets, enter preserved buildings, and see what remains of
              Montana&apos;s gold-rush era.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-9 md:gap-4">
              <Link
                href="/visit"
                className="group inline-flex items-center gap-5 bg-[#3d5a3e] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(53,12,17,.2)] transition-[background,transform,box-shadow] hover:-translate-y-1 hover:bg-[#4a6e4c] hover:shadow-[0_20px_46px_rgba(53,12,17,.3)] md:px-6 md:py-4"
              >
                Plan your visit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/explore"
                className="group inline-flex items-center gap-4 border border-white/35 px-5 py-3.5 text-sm font-semibold transition-[border,background,transform] hover:-translate-y-1 hover:border-white hover:bg-white/10 md:px-6 md:py-4"
              >
                See what you can explore
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md self-end rounded-sm bg-[#0d1218]/65 p-4 lg:w-auto">
            <HeroConditions roadReport={roadReport} />
          </div>
        </div>

    </section>
  );
}
