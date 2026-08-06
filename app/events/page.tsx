import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";

export const metadata: Metadata = {
  title: "Education & Events — Garnet Ghost Town",
  description:
    "School tours, scavenger hunts, nature hikes, and guided curriculum rooted in Montana's gold-rush past. Plus a full calendar of Garnet events.",
};

const events = [
  {
    date: "September 12, 2026",
    dateTime: "2026-09-12T12:30:00-06:00",
    day: "Saturday · 12:30 p.m.",
    title: "Step Back in Time",
    description:
      "Meet Garnet's 1917 residents inside five historic buildings, then stay for a chili feed, live music, and a street dance. Costumed interpreters bring the mining era to life in ways no sign ever could.",
    price: "$20 per person",
    priceNote: "Ages 12 and younger are free · separate from standard day pass",
    href: "https://main.glaciermt.io/montana-event/52870",
    featured: true,
  },
  {
    date: "July 4, 2026",
    dateTime: "2026-07-04T11:00:00-06:00",
    day: "Saturday · 11:00 a.m.",
    title: "Independence Day at the Ghost Town",
    description:
      "Celebrate the Fourth among buildings that saw a dozen Independence Days of their own. BLM rangers lead short historic walks every hour throughout the afternoon.",
    price: "Standard day pass",
    priceNote: "$10 for visitors 16 and older · under 16 free",
    href: "https://www.recreation.gov/activitypass/AP23157",
    featured: false,
  },
  {
    date: "August 16, 2026",
    dateTime: "2026-08-16T10:00:00-06:00",
    day: "Sunday · 10:00 a.m.",
    title: "Ranger-Led Mine Walk",
    description:
      "Follow a BLM park ranger on the Sierra Mine trail — a mile through the forest where prospectors staked their claims. The walk covers how ore was extracted, hauled, and processed, and why these mountains drew so many people so quickly.",
    price: "Standard day pass",
    priceNote: "$10 for visitors 16 and older · under 16 free",
    href: "https://garnetghosttown.org",
    featured: false,
  },
];

const educationPrograms = [
  {
    title: "School Tours",
    eyebrow: "Grades K–12 · Free",
    body: "BLM park rangers and trained volunteers guide student groups through the historic buildings and, if requested, the Sierra Mine trail — about a mile through the forest where miners once worked their claims. Tours run late May through mid-September, weather permitting, and typically last one hour. No admission fee for school groups.",
    detail:
      "Transportation grants from the Garnet Preservation Association are available to help offset busing costs. Contact the BLM Missoula Field Office to schedule a visit or request an application.",
    cta: { label: "Email BLM to schedule", href: "mailto:blm_mt_Missoula_FO@blm.gov", external: true },
  },
  {
    title: "Scavenger Hunt",
    eyebrow: "All ages · Free with day pass",
    body: "Pick up a scavenger hunt card at the Visitors Center and work your way through town searching for artifacts, architectural details, and traces of daily life in the 1890s. A good prompt for slow looking — and for reminding visitors of every age to leave what they find exactly where it is.",
    detail: null,
    cta: { label: "Plan your visit", href: "/visit", external: false },
  },
  {
    title: "Nature Hike to Warren's Park",
    eyebrow: "Moderate · ¾ mile one-way",
    body: "A moderately paced trail leads from the edge of town to the small park Frank Warren cleared in the mountains above the mine. It is a good place to stop, eat lunch, and take in why Garnet felt genuinely remote even when a thousand people lived here. Return the same way.",
    detail: null,
    cta: { label: "Plan your visit", href: "/visit", external: false },
  },
  {
    title: "Investigating Garnet: A Historic Mining Town",
    eyebrow: "Classroom curriculum · Grades 3–5",
    body: "Developed in partnership with BLM and Project Archaeology, this lesson series is designed to be used in the classroom before a site visit. Students examine evidence from historic buildings, artifacts, and documents — the same methods archaeologists use — and then apply what they have learned when they walk the town.",
    detail:
      "Copies of the curriculum guide are sold at the Visitors Center during the summer season. Resources from Project Archaeology, BLM Learning Landscapes, Montana Historical Society, and the National Park Service are also available online.",
    cta: { label: "Project Archaeology", href: "http://projectarchaeology.org/", external: true },
  },
];

const resources = [
  { label: "Project Archaeology", href: "http://projectarchaeology.org/" },
  {
    label: "BLM Learning Landscapes",
    href: "http://www.blm.gov/wo/st/en/res/Education_in_BLM/Learning_Landscapes.html",
  },
  {
    label: "Montana Historical Society — Educators",
    href: "http://mhs.mt.gov/education/Educators",
  },
  {
    label: "NPS Teaching with Historic Places",
    href: "http://www.nps.gov/nr/twhp/index.htm",
  },
];

