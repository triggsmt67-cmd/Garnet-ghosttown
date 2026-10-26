import { Suspense } from "react";
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
    "Explore guided tours, hiking trails, classroom resources, family activities, and special events at Garnet Ghost Town.",
};

const educationSections = [
  { id: "guided-tours", label: "Educational programs & guided tours" },
  { id: "trails", label: "Nature hikes & trails" },
  { id: "special-events", label: "Special events" },
  { id: "family-activities", label: "Kids & family activities" },
  { id: "visitor-information", label: "Additional information" },
];

function ActivityRow({ title, note, children }: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 border-t border-[#0e1c27]/15 py-10 md:grid-cols-[.72fr_1.28fr] md:gap-16 md:py-12">
      <div>
        {note && <p className="mb-3 text-[0.65rem] font-bold tracking-[0.14em] text-[#3d5a3e] uppercase">{note}</p>}
        <h3 className="display-type text-3xl leading-[1.05] tracking-[-0.025em] md:text-4xl">{title}</h3>
      </div>
      <div className="max-w-2xl space-y-5 text-base leading-8 text-black/72">{children}</div>
    </Reveal>
  );
}

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

async function EventsCalendar() {
  const { data: events } = await getEvents();
  const { upcoming, recent } = splitEvents(events);
  const calendarEvents = upcoming.map(event =>
    /step back in time mock event/i.test(event.title)
      ? { ...event, isSample: true }
      : event,
  );
  const showSample = calendarEvents.some(event => event.isSample);

  return (<>
          {showSample && (
            <p className="mt-8 border-l-4 border-[#a36b43] bg-[#f4f0e7] p-5 text-sm leading-7 text-black/72">
              Sample event for preview. The date, activities, and admission price below demonstrate the calendar layout and are not a confirmed event announcement.
            </p>
          )}

          {calendarEvents.length > 0 ? (
            <div className="mt-14 divide-y divide-[#0e1c27]/12 border-y border-[#0e1c27]/12">
              {calendarEvents.map((event, i) => (
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
  </>);
}

export default function EventsPage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Education & Events"
        title="Learn about life in Garnet."
        intro="Explore Garnet’s historic buildings, follow a trail to an old mining claim, or bring your class for a guided tour. Discover programs, events, and activities for visitors of all ages."
        image="/images/Event-Top-Banner.webp"
        imageAlt="Visitors gathered on the lawn among Garnet’s historic buildings"
        imagePosition="object-[center_42%]"
      />

      <nav aria-label="On this page" className="border-b border-[#0e1c27]/12 bg-[#f2eee4] px-5 py-7 md:px-10">
        <div className="mx-auto max-w-[82rem]">
          <p className="mb-4 text-[0.65rem] font-bold tracking-[0.16em] text-[#3d5a3e] uppercase">On this page</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
            <li><a href="#calendar" className="underline decoration-[#a36b43]/40 underline-offset-4 hover:text-[#3d5a3e]">Event calendar</a></li>
            {educationSections.map(section => (
              <li key={section.id}><a href={`#${section.id}`} className="underline decoration-[#a36b43]/40 underline-offset-4 hover:text-[#3d5a3e]">{section.label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      {/* EVENTS */}
      <section id="calendar" className="scroll-mt-28 overflow-hidden border-b border-[#0e1c27]/12 bg-white px-5 py-16 md:px-10 md:py-20">
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

          <Suspense fallback={<p role="status" className="mt-14 border-y border-[#0e1c27]/12 py-10 text-lg text-black/70">Loading the event calendar…</p>}>
            <EventsCalendar />
          </Suspense>
        </div>
      </section>

      {/* EDUCATION INTRO */}
      <section id="education" className="paper-grain scroll-mt-28 overflow-hidden bg-[#0e1c27] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-20">
        <Reveal className="mx-auto grid max-w-[68rem] items-center gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,.85fr)] md:gap-10 lg:gap-12">
          <div>
            <h2 className="display-type leading-[0.98] tracking-[-0.035em] section-heading">
              Education at Garnet
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">
              Garnet’s buildings, mining trails, and everyday objects offer a closer look
              at the people who lived and worked here. Guided tours and classroom lessons
              help students explore the town as historians and archaeologists.
            </p>
            <p className="mt-5 max-w-xl leading-8 text-white/70">
              Families and other visitors can explore at their own pace, pick up a
              scavenger hunt, or follow interpretive signs through town. Start at the
              Visitor Center for maps and activity information.
            </p>
            <p className="mt-7 max-w-xl leading-8 text-white/75">
              <span className="display-type block text-2xl italic leading-tight text-[#e0c46d]">Picture a school day in Garnet.</span>
              <span className="mt-3 block">Visit the schoolhouse and imagine the children who learned here. What might a school day have been like in Garnet?</span>
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[22rem] md:ml-0">
            <Image
              src="/images/Events-Schoolchildren.webp"
              alt="Three visitors in period clothing standing on the steps of Garnet’s schoolhouse"
              width={522}
              height={786}
              sizes="(min-width: 1024px) 352px, (min-width: 768px) 32vw, (min-width: 392px) 352px, calc(100vw - 40px)"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 text-sm leading-6 text-white/60">Visitors at Garnet’s schoolhouse.</figcaption>
          </figure>
        </Reveal>
      </section>

      <section id="guided-tours" className="scroll-mt-28 bg-[#f2eee4] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="mb-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#3d5a3e] uppercase">Learn with a guide</p>
            <h2 className="display-type section-heading leading-[0.98] tracking-[-0.035em]">Educational programs &amp; guided tours</h2>
            <p className="mt-6 max-w-2xl leading-8 text-black/72">BLM personnel and Garnet Preservation Association volunteers lead tours through town and the surrounding mining area.</p>
          </Reveal>
          <ActivityRow title="Garnet Town Proper Tour" note="About one hour · No charge">
            <p>Explore the old buildings still standing in Garnet, including the Dahl Hotel, Davey’s Store, the blacksmith shop, and the “new” school. BLM personnel or GPA volunteers share the history of some of the original inhabitants as students explore each building.</p>
          </ActivityRow>
          <ActivityRow title="Sierra Mine Area Tour" note="About one hour · One-mile hike · No charge">
            <p>Walk through the woods to where early miners prospected for gold. This guided tour includes an easy hike of about one mile and is led by BLM personnel or GPA volunteers.</p>
          </ActivityRow>
          <div className="grid gap-8 border-t border-[#0e1c27]/15 py-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-lg font-semibold">Schedule a tour</h3>
              <p className="mt-3 leading-8 text-black/72">Tours are offered at no charge and are usually available from late May through mid-September, depending on the weather. Please dress appropriately and schedule in advance.</p>
              <a href="tel:4063293914" className="mt-4 inline-block border-b border-[#3d5a3e] pb-1 text-sm font-semibold hover:text-[#3d5a3e]">Call BLM at 406-329-3914 →</a>
            </div>
            <div className="border-l-4 border-[#a36b43] pl-6">
              <h3 className="text-lg font-semibold">Help with transportation costs</h3>
              <p className="mt-3 leading-8 text-black/72">GPA offers grants to assist with transportation costs. Once your tour is scheduled and approved, complete the Transportation Grant Application and follow the submission instructions in the form. For current details, call BLM at <a href="tel:4063293914" className="underline underline-offset-4">406-329-3914</a>.</p>
              <a href="https://www.garnetghosttown.org/assets/files/Updated_GPA-Transportation-Grant-Form.docx" className="mt-4 inline-block border-b border-[#3d5a3e] pb-1.5 text-sm font-semibold hover:text-[#3d5a3e]">Download transportation grant application (Word) ↓</a>
            </div>
          </div>
          <ActivityRow title="Investigating Garnet: A Historic Mining Town" note="Project Archaeology · Grades 3–5">
            <p>“Investigating Garnet” turns students into archaeologists and historians as they explore Montana’s preserved mining town. Developed in partnership with BLM and GPA, the curriculum blends classroom learning with on-site investigation.</p>
            <p>Best suited for grades 3–5, the lessons can be adapted for other ages. The guide includes classroom lesson plans and field activities at Garnet, so a follow-up tour will need to be scheduled.</p>
            <p>The only cost is the curriculum guide, available for $29.95 online through Project Archaeology or at Garnet’s Visitor Center Store during seasonal hours.</p>
            <a href="https://projectarchaeology.org/product/investigating-garnet-a-historic-mining-town/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border-b border-[#3d5a3e] pb-1.5 text-sm font-semibold text-[#1e2f1f] hover:text-[#3d5a3e]">View the curriculum at Project Archaeology <ArrowUpRight className="h-4 w-4 shrink-0" /></a>
            <p className="text-sm">For more information, call the BLM office at <a href="tel:4063293914" className="underline underline-offset-4">406-329-3914</a>.</p>
          </ActivityRow>
        </div>
      </section>

      <section id="trails" className="scroll-mt-28 bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="mb-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#3d5a3e] uppercase">Beyond the town</p>
            <h2 className="display-type section-heading leading-[0.98] tracking-[-0.035em]">Nature hikes &amp; trails</h2>
          </Reveal>
          <ActivityRow title="Warren Park Trail" note="Allow 2–3 hours round trip · Somewhat difficult">
            <p>Starting at the main parking lot, this trail passes through open areas, thick trees, and a small mountain spring near the remains of an old miner’s cabin before ending at Warren Park.</p>
            <p>Edward Brook Warren, an early miner who lived approximately a mile and a half from Garnet, built the trail to attract visitors to his home. His park included long picnic tables, a bench around a tree trunk, swings made from narrow poles, and a glider.</p>
            <p>More than a hundred years ago, Garnet families hiked here to picnic and enjoy the view overlooking the Blackfoot River Valley. Visitors can still make the hike and enjoy the view today.</p>
            <p className="border-l-4 border-[#a36b43] pl-5 text-sm font-semibold text-[#1e2f1f]">This trail is somewhat difficult to hike and is not wheelchair accessible.</p>
          </ActivityRow>
          <ActivityRow title="Sierra Mine Loop Trail" note="Allow about one hour · Loop from the parking lot">
            <p>Explore two old mining claims dating to 1872 and 1884: the Sierra Claim and the Forest Lode Claim. From the main parking lot, cross the road and follow the signs to the trail.</p>
            <p>Pick up the Self-Guided Interpretive Trail brochure at the Garnet Visitor Center. Match the numbered signposts along the route with the corresponding numbers in the brochure to learn about the area’s history. The loop circles back to the parking lot.</p>
          </ActivityRow>
          <ActivityRow title="Placer Trail" note="Allow about one hour · Branches from the Warren Park trail">
            <p>On the return from Warren Park, a fork offers two routes: stay left to return to the parking lot, or turn right onto the Placer Trail. The trail winds around the mountainside, crosses bridges, and passes private property and old cabins before ending at the Visitor Center in town.</p>
            <p>Placer mining was the earliest mining activity in this area. Miners washed stream gravel with water, leaving the gold behind. Along the hike, take time to listen to birds and watch for wildlife.</p>
          </ActivityRow>
          <div className="border-t border-[#0e1c27]/15 bg-[#f2eee4] p-6 md:p-8">
            <h3 className="text-lg font-semibold">Before you head out</h3>
            <p className="mt-3 max-w-3xl leading-8 text-black/72">Wear comfortable shoes and dress for changing mountain weather. Bring extra layers, such as a sweater or jacket. For current trail conditions and questions about access, contact BLM at <a href="tel:4063293914" className="underline underline-offset-4">406-329-3914</a>.</p>
          </div>
        </div>
      </section>

      <section id="special-events" className="scroll-mt-28 bg-[#f2eee4] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="mb-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#3d5a3e] uppercase">Gather in Garnet</p>
            <h2 className="display-type section-heading leading-[0.98] tracking-[-0.035em]">Special events</h2>
            <p className="mt-6 max-w-2xl leading-8 text-black/72">These programs bring visitors, volunteers, and the town’s stories together. Check the <a href="#calendar" className="underline underline-offset-4">event calendar</a> for confirmed dates and details.</p>
          </Reveal>
          <ActivityRow title="Garnet Appreciation Day" note="Each year · Early to mid-June">
            <p>Members and visitors are invited to a day of historical presentations, music, food, and children’s games and activities. Listen to stories of old Garnet, pan for gold, learn about traditional arts such as spinning and quilt making, dance to live music, or spend time exploring town.</p>
            <p>The event itself is free, but the park entrance fee applies. GPA members receive free admission; leave a copy of your membership card on your car’s dashboard. Food is available at an additional cost.</p>
            <a href="/preserve#membership" className="inline-block border-b border-[#3d5a3e] pb-1.5 text-sm font-semibold text-[#1e2f1f] hover:text-[#3d5a3e]">Membership information →</a>
          </ActivityRow>
          <ActivityRow title="Step Back in Time" note="Fall living-history program">
            <p>Garnet board members and volunteers portray characters from the town’s past. First held in fall 2026, the presentation featured inhabitants from 1917, when the United States entered the war in Europe. The time period may vary from year to year.</p>
            <p>Guided through town, visitors stop at an old home, the local saloon, Davey’s Store, and the Welles Hotel to hear about Garnet’s history. Along the way, they meet residents such as Mr. Davey and Billy Liberty.</p>
            <p>The tour is followed by a picnic lunch and entertainment from musicians playing traditional music of the early 1900s.</p>
            <p>GPA and BLM hope to make this an annual fall event. Watch this website in mid-summer for advance ticket information and event details.</p>
          </ActivityRow>
        </div>
      </section>

      <section id="family-activities" className="scroll-mt-28 bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="mb-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#3d5a3e] uppercase">Explore at your own pace</p>
            <h2 className="display-type section-heading leading-[0.98] tracking-[-0.035em]">Kids &amp; family activities</h2>
          </Reveal>
          <ActivityRow title="Self-Guided Building and Mine Tour" note="Complimentary town pamphlet">
            <p>Pick up a complimentary pamphlet at the Visitor Center with a town map showing Garnet’s old homes and businesses. It includes historical information and helps you explore at your leisure when guided tours are not available.</p>
            <p>Guided tours must be scheduled in advance. Contact the BLM office at <a href="tel:4063293914" className="underline underline-offset-4">406-329-3914</a> to arrange a tour.</p>
          </ActivityRow>
          <ActivityRow title="Scavenger Hunt" note="All ages">
            <p>With a prepared scavenger hunt list, search the Garnet area to find and identify artifacts and items of interest. The activity is suitable for all ages and is especially fun for younger visitors.</p>
            <p>Take your completed list to the Visitor Center to receive a small prize. Leave artifacts and other objects where you find them.</p>
          </ActivityRow>
          <ActivityRow title="Interpretive Signage" note="Buildings, mines & trails">
            <p>GPA and BLM have worked together to place interpretive signs throughout the area. The signs share the history of buildings, old mines, and trails, offering a closer look at Garnet’s early days and the people who lived here.</p>
          </ActivityRow>
        </div>
      </section>

      <section id="visitor-information" className="scroll-mt-28 bg-[#f2eee4] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="mb-10">
            <h2 className="display-type section-heading leading-[0.98] tracking-[-0.035em]">Additional information</h2>
          </Reveal>
          <ActivityRow title="Accessibility at Garnet">
            <p>Not all of Garnet’s historic buildings and trails are accessible to visitors with limited mobility. Some trails are not suitable for everyone, and the Welles Hotel’s second and third floors are not wheelchair accessible.</p>
            <p>For help planning a visit around your access needs, contact BLM at <a href="tel:4063293914" className="underline underline-offset-4">406-329-3914</a>.</p>
            <a href="/visit" className="inline-block border-b border-[#3d5a3e] pb-1.5 text-sm font-semibold text-[#1e2f1f] hover:text-[#3d5a3e]">Plan your visit →</a>
          </ActivityRow>
          <ActivityRow title="Preserving Garnet’s stories">
            <p>Working in partnership with BLM, GPA sponsors interpretive activities, records oral histories of past residents and their descendants, and offers educational and interpretive items in the Visitor Center Store.</p>
          </ActivityRow>
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
