"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "./icons";

type Season = {
  name: string;
  headline: string;
  introduction: string;
  image: string;
  imageAlt: string;
  imageClass: string;
  details: Array<{ term: string; description: string }>;
  primaryLink: {
    href: string;
    label: string;
  };
  secondaryLink?: {
    href: string;
    label: string;
  };
};

const seasons: Season[] = [
  {
    name: "Summer",
    headline: "The easiest time to make the drive.",
    introduction:
      "Late May through September is the main visitor season. The town is busiest on summer weekends, when arriving early and carpooling make the day easier.",
    image: "/images/garnet-hero.png",
    imageAlt: "Historic timber buildings along Garnet's mountain road",
    imageClass: "sepia-[.12] saturate-[.8] contrast-[1.05]",
    details: [
      {
        term: "Visitor center",
        description: "Generally open daily, 10:00 a.m.–4:30 p.m., weather permitting.",
      },
      {
        term: "Road access",
        description: "Use the signed Garnet Range Road approach from Highway 200.",
      },
      {
        term: "Before leaving",
        description: "Save your pass and map while you still have cell service.",
      },
    ],
    primaryLink: {
      href: "https://www.recreation.gov/activitypass/AP23157",
      label: "Get the day pass",
    },
  },
  {
    name: "Autumn",
    headline: "Autumn reaches the mountain early.",
    introduction:
      "Autumn can be one of the most atmospheric times to see Garnet, but the mountain begins changing before the valleys do. Visitor-center hours taper after September.",
    image: "/images/garnet-hero.png",
    imageAlt: "Garnet's historic street beneath the surrounding mountains",
    imageClass: "sepia-[.3] saturate-[.65] contrast-[1.08]",
    details: [
      {
        term: "What changes",
        description: "Staffing, daylight, and road conditions become less predictable.",
      },
      {
        term: "What to bring",
        description: "Warm layers, water, and food. Fill up in Missoula — there's no fuel within 30 miles of Garnet.",
      },
      {
        term: "Before leaving",
        description: "Check the forecast and call after an early storm.",
      },
    ],
    primaryLink: {
      href: "https://www.blm.gov/visit/garnet-ghost-town",
      label: "Check official access",
    },
  },
  {
    name: "Winter",
    headline: "Winter visitors travel over snow.",
    introduction:
      "Once wheeled access ends, Garnet becomes an over-snow trip by snowmobile, cross-country skis, or snowshoes. This is a backcountry visit, not a winter drive.",
    image: "/images/garnet-winter-cabin.png",
    imageAlt: "Illustrative winter scene of a historic cabin surrounded by deep snow",
    imageClass: "saturate-[.72] contrast-[1.08]",
    details: [
      {
        term: "Access",
        description: "Plan for over-snow travel and changing mountain weather.",
      },
      {
        term: "Cabin stays",
        description: "Two primitive historic cabins are available through an annual lottery on Recreation.gov. Apply before the season fills.",
      },
      {
        term: "Facilities",
        description: "Wood heat and propane cooking; no electricity or indoor plumbing.",
      },
    ],
    primaryLink: {
      href: "https://garnetghosttown.org/cabin-rentals.php",
      label: "Winter cabin details",
    },
    secondaryLink: {
      href: "tel:4063293914",
      label: "Call the BLM",
    },
  },
  {
    name: "Spring",
    headline: "Wait for the mountain road to reopen.",
    introduction:
      "Snowmelt and spring thaw can make the final miles impassable even when Missoula feels warm. Do not assume that a clear highway means Garnet is accessible by car.",
    image: "/images/garnet-hero.png",
    imageAlt: "The mountain road running through Garnet Ghost Town",
    imageClass: "sepia-[.1] saturate-[.6] brightness-[.94] contrast-[1.05]",
    details: [
      {
        term: "Road conditions",
        description: "Mud, lingering snow, and washouts can delay wheeled access.",
      },
      {
        term: "Trip timing",
        description: "Access dates are condition-dependent rather than guaranteed.",
      },
      {
        term: "Before leaving",
        description: "Call the Missoula Field Office for current road guidance.",
      },
    ],
    primaryLink: {
      href: "tel:4063293914",
      label: "Call 406.329.3914",
    },
  },
];

export function SeasonalFieldGuide() {
  const [activeSeason, setActiveSeason] = useState(0);
  const season = seasons[activeSeason];

  return (
    <section
      id="seasonal-guide"
      className="scroll-mt-20 bg-[#f8f6f1] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[82rem] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div className="lg:pt-4">
          <h2 className="display-type max-w-xl text-5xl leading-[.98] tracking-[-0.035em] md:text-7xl">
            Choose the season you plan to visit.
          </h2>
          <p className="mt-7 max-w-md leading-8 text-black/60">
            Garnet is open year-round, but the trip changes completely with the
            mountain. Select a season before making plans.
          </p>

          <div
            className="mt-10 border-y border-[#0e1c27]/20"
            role="tablist"
            aria-label="Seasonal access"
          >
            {seasons.map((item, index) => {
              const selected = index === activeSeason;
              return (
                <button
                  key={item.name}
                  id={`season-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="season-panel"
                  onClick={() => setActiveSeason(index)}
                  className={`group flex w-full items-center justify-between border-b border-[#0e1c27]/15 py-5 text-left last:border-b-0 ${
                    selected ? "text-[#3d5a3e]" : "text-[#18202a]"
                  }`}
                >
                  <span className="display-type text-3xl">{item.name}</span>
                  <span
                    aria-hidden="true"
                    className={`h-px transition-all duration-300 ${
                      selected
                        ? "w-16 bg-[#3d5a3e]"
                        : "w-7 bg-[#0e1c27]/30 group-hover:w-12 group-hover:bg-[#0e1c27]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="season-panel"
          role="tabpanel"
          aria-labelledby={`season-tab-${activeSeason}`}
          className="overflow-hidden bg-[#0e1c27] text-[#f8f6f1] shadow-[0_28px_80px_rgba(13,18,24,.14)]"
        >
          <div className="relative aspect-[16/8] min-h-[17rem] overflow-hidden">
            <Image
              key={season.image}
              src={season.image}
              alt={season.imageAlt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${season.imageClass}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c27] via-[#0e1c27]/10 to-transparent" />
          </div>

          <div className="px-6 pb-8 md:px-10 md:pb-10">
            <p className="display-type max-w-2xl text-4xl leading-[1.02] md:text-5xl">
              {season.headline}
            </p>
            <p className="mt-6 max-w-2xl leading-7 text-white/65">
              {season.introduction}
            </p>

            <dl className="mt-9 border-y border-white/15">
              {season.details.map((detail) => (
                <div
                  key={detail.term}
                  className="grid gap-2 border-b border-white/15 py-5 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-[#e0c46d]">
                    {detail.term}
                  </dt>
                  <dd className="text-sm leading-6 text-white/62">
                    {detail.description}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={season.primaryLink.href}
                target={
                  season.primaryLink.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  season.primaryLink.href.startsWith("http")
                    ? "noreferrer"
                    : undefined
                }
                className="group inline-flex items-center gap-3 border-b border-[#d3b350] pb-2 text-sm font-semibold"
              >
                {season.primaryLink.label}
                {season.primaryLink.href.startsWith("http") && (
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
              </a>
              {season.secondaryLink && (
                <a
                  href={season.secondaryLink.href}
                  className="text-sm text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                >
                  {season.secondaryLink.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