export default function EventsPage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Education & Events"
        title="Every building is already a classroom."
        intro="The schoolhouse still stands. The hotel still has its register. The mine trail still runs through the forest. Garnet teaches without asking anyone to sit down."
      />

      {/* EVENTS */}
      <section className="overflow-hidden border-b border-[#0e1c27]/12 bg-white px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <h2 className="display-type text-[clamp(2.5rem,7vw,5rem)] leading-[0.93] tracking-[-0.04em]">
              Events at Garnet
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-black/55">
              A short list of occasions when the town comes to life in ways that a
              self-guided walk cannot quite replicate.
            </p>
          </Reveal>

          <div className="mt-14 divide-y divide-[#0e1c27]/12 border-y border-[#0e1c27]/12">
            {events.map((event, i) => (
              <Reveal
                key={event.dateTime}
                className="grid gap-6 py-10 md:grid-cols-[10rem_1fr_auto] md:gap-12 md:py-12"
                delay={i * 80}
              >
                <time
                  dateTime={event.dateTime}
                  className="display-type shrink-0 text-xl leading-[1.1] text-[#e0c46d]"
                >
                  {event.date}
                  <span className="mt-1.5 block font-sans text-[0.68rem] font-semibold tracking-[0.08em] text-black/38 uppercase">
                    {event.day}
                  </span>
                </time>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="display-type text-3xl leading-none tracking-[-0.02em] md:text-4xl">
                      {event.title}
                    </h3>
                    {event.featured && (
                      <span className="inline-block shrink-0 bg-[#3d5a3e] px-3 py-1 text-[0.6rem] font-bold tracking-[0.15em] text-white uppercase">
                        Featured event
                      </span>
                    )}
                  </div>
                  <p className="mt-4 max-w-2xl leading-7 text-black/58">{event.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#1e2f1f]">
                    {event.price}
                    <span className="ml-2 font-normal text-black/38">· {event.priceNote}</span>
                  </p>
                </div>

                <div className="flex items-start md:justify-end">
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 border-b border-[#d3b350] pb-1.5 text-sm font-semibold transition-colors hover:border-[#3d5a3e] hover:text-[#3d5a3e]"
                  >
                    Event details
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION INTRO */}
      <section className="paper-grain overflow-hidden bg-[#0e1c27] px-5 py-16 text-[#f8f6f1] md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:items-end">
            <h2 className="display-type text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
              Education at Garnet
            </h2>
            <div>
              <p className="text-lg leading-8 text-white/65">
                Gold miners climbed into the Garnet Mountains to stake their claims and ended up
                building a town — a school, a hotel, thirteen saloons, and a community that
                lasted a generation. The school still stands. So does the rest of it.
              </p>
              <p className="mt-5 leading-8 text-white/48">
                Programs at Garnet are designed for classrooms planning a field trip, for
                families who want more than a walk-through, and for anyone willing to follow a
                ranger into the forest to understand why the mines were where they were.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION PROGRAMS */}
      <section className="bg-[#f2eee4] px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-[82rem]">
          <div className="divide-y divide-[#0e1c27]/15 border-y border-[#0e1c27]/15">
            {educationPrograms.map((program, i) => (
              <Reveal
                key={program.title}
                className="grid gap-8 py-12 md:grid-cols-[.72fr_1.28fr] md:gap-16 md:py-14"
                delay={i * 70}
              >
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <p className="mb-3 text-[0.65rem] font-bold tracking-[0.18em] text-[#3d5a3e] uppercase">
                    {program.eyebrow}
                  </p>
                  <h3 className="display-type text-3xl leading-[0.95] tracking-[-0.03em] md:text-5xl">
                    {program.title}
                  </h3>
                </div>

                <div>
                  <p className="max-w-2xl text-base leading-8 text-black/62">{program.body}</p>
                  {program.detail && (
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-black/42">
                      {program.detail}
                    </p>
                  )}
                  <div className="mt-8">
                    <a
                      href={program.cta.href}
                      target={program.cta.external ? "_blank" : undefined}
                      rel={program.cta.external ? "noreferrer" : undefined}
                      className="group inline-flex items-center gap-3 border-b border-[#3d5a3e] pb-1.5 text-sm font-semibold transition-colors hover:text-[#3d5a3e]"
                    >
                      {program.cta.label}
                      {program.cta.external ? (
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      ) : (
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      )}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATOR RESOURCES */}
      <section className="border-t border-[#0e1c27]/12 bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16 lg:items-center">
            <div>
              <h2 className="display-type text-3xl leading-[0.96] tracking-[-0.03em] md:text-5xl">
                Resources for educators
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-black/50">
                Additional archaeology, history, and cultural heritage materials from the
                organizations that support sites like Garnet across Montana and the West.
              </p>
            </div>
            <ul className="divide-y divide-[#0e1c27]/10 border-y border-[#0e1c27]/10">
              {resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-6 py-4 text-sm font-semibold transition-colors hover:text-[#3d5a3e]"
                  >
                    {r.label}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-black/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3d5a3e]" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#1e2f1f] px-5 py-16 text-[#f8f6f1] md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[82rem] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="display-type text-3xl leading-[0.96] tracking-[-0.03em] md:text-5xl">
              Bringing a group? Talk to us first.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              School groups, organizations, and educators planning a visit can contact the BLM
              Missoula Field Office to schedule tours, request transportation grant information,
              or ask questions about access.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:shrink-0">
            <a
              href="mailto:blm_mt_Missoula_FO@blm.gov"
              className="group inline-flex items-center justify-center gap-3 bg-[#f8f6f1] px-6 py-4 text-sm font-semibold text-[#18202a] transition-transform duration-300 hover:-translate-y-1"
            >
              Email BLM Missoula
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="tel:4063293914"
              className="text-center text-sm font-semibold text-white/55 underline decoration-white/20 underline-offset-4 hover:text-white"
            >
              406.329.3914
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
