import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { EventStatusBadge, SampleEventBadge, formatEventPrice } from "@/components/event-meta";
import {
  formatEventDate,
  formatEventDayTime,
  getEvents,
  splitEvents,
  type GarnetEvent,
} from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Education & Events",
  description:
    "School tours, scavenger hunts, nature hikes, and guided curriculum rooted in Montana's gold-rush past. Plus a full calendar of Garnet events.",
};

const educationPrograms = [
  {
    title: "School Tours",
    eyebrow: "Grades K–12 · Free",
    body: "School tours are free and are usually available from late May through mid-September, weather permitting. Choose from two tour options:",
    detail: null,
    cta: { label: "Email BLM to schedule", href: "mailto:blm_mt_Missoula_FO@blm.gov", external: true },
  },
  {
    title: "Scavenger Hunt",
    eyebrow: "All ages · Free with day pass",
    body: "Pick up a scavenger hunt card at the Visitor Center. Search town for old objects and building details that show how people lived in the 1890s. Visitors of all ages can take part. Leave everything where you find it.",
    detail: null,
    cta: { label: "Plan your visit", href: "/visit", external: false },
  },
  {
    title: "Nature Hike to Warren's Park",
    eyebrow: "Moderate · ¾ mile one-way",
    body: "Follow the trail from the edge of town to the small park Frank Warren cleared above the mine. Stop for lunch and enjoy the mountain setting. The hike is moderately difficult. Return along the same trail.",
    detail: null,
    cta: { label: "Plan your visit", href: "/visit", external: false },
  },
  {
    title: "Investigating Garnet: A Historic Mining Town",
    eyebrow: "Classroom curriculum · Grades 3–5",
    body: "BLM and Project Archaeology developed these lessons for classrooms to use before a visit. Students study old buildings, objects, and documents to learn about Garnet. They use the same skills when they explore the town.",
    detail:
      "Copies of the curriculum guide are sold at the Visitor Center during the summer season. Additional resources from Project Archaeology are also available online.",
    cta: { label: "Project Archaeology", href: "https://projectarchaeology.org/", external: true },
  },
];

const resources = [
  { label: "Project Archaeology", href: "https://projectarchaeology.org/" },
];

function EventRow({ event, index, past = false }: { event: GarnetEvent; index: number; past?: boolean }) {
  const inactive = event.status === "cancelled" || event.status === "postponed";
  const priceNote = [event.priceNote, event.price === undefined ? "$10 for visitors 16 and older · under 16 free" : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <Reveal
      className={`grid gap-6 py-10 md:grid-cols-[10rem_1fr_auto] md:gap-12 md:py-12 ${past ? "opacity-60" : ""}`}
      delay={index * 80}
    >
      <time
        dateTime={event.startDate}
        className={`display-type shrink-0 text-xl leading-[1.1] text-[#e0c46d] ${inactive ? "line-through" : ""}`}
      >
        {formatEventDate(event.startDate)}
        <span className="mt-1.5 block font-sans text-[0.68rem] font-semibold tracking-[0.08em] text-black/60 uppercase">
          {formatEventDayTime(event.startDate)}
        </span>
      </time>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="display-type text-3xl leading-none tracking-[-0.02em] md:text-4xl">
            {event.title}
          </h3>
          {!past && <EventStatusBadge status={event.status} />}
          {!past && <SampleEventBadge event={event} />}
        </div>
        <p className="mt-4 max-w-2xl leading-7 text-black/72">
          {event.description ?? event.homepageSummary}
        </p>
        {!past && event.accessAdvisory && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a8333d]">{event.accessAdvisory}</p>
        )}
        {!past && (
          <p className="mt-3 text-sm font-semibold text-[#1e2f1f]">
            {formatEventPrice(event)}
            {priceNote && <span className="ml-2 font-normal text-black/60">· {priceNote}</span>}
          </p>
        )}
      </div>

      {!past && event.detailsUrl && (
        <div className="flex items-start md:justify-end">
          <a
            href={event.detailsUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border-b border-[#d3b350] pb-1.5 text-sm font-semibold transition-colors hover:border-[#3d5a3e] hover:text-[#3d5a3e]"
          >
            {event.registrationRequired ? "Register" : "Event details"}
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      )}
    </Reveal>
  );
}

