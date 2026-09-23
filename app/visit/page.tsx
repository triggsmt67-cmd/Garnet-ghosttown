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
    title: "Layer for 6,000 Feet",
    tag: "Mountain Weather",
    detail:
      "Temperatures at Garnet run 10°F to 20°F cooler than Missoula or the Clark Fork Valley, and afternoon alpine storms roll in quickly. Summer snow can occur even in June and July. Pack windproof outer shells, fleece or wool layers, and high-altitude sun protection.",
  },
  {
    title: "Pack All Food & Drinking Water",
    tag: "Zero Concessions",
    detail:
      "There is no potable running tap water and no food concessions on the mountain (Davey's Store closed in 1947). Bring at least 1 to 2 liters of drinking water per person, hearty trail snacks, and a packed picnic to enjoy at scenic tables overlooking the townsite.",
  },
  {
    title: "EPA-Approved Bear Spray",
    tag: "Active Bear Habitat",
    detail:
      "The Garnet Range is active territory for both black bears and grizzly bears. Carry EPA-registered bear spray in a quick-draw holster on your hip or chest harness—never packed deep inside a backpack. Make noise around historic wooden buildings and blind trail corners.",
  },
  {
    title: "Sturdy Closed-Toe Footwear",
    tag: "Uneven Boardwalks",
    detail:
      "Garnet is preserved in authentic arrested decay without modern paved walkways. You will navigate coarse gravel roads, rocky mine tailings, steep staircases, and weathered 19th-century boardwalks with raised nail heads. Sturdy hiking shoes or boots with ankle support are essential.",
  },
  {
    title: "Full Fuel Tank or EV Battery",
    tag: "No Mountain Fuel",
    detail:
      "The 11-mile Garnet Range Road climbs nearly 2,000 vertical feet, draining fuel and battery range much faster than flat highway driving. The nearest gas stations and chargers are 25 to 30 miles away in Bonner (Exit 109), Drummond, or Missoula. Fill up before leaving the valley.",
  },
  {
    title: "Offline GPS Maps & Printed Passes",
    tag: "Zero Cellular Service",
    detail:
      "Cell reception cuts out miles before reaching the ghost town. Download offline maps for Granite and Missoula counties beforehand so navigation apps do not send you down impassable logging tracks. If you prepay on Recreation.gov, print your paper receipt at home for your dash.",
  },
  {
    title: "Pack-It-In, Pack-It-Out Trash",
    tag: "Bear-Proof Dumpsters",
    detail:
      "Bear-proof steel dumpsters are provided at the main upper parking lot during peak summer months. If visiting during shoulder seasons or if bins are full, pack out 100% of your trash. Never leave food, food wrappers, pet food, or coolers inside parked cars or on picnic tables.",
  },
  {
    title: "Upper Lot Parking & Ice Caution",
    tag: "Steep Glare Ice",
    detail:
      "Always park in the main upper ridge lot and walk the 0.25-mile road down into town. In spring and late autumn, this steep shaded road develops severe glare ice. Vehicles driving into town regularly get trapped, and remote towing services take hours and cost upwards of $500–$1,000.",
  },
];

