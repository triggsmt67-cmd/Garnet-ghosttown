import { homeHeroCopy } from "./home-hero-copy";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";
import { HeroConditions, type HeroRoadReport } from "./hero-conditions";

export function HomeHeroCream({ roadReport }: { roadReport?: HeroRoadReport }) {
  return (
    <>
    <section className="bg-[#f2eee4] pt-32 text-[#24352b] md:pt-36">
      <div className="mx-auto grid max-w-[100rem] lg:min-h-[36rem] lg:grid-cols-[.95fr_1.05fr]">
        <div className="flex items-center px-5 py-12 md:px-10 md:py-16 lg:py-20 xl:px-14">
          <div className="max-w-[40rem]">
            <p className="mb-5 text-xs font-semibold text-[#98613d] md:mb-7 md:text-sm">
              {homeHeroCopy.location}
            </p>
            <h1 className="display-type text-[clamp(2.8rem,7vw,5.25rem)] leading-[0.98] tracking-[-0.035em] lg:text-[clamp(3.3rem,5.2vw,5.25rem)]">
              {homeHeroCopy.titleLead}{" "}
              <span className="mt-1 block text-[#3d5a3e]">{homeHeroCopy.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-6 text-[#24352b]/85 md:mt-8 md:text-lg md:leading-7">
              {homeHeroCopy.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-9 md:gap-4">
              <Link
                href="/visit"
                className="group inline-flex items-center gap-5 bg-[#3d5a3e] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(53,12,17,.2)] transition-[background,transform,box-shadow] hover:-translate-y-1 hover:bg-[#4a6e4c] hover:shadow-[0_20px_46px_rgba(53,12,17,.3)] md:px-6 md:py-4"
              >
                {homeHeroCopy.primaryAction}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/explore"
                className="group inline-flex items-center gap-4 border border-[#24352b]/40 px-5 py-3.5 text-sm font-semibold transition-[border,background,transform] hover:-translate-y-1 hover:border-[#24352b] hover:bg-[#24352b]/5 md:px-6 md:py-4"
              >
                {homeHeroCopy.secondaryAction}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

        </div>
        <div className="relative min-h-[21rem] sm:min-h-[28rem] lg:min-h-full">
          <Image
            src="/images/Home-Top-Banner.webp"
            alt="Historic photograph of Garnet’s buildings and mountain street"
            fill
            priority
            sizes="(min-width: 1024px) 53vw, 100vw"
            className="object-cover object-[62%_center] lg:object-center"
          />
        </div>
      </div>
    </section>
    <div className="bg-[#24352b] px-5 py-5 md:px-10">
      <div className="mx-auto max-w-[82rem]">
        <HeroConditions roadReport={roadReport} layout="strip" />
      </div>
    </div>
    </>
  );
}