export default async function EventsPage() {
  const { data: events } = await getEvents();
  const { upcoming, recent } = splitEvents(events);

  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Education & Events"
        title="Learn about life in Garnet."
        intro="Visit the schoolhouse, explore the hotel, or follow the mine trail. School tours and activities help visitors learn about the people who lived and worked here."
        image="/images/historic/university-archive/garnet-ghost-town-school-class-portrait-72-0570.webp"
        imageAlt="Archival portrait of Garnet's school class"
        imagePosition="object-[center_42%]"
      />

      {/* EVENTS */}
      <section className="overflow-hidden border-b border-[#0e1c27]/12 bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal>
            <h2 className="display-type leading-[0.93] tracking-[-0.04em] section-heading">
              Events at Garnet
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/72">
              Living-history days, guided programs, and community gatherings bring Garnet&apos;s
              buildings and stories to life. Check confirmed dates before planning your trip.
            </p>
          </Reveal>

          {upcoming.length > 0 ? (
            <div className="mt-14 divide-y divide-[#0e1c27]/12 border-y border-[#0e1c27]/12">
              {upcoming.map((event, i) => (
                <EventRow key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <p className="mt-14 border-y border-[#0e1c27]/12 py-10 text-lg text-black/70">
              No upcoming events are currently scheduled. New events are posted here as
              soon as they are confirmed.
            </p>
          )}

          {recent.length > 0 && (
            <div className="mt-20">
              <h3 className="text-[0.68rem] font-bold tracking-[0.18em] text-black/60 uppercase">
                Recent events
              </h3>
              <div className="mt-4 divide-y divide-[#0e1c27]/12 border-y border-[#0e1c27]/12">
                {recent.map((event, i) => (
                  <EventRow key={event.id} event={event} index={i} past />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION INTRO */}
      <section className="paper-grain overflow-hidden bg-[#0e1c27] px-5 py-16 text-[#f8f6f1] md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:items-end">
            <h2 className="display-type leading-[0.92] tracking-[-0.04em] section-heading">
              Education at Garnet
            </h2>
            <div>
              <p className="text-lg leading-8 text-white/80">
                Gold miners came to the Garnet Mountains and built a town with a school,
                a hotel, and thirteen saloons. At the height of the boom, 41 students filled the schoolhouse.
                The school still stands, surrounded by the places where their families worked and gathered.
              </p>
              <p className="mt-5 leading-8 text-white/70">
                School groups, families, and other visitors can learn from Garnet’s buildings
                and trails. Explore with a ranger or look closely at the objects left behind.
                Each offers clues about how people lived and worked here.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10 grid items-center gap-8 border-t border-white/15 pt-8 sm:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)]">
            <figure className="mx-auto w-full max-w-xs">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0d1218]">
                <Image
                  src="/images/historic/university-archive/garnet-ghost-town-children-on-schoolhouse-steps-72-0569.webp"
                  alt="Children gathered on the steps of Garnet’s schoolhouse"
                  fill
                  sizes="(min-width: 640px) 320px, 80vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="archive-caption text-white/65">Children on the schoolhouse steps. Courtesy of University of Montana.</figcaption>
            </figure>
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-[#e0c46d] uppercase">A closer look</p>
              <h3 className="display-type mt-3 text-3xl leading-tight">Meet the children of Garnet.</h3>
              <p className="mt-4 max-w-xl leading-7 text-white/75">Look at the children’s clothes and the schoolhouse behind them. What might a school day have been like in Garnet? This photo gives students a way to picture life here before they visit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION PROGRAMS */}
      <section className="bg-[#f2eee4] px-5 py-16 md:px-10 md:py-20">
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
                  <p className="max-w-2xl text-base leading-8 text-black/72">{program.body}</p>
                  {program.title === "School Tours" && (
                    <div className="mt-6 max-w-2xl">
                      <div className="grid gap-6 border-y border-[#0e1c27]/15 py-6">
                        <div><h4 className="text-lg font-semibold">Town tour · About one hour</h4><p className="mt-2 text-base leading-8 text-black/72">A BLM park ranger or volunteer leads your group through Garnet and shares the town’s history.</p></div>
                        <div><h4 className="text-lg font-semibold">Sierra Mine tour · About a one-mile walk</h4><p className="mt-2 text-base leading-8 text-black/72">Walk through the forest in the Sierra Mine area, where miners once searched for gold.</p></div>
                      </div>
                      <div className="mt-6 border-l-4 border-[#a36b43] pl-5">
                        <h4 className="text-lg font-semibold">Help with transportation costs</h4>
                        <p className="mt-2 text-base leading-8 text-black/72">The Garnet Preservation Association offers grants to help with transportation. Call the BLM at <a href="tel:4063293914" className="underline underline-offset-4">(406) 329-3914</a> for details, or complete the application and follow its instructions.</p>
                        <a href="https://www.garnetghosttown.org/assets/files/Updated_GPA-Transportation-Grant-Form.docx" className="mt-4 inline-block border-b border-[#3d5a3e] pb-1.5 text-sm font-semibold hover:text-[#3d5a3e]">Download transportation grant application (Word) ↓</a>
                      </div>
                      <p className="mt-6 text-base leading-8 text-black/72">To schedule either tour, email <a href="mailto:blm_mt_Missoula_FO@blm.gov" className="break-all underline underline-offset-4">blm_mt_Missoula_FO@blm.gov</a>.</p>
                    </div>
                  )}
                  {program.detail && (
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-black/68">
                      {program.detail}
                    </p>
                  )}
                  <div className={program.title === "School Tours" ? "hidden" : "mt-8"}>
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
              <h2 className="display-type text-3xl leading-[0.96] tracking-[-0.03em] section-heading">
                Resources for educators
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-black/70">
                Project Archaeology offers classroom lessons that help students learn about
                historic places through old objects, buildings, and records.
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
            <h2 className="display-type text-3xl leading-[0.96] tracking-[-0.03em] section-heading">
              Bringing a group? Talk to us first.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/74">
              Contact the BLM Missoula Field Office to plan a group tour. Staff can answer
              questions about getting to Garnet and grants that help pay for school buses.
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
              className="text-center text-sm font-semibold text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              406.329.3914
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