export default async function VisitPage() {
  const fire = await getFireStatus();

  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Plan your visit"
        title="The road is part of the experience."
        intro="Garnet sits at 6,000 feet in the Garnet Range. Use this guide to choose the safest route, check seasonal access dates, prepare for off-grid conditions, and arrive ready to explore."
      />

      {/* At-a-Glance Fast Facts */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                Trip Essentials
              </span>
              <h2 className="display-type mt-2 text-4xl leading-[1.02] font-normal md:text-5xl">
                Know before you make the trip.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-black/60">
                Garnet is unpaved, off-grid, and perched at 6,000 feet in the Garnet Range.
                Review these six logistical realities—from seasonal road gates and day passes to
                zero cellular reception—before leaving the valley floor.
              </p>
            </div>
            <div className="grid border-t border-black/15 sm:grid-cols-2">
              {[
                [
                  "Wheeled Access Season",
                  "May 1 – Dec 31",
                  "Open to passenger cars (weather permitting). Strictly closed to wheeled vehicles Jan 1 – Apr 30 for over-snow travel only (skis, snowshoes, snowmobiles).",
                ],
                [
                  "Admission & Passes",
                  "$10 / Free Under 16",
                  "Ages 16+ pay $10; under 16 enter free. Tap-to-Pay kiosk in lot, cash envelopes, or Rec.gov (print receipt). America the Beautiful passes admit up to 4 adults.",
                ],
                [
                  "Townsite & Structures",
                  "29 Historic Buildings",
                  "Preserved in authentic arrested decay. The townsite is open year-round; 5 landmark buildings are staffed daily 10:00 a.m.–4:30 p.m. during peak season.",
                ],
                [
                  "Primary Driving Route",
                  "MT-200 (Mile Marker 22)",
                  "Turn south at Mile Marker 22 onto Garnet Range Road (11 mi). Gentlest ascent with 3.7 mi paved; avoids the narrow, sheer cliff drop-offs of Cave Gulch off I-90.",
                ],
                [
                  "Cellular Coverage",
                  "Zero Service",
                  "No cellular signal exists on the mountain. Download offline GPS maps and print your Rec.gov day pass receipt before leaving Missoula or the I-90 corridor.",
                ],
                [
                  "Ridge Parking & Ice",
                  "Park at Upper Lot",
                  "Always park at the top ridge and walk down. In spring and fall, the steep town descent turns to glare ice—vehicles that drive down get trapped and face steep tow fees.",
                ],
              ].map(([label, value, note]) => (
                <div key={label} className="border-b border-black/15 py-7 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                  <p className="text-[0.62rem] font-bold tracking-[0.15em] text-black/45 uppercase">{label}</p>
                  <p className="display-type mt-2 text-3xl">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-black/55">{note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expandable Comprehensive Visitor Guide */}
      <section className="paper-grain bg-[#0e1c27] px-5 py-20 text-[#f8f6f1] md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Interactive Field Guide
            </span>
            <h2 className="display-type mt-2 max-w-4xl text-5xl leading-[0.95] md:text-7xl">
              The Garnet Field Guide.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
              Garnet rewards careful preparation. Select any topic from the ledger to review
              turn-by-turn driving routes, preserved building hours, seasonal road dates, gear checklists,
              and admission passes.
            </p>
          </Reveal>

          <div className="mt-12">
            <VisitCards />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                  Field Readiness
                </span>
                <h2 className="display-type mt-2 text-5xl leading-[0.95] font-normal md:text-7xl">
                  Pack for a high-elevation day.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-black/60">
                At 6,000 feet, self-reliance is non-negotiable. Review these eight essential field provisions
                and live mountain conditions before beginning your drive.
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
                    Emergency &amp; Mountain Towing
                  </p>
                  <Compass className="h-5 w-5 text-[#3d5a3e]/40" />
                </div>
                <p className="mt-2 text-black/65">
                  There are no repair shops or gas stations in the Garnet Range. Mountain towing from Missoula or
                  Drummond takes hours to dispatch and frequently costs upwards of $500–$1,000. Carry a proper spare
                  tire, vehicle jack, jumper cables, and plenty of extra drinking water.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#3d5a3e] px-5 py-14 text-[#f8f6f1] md:px-10">
        <div className="mx-auto flex max-w-[82rem] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="display-type text-3xl md:text-4xl">Road and visitor-center conditions can change.</p>
          <a className="text-xs font-bold tracking-[0.15em] uppercase underline underline-offset-8" href="https://www.blm.gov/visit/garnet-ghost-town" target="_blank" rel="noreferrer">
            Check the official BLM page ↗
          </a>
        </div>
      </section>
    </main>
  );
}
