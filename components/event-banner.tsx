import Link from "next/link";
import type { GarnetEvent } from "@/lib/content/types";
import { formatEventDate, formatEventDayTime } from "@/lib/content/time";
import { EventStatusBadge, formatEventPrice } from "./event-meta";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

/** Homepage event strip. Renders a quiet empty state when nothing is scheduled. */
export function EventBanner({ event }: { event: GarnetEvent | null }) {
  if (!event) {
    return (
      <section
        id="events"
        className="scroll-mt-28 border-b border-white/10 bg-[#1e2f1f] px-5 py-10 text-[#f8f6f1] md:px-10"
      >
        <div className="mx-auto flex max-w-[82rem] flex-wrap items-center justify-between gap-6">
          <p className="display-type text-2xl text-white/80">
            No upcoming events currently scheduled.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-3 border-b border-[#d3b350] pb-2 text-sm font-semibold"
          >
            Education &amp; events
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    );
  }

  const inactive = event.status === "cancelled" || event.status === "postponed";

  return (
    <section
      id="events"
      className="scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#1e2f1f] px-5 py-14 text-[#f8f6f1] md:px-10 md:py-16"
    >
      <Reveal className="mx-auto grid max-w-[82rem] items-center gap-8 lg:grid-cols-[.68fr_1.45fr_auto] lg:gap-12">
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
            <h2 className="display-type text-4xl leading-none tracking-[-0.025em] md:text-5xl">
              {event.title}
            </h2>
            <EventStatusBadge status={event.status} />
          </div>
          <p className="mt-4 max-w-2xl leading-7 text-white/62">{event.homepageSummary}</p>
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
            target={event.detailsUrl ? "_blank" : undefined}
            rel={event.detailsUrl ? "noreferrer" : undefined}
            className="group mt-0 inline-flex shrink-0 items-center gap-3 border-b border-[#d3b350] pb-2 text-sm font-semibold lg:mt-5"
          >
            {event.registrationRequired ? "Register" : "Event details"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
