import Link from "next/link";
import type { GarnetEvent } from "@/lib/content/types";
import { formatEventDate, formatEventDayTime } from "@/lib/content/time";
import { EventStatusBadge, formatEventPrice } from "./event-meta";
import { ArrowRight, ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

/** Homepage event strip with clear section branding and calendar navigation. */
export function EventBanner({ event }: { event: GarnetEvent | null }) {
  if (!event) {
    return (
      <section
        id="events"
        className="scroll-mt-28 border-b border-white/10 bg-[#1e2f1f] px-5 py-12 text-[#f8f6f1] md:px-10 md:py-16"
      >
        <div className="mx-auto flex max-w-[82rem] flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Living History &amp; Gatherings
            </span>
            <h2 className="display-type mt-1 text-2xl text-white md:text-3xl">
              Upcoming Events at Garnet
            </h2>
            <p className="mt-1 text-sm text-white/60">
              No special public events are currently scheduled. The townsite and hiking trails remain open year-round.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-3 border-b border-[#d3b350] pb-2 text-sm font-semibold text-[#f8f6f1] transition-colors hover:text-[#e0c46d]"
          >
            Education &amp; events calendar
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    );
  }

  const inactive = event.status === "cancelled" || event.status === "postponed";
  const isExternal = Boolean(event.detailsUrl && event.detailsUrl.startsWith("http"));

  return (
    <section
      id="events"
      className="scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#1e2f1f] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[82rem]">
        {/* Section Header */}
        <Reveal className="mb-8 flex flex-col gap-4 border-b border-white/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Featured Event · Living History
            </span>
            <h2 className="display-type mt-1 text-3xl leading-tight text-white md:text-4xl">
              Upcoming Events at Garnet
            </h2>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-white/70 transition-colors hover:text-[#e0c46d]"
          >
            View full event calendar
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Featured Event Card */}
        <Reveal className="grid items-center gap-8 lg:grid-cols-[.68fr_1.45fr_auto] lg:gap-12">
          <time
            dateTime={event.startDate}
            className={`display-type border-b border-white/15 pb-7 text-3xl leading-[1.05] text-[#e0c46d] lg:border-r lg:border-b-0 lg:py-2 lg:pr-10 ${
              inactive ? "line-through decoration-2 opacity-60" : ""
            }`}
          >
            {formatEventDate(event.startDate)}
            <span className="mt-2 block font-sans text-xs font-semibold tracking-[0.08em] text-white/52">
              {formatEventDayTime(event.startDate)}
            </span>
          </time>

          <div>
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="display-type text-4xl leading-none tracking-[-0.025em] md:text-5xl">
                {event.title}
              </h3>
              <EventStatusBadge status={event.status} />
            </div>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">{event.homepageSummary}</p>
            {event.accessAdvisory && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#e0c46d]">
                {event.accessAdvisory}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-8 border-t border-white/15 pt-7 lg:block lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div>
              <p className="display-type text-2xl">{formatEventPrice(event)}</p>
              {event.priceNote && <p className="mt-1 text-xs text-white/48">{event.priceNote}</p>}
            </div>
            <Link
              href={event.detailsUrl ?? "/events"}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="group mt-0 inline-flex shrink-0 items-center gap-3 border-b border-[#d3b350] pb-2 text-sm font-semibold lg:mt-5"
            >
              {event.registrationRequired ? "Register" : "Event details & tickets"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
