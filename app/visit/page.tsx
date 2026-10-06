import Link from "next/link";
import type { Metadata } from "next";
import { Compass } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { WeatherCard } from "@/components/weather-card";
import { FireRestrictionsCard } from "@/components/fire-restrictions-card";
import { VisitCards } from "@/components/visit-cards";
import { getFireStatus } from "@/lib/fire";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: "Hours, fees, seasonal access, road guidance, directions, and practical tips for visiting Garnet Ghost Town from Missoula.",
};

interface ChecklistItem {
  title: string;
  tag: string;
  detail: string;
}

const checklist: ChecklistItem[] = [
  {
    title: "Food, water, and layers",
    tag: "No Concessions",
    detail:
      "There is no drinking water or food service at Garnet. Bring everything you need for the day, plus a warm layer and rain shell for fast-changing mountain weather.",
  },
  {
    title: "Sturdy shoes",
    tag: "Uneven Ground",
    detail:
      "Expect gravel roads, rocky paths, old boardwalks, stairs, and raised thresholds. Closed-toe walking or hiking shoes are the safest choice.",
  },
  {
    title: "An offline map and printed pass",
    tag: "No Cell Service",
    detail:
      "Cell service disappears before the townsite. Save your route offline and print any prepaid Recreation.gov receipt before leaving the valley.",
  },
  {
    title: "A road-ready vehicle",
    tag: "Mountain Road",
    detail:
      "Start with a full tank or charge and carry a spare tire, jack, and basic emergency supplies. There is no fuel, charging, or repair service on the mountain.",
  },
  {
    title: "Bear awareness",
    tag: "Wildlife Country",
    detail:
      "The Garnet Range is bear habitat. Keep food secured, stay alert around buildings and blind corners, and carry bear spray where it is immediately reachable.",
  },
];

export default async function VisitPage() {
  const fire = await getFireStatus();

  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Plan your visit"
        title="Plan the last 11 miles before you go."
        intro="Garnet sits at 6,000 feet in the Garnet Range. Check the recommended route, seasonal access, admission, and what to bring before you leave reliable cell service."
        image="/images/garnet-town.JPG"
        imageAlt="The mountain road entering Garnet Ghost Town"
        imagePosition="object-[center_58%]"
      />

      {/* At-a-Glance Fast Facts */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                Trip Essentials
              </span>
              <h2 className="display-type mt-2 leading-[1.02] font-normal section-heading">
                Know before you make the trip.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-black/72">
                Start with the four details that determine when to go, which road to take,
                what admission costs, and what to arrange before leaving the valley floor.
              </p>
            </div>
            <div className="grid border-t border-black/15 sm:grid-cols-2">
              {[
                [
                  "Wheeled Access Season",
                  "May 1 – Dec 31",
                  "Passenger cars can use the road when conditions allow. From Jan 1 – Apr 30, it is closed to wheeled vehicles and open for over-snow travel only.",
                ],
                [
                  "Admission & Passes",
                  "$10 / Free Under 16",
                  "Visitors 16 and older pay $10; younger visitors enter free. Pay at the parking lot kiosk, use a cash envelope, or buy online and print the receipt.",
                ],
                [
                  "Primary Driving Route",
                  "MT-200 (Mile Marker 22)",
                  "Turn south at Mile Marker 22 onto Garnet Range Road. This 11-mile route is the gentler approach and avoids the narrow cliffside sections of Cave Gulch.",
                ],
                [
                  "Cellular Coverage",
                  "Zero Service",
                  "Download offline maps and print your online day-pass receipt before leaving Missoula or the I-90 corridor.",
                ],
              ].map(([label, value, note]) => (
                <div key={label} className="border-b border-black/15 py-7 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                  <p className="text-[0.62rem] font-bold tracking-[0.15em] text-black/60 uppercase">{label}</p>
                  <p className="display-type mt-2 text-3xl">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-black/70">{note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expandable Comprehensive Visitor Guide */}
      <section className="paper-grain bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Interactive Field Guide
            </span>
            <h2 className="display-type mt-2 max-w-4xl leading-[0.95] section-heading">
              The Garnet Field Guide.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
              Three short guides cover the decisions that matter most: which road to take,
              what you will find when you arrive, and how admission works.
            </p>
          </Reveal>

          <div className="mt-12">
            <VisitCards />
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                  Field Readiness
                </span>
                <h2 className="display-type mt-2 leading-[0.95] font-normal section-heading">
                  Pack for a high-elevation day.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-black/72">
                Five essentials cover most day trips. Check the live mountain conditions beside
                them before beginning your drive.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
            {/* Checklist Items */}
            <div className="divide-y divide-black/15 border-t border-black/15">
              {checklist.map((item, index) => (
                <Reveal key={item.title} className="py-6" delay={index * 40}>
                  <div className="flex items-start gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d5a3e]" aria-hidden="true" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="display-type text-2xl font-normal text-[#0e1c27]">
                          {item.title}
                        </h3>
                        <span className="rounded-full bg-[#3d5a3e]/10 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#3d5a3e]">
                          {item.tag}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-black/65">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Sidebar Widgets & Emergency Advisory */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <WeatherCard />
              <FireRestrictionsCard fire={fire} compact />

              <div className="border border-black/15 bg-[#0e1c27]/[0.03] p-6 text-xs leading-relaxed text-black/65">
                <div className="flex items-center justify-between">
                  <p className="font-bold tracking-[0.14em] uppercase text-[#3d5a3e]">
                    Before Leaving Pavement
                  </p>
                  <Compass className="h-5 w-5 text-[#3d5a3e]/40" />
                </div>
                <p className="mt-2 text-black/65">
                  Check the official road notice, download your map, and confirm that your spare tire
                  and emergency supplies are ready. Assistance can take hours to reach the Garnet Range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#3d5a3e] px-5 py-14 text-[#f8f6f1] md:px-10">
        <div className="mx-auto flex max-w-[82rem] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="display-type text-3xl md:text-4xl">Road and Visitor Center conditions can change.</p>
          <a className="text-xs font-bold tracking-[0.15em] uppercase underline underline-offset-8" href="https://www.blm.gov/visit/garnet-ghost-town" target="_blank" rel="noreferrer">
            Check the official BLM page ↗
          </a>
        </div>
      </section>
      <section className="bg-[#e9e1d1] px-5 py-10 md:px-10"><div className="mx-auto max-w-[82rem]"><h2 className="display-type text-3xl">Planning an overnight winter trip?</h2><Link href="/cabin-rentals" className="mt-5 inline-block border-b border-[#98613d] pb-2 font-semibold">See winter cabin rental information →</Link></div></section>
    <aside className="bg-[#f4f0e7] px-5 py-8 text-center"><Link href="/updates" className="font-semibold underline underline-offset-4">Check current updates before your trip →</Link></aside>
    </main>
  );
}
