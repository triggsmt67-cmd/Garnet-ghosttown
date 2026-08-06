import type { Metadata } from "next";
import { ArrowUpRight, Compass } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { WeatherCard } from "@/components/weather-card";
import { FireRestrictionsCard } from "@/components/fire-restrictions-card";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: "Hours, fees, seasonal access, road guidance, directions, and practical tips for visiting Garnet Ghost Town from Missoula.",
};

const checklist = [
  "Download your map and day pass before cell coverage drops",
  "Layers for fast-changing mountain weather",
  "Sturdy shoes for uneven streets and trails",
  "A full tank and an offline route",
  "Extra time for the final gravel miles",
  "Same-day road confirmation after storms or early snow",
  "A morning-of check for current fire restrictions",
];

export default function VisitPage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Plan your visit"
        title="The road is part of it."
        intro="Garnet rewards a little preparation. Use this guide to choose the right route, understand seasonal access, and arrive ready to explore."
      />

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <h2 className="display-type text-5xl leading-[1.02]">
                What changes the trip.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-black/55">
                Conditions can change quickly at roughly 6,000 feet. Confirm current
                access with the Bureau of Land Management before leaving paved roads.
              </p>
            </div>
            <div className="grid border-t border-black/15 sm:grid-cols-2">
              {[
                ["Main season", "Late May–September", "Visitor center generally open 10:00 a.m.–4:30 p.m., weather permitting."],
                ["Admission", "$10 age 16+", "Visitors younger than 16 enter free."],
                ["Travel time", "About one hour", "Allow extra time for gravel roads and stops."],
                ["Winter", "Over-snow only", "Snowmobile, snowshoes, or cross-country skis."],
                ["Cell service", "No coverage", "Save your map, pass, and confirmation number before the drive."],
                ["Parking", "Limited", "A day pass does not guarantee a space. Carpool or arrive early."],
              ].map(([label, value, note]) => (
                <div key={label} className="border-b border-black/15 py-7 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                  <p className="text-[0.62rem] font-bold tracking-[0.15em] text-black/45 uppercase">{label}</p>
                  <p className="display-type mt-2 text-3xl">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-black/50">{note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="paper-grain bg-[#0e1c27] px-5 py-20 text-[#f8f6f1] md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <h2 className="display-type max-w-4xl text-5xl leading-[0.95] md:text-7xl">
              Two roads in. One deserves extra caution.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/15 lg:grid-cols-2">
            <Reveal className="bg-[#0e1c27] p-8 md:p-12">
              <div className="mb-14 flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">A</span>
                <span className="rounded-full border border-white/20 px-4 py-2 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  Recommended
                </span>
              </div>
              <h3 className="display-type text-4xl">From Highway 200</h3>
              <p className="mt-5 leading-7 text-white/60">
                About 30 miles east of Missoula, turn south between mile markers 22 and
                23. Follow the Garnet signs for approximately 10 miles to the parking area.
              </p>
            </Reveal>
            <Reveal className="bg-[#0e1c27] p-8 md:p-12" delay={120}>
              <div className="mb-14 flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">B</span>
                <span className="rounded-full border border-[#e0c46d]/50 px-4 py-2 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#e0c46d]">
                  No RVs or trailers
                </span>
              </div>
              <h3 className="display-type text-4xl">From Interstate 90</h3>
              <p className="mt-5 leading-7 text-white/60">
                Use the Drummond or Bearmouth exit and follow signs up Bear Gulch. This
                road is steep, narrow, rough, and not recommended for trailers or RVs.
              </p>
            </Reveal>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=46.82559,-113.33945"
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-5 border-b border-[#e0c46d] py-3 text-xs font-bold tracking-[0.16em] uppercase"
          >
            Open Garnet in Google Maps
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <Reveal>
              <h2 className="display-type text-5xl leading-[0.95] font-extrabold md:text-7xl">
                Pack for a high-elevation day.
              </h2>
              <Compass className="mt-12 h-32 w-32 text-[#3d5a3e]/20 transition-transform duration-1000 hover:rotate-45" />
            </Reveal>
            <div className="grid gap-2 md:grid-cols-[1fr_.9fr]">
              <div>
                {checklist.map((item, index) => (
                  <Reveal key={item} className="flex gap-5 border-b border-black/15 py-6" delay={index * 60}>
                    <span className="mt-2 h-px w-7 shrink-0 bg-[#3d5a3e]" aria-hidden="true" />
                    <p className="pt-1 text-sm font-semibold">{item}</p>
                  </Reveal>
                ))}
              </div>
              <div className="space-y-2">
                <WeatherCard />
                <FireRestrictionsCard compact />
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
