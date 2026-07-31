"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Star } from "./icons";
import { HeroConditions, type HeroRoadReport } from "./hero-conditions";

export function HomeHero({ roadReport }: { roadReport?: HeroRoadReport }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section || reducedMotion.matches) return;

        const rect = section.getBoundingClientRect();
        const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
        const copyProgress = Math.min(progress / 0.68, 1);
        const revealProgress = Math.min(progress / 0.92, 1);

        section.style.setProperty("--hero-clip-left", `${52 - revealProgress * 52}%`);
        section.style.setProperty("--hero-clip-right", `${48 - revealProgress * 48}%`);
        section.style.setProperty("--hero-copy-opacity", `${1 - copyProgress}`);
        section.style.setProperty("--hero-copy-y", `${copyProgress * -34}px`);
        section.style.setProperty("--hero-image-scale", `${1.025 + revealProgress * 0.045}`);
        section.style.setProperty("--hero-sepia-opacity", `${0.42 - revealProgress * 0.34}`);
        section.style.setProperty("--hero-cue-opacity", `${1 - Math.min(progress * 3, 1)}`);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    imageRef.current?.style.setProperty("--hero-x", `${x * -12}px`);
    imageRef.current?.style.setProperty("--hero-y", `${y * -8}px`);
  };

  const resetPointer = () => {
    imageRef.current?.style.setProperty("--hero-x", "0px");
    imageRef.current?.style.setProperty("--hero-y", "0px");
  };

  return (
    <section
      ref={sectionRef}
      className="hero-journey relative bg-[#0d1218] text-[#f8f6f1]"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero-stage paper-grain flex items-end overflow-hidden">
        <div
          ref={imageRef}
          className="absolute -inset-4 translate-x-[var(--hero-x,0px)] translate-y-[var(--hero-y,0px)] transition-transform duration-300 ease-out motion-reduce:transform-none"
        >
          <div className="absolute inset-0 scale-[var(--hero-image-scale)]">
            <Image
              src="/images/Garnet-Ghost-Town cover.webp?opening=sepia"
              alt="Weathered timber buildings of Garnet along a mountain dirt lane"
              fill
              loading="eager"
              fetchPriority="high"
              unoptimized
              sizes="100vw"
              className="object-cover object-[62%_center] sepia-[.65] saturate-[.48] contrast-[1.12] brightness-[.78]"
            />
          </div>
          <div className="hero-color-layer absolute inset-0 scale-[var(--hero-image-scale)]">
            <Image
              src="/images/Garnet-Ghost-Town cover.webp?opening=color"
              alt=""
              fill
              loading="eager"
              unoptimized
              sizes="100vw"
              className="object-cover object-[62%_center] sepia-[.08] saturate-[.88] contrast-[1.08]"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_32%,rgba(211,179,80,.13),transparent_23rem),linear-gradient(90deg,rgba(13,18,24,.96)_0%,rgba(14,28,39,.72)_46%,rgba(13,18,24,.17)_84%),linear-gradient(0deg,rgba(13,18,24,.88)_0%,transparent_60%)]" />
        <div className="hero-sepia-veil absolute inset-0 bg-[#6a442c] mix-blend-color" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/55 to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-[90rem] items-end gap-5 px-5 pt-32 pb-[10vh] md:gap-10 md:px-10 md:pt-36 md:pb-[15vh] lg:grid-cols-[1fr_auto]">
          <div className="hero-copy max-w-5xl">
            <p className="hero-enter mb-5 text-xs font-semibold text-[#e0c46d] md:mb-7 md:text-sm">
              About one hour east of Missoula · Garnet, Montana
            </p>
            <h1 className="hero-enter hero-enter-delay-1 display-type max-w-4xl text-[clamp(3rem,14vw,5.8rem)] leading-[0.94] tracking-[-0.035em] md:text-[clamp(3.35rem,6vw,5.8rem)] md:leading-[0.9]">
              In 1898, a thousand people{" "}
              <span className="mt-1 block text-[#e0c46d]">called this home.</span>
            </h1>
            <p className="hero-enter hero-enter-delay-2 mt-6 max-w-2xl text-sm leading-6 text-white/78 md:mt-8 md:text-lg md:leading-7">
              Today, Garnet is one of the best-preserved gold mining towns in the
              country — over 30 original structures still standing, from the hotel
              to the schoolhouse. Two unhurried hours, one hour from Missoula.
            </p>
            <div className="hero-enter hero-enter-delay-3 mt-6 flex flex-wrap gap-3 md:mt-9 md:gap-4">
              <Link
                href="/visit"
                className="group inline-flex items-center gap-5 bg-[#a8333d] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(53,12,17,.2)] transition-[background,transform,box-shadow] hover:-translate-y-1 hover:bg-[#bd3a46] hover:shadow-[0_20px_46px_rgba(53,12,17,.3)] md:px-6 md:py-4"
              >
                Plan your visit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/explore"
                className="group inline-flex items-center gap-4 border border-white/35 px-5 py-3.5 text-sm font-semibold transition-[border,background,transform] hover:-translate-y-1 hover:border-white hover:bg-white/10 md:px-6 md:py-4"
              >
                Explore the buildings
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="hero-enter hero-enter-delay-4 mt-8 flex items-center gap-4 text-sm text-white/80 md:mt-10">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=11" alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#0d1218] object-cover" />
                <img src="https://i.pravatar.cc/100?img=12" alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#0d1218] object-cover" />
                <img src="https://i.pravatar.cc/100?img=33" alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#0d1218] object-cover" />
                <img src="https://i.pravatar.cc/100?img=44" alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#0d1218] object-cover" />
                <img src="https://i.pravatar.cc/100?img=55" alt="Reviewer" className="h-9 w-9 rounded-full border-2 border-[#0d1218] object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 text-[#e0c46d]">
                  <Star className="h-3.5 w-3.5" />
                  <Star className="h-3.5 w-3.5" />
                  <Star className="h-3.5 w-3.5" />
                  <Star className="h-3.5 w-3.5" />
                  <Star className="h-3.5 w-3.5" />
                  <span className="ml-1 text-white font-semibold text-xs leading-none mt-px">4.7</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/60 mt-1">1,171 Google reviews</span>
              </div>
            </div>
          </div>

          <div className="hero-weather w-full max-w-md lg:mb-1 lg:w-auto">
            <HeroConditions roadReport={roadReport} />
          </div>
        </div>

        <div className="hero-scroll-cue absolute right-5 bottom-5 z-10 hidden items-center gap-3 text-[0.62rem] font-semibold tracking-[0.16em] text-white/55 uppercase md:flex md:right-10">
          <span className="h-px w-12 bg-white/30" />
          Enter Garnet
        </div>
      </div>
    </section>
  );
}
