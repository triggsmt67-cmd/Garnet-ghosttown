import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CtaLink } from "@/components/cta-link";
import { HomeHero } from "@/components/home-hero";
import { SeasonalFieldGuide } from "@/components/seasonal-field-guide";
import { EventBanner } from "@/components/event-banner";
import { getEvents, getRoadReport, pickHomepageEvent } from "@/lib/content";
import { eventSchema, jsonLd } from "@/lib/content/schema";

// Re-render at least every 2 minutes so road-report staleness and past-event
// cutoffs are re-evaluated even between WordPress webhooks.
export const revalidate = 120;

const placeSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Garnet Ghost Town",
  url: "https://garnetghosttown.org/",
  description:
    "A preserved historic mining town in the Garnet Mountains east of Missoula, Montana.",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.82559,
    longitude: -113.33945,
  },
  isAccessibleForFree: false,
  publicAccess: true,
};

export default async function Home() {
  const [{ data: events }, roadReport] = await Promise.all([getEvents(), getRoadReport()]);
  const homepageEvent = pickHomepageEvent(events);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(placeSchema) }}
      />
      {homepageEvent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(eventSchema(homepageEvent)) }}
        />
      )}

      <HomeHero roadReport={roadReport} />

      <EventBanner event={homepageEvent} />

      <section className="overflow-hidden bg-[#f2eee4] px-5 py-16 md:px-10 md:py-36">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div className="lg:sticky lg:top-32">
              <h2 className="display-type text-[clamp(2.5rem,7vw,6rem)] leading-[.92] tracking-[-0.04em]">
                You can walk into rooms unchanged since 1898.
              </h2>
              <p className="mt-8 max-w-md text-lg leading-8 text-black/62">
                Not a reconstruction. Not a museum with roped-off displays. Garnet&apos;s
                hotel, saloons, schoolhouse, and cabins are still where the mining community
                built them — open to walk through, step inside, and spend time in.
              </p>
              <div className="mt-9">
                <CtaLink href="/history">Read how the town survived</CtaLink>
              </div>
            </div>

            <div>
              <div className="image-reveal relative aspect-[4/5] overflow-hidden bg-[#0e1c27]">
                <Image
                  src="/images/garnet-interior.png"
                  alt="Sunlight crossing the preserved wooden interior of a Garnet building"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover sepia-[.32] saturate-[.72] contrast-[1.08]"
                />
              </div>
              <p className="mt-4 max-w-lg text-sm leading-6 text-black/48">
                Inside the Wells Hotel, ordinary rooms and worn wood make the scale of
                daily life easier to understand than any display case ever could.
              </p>
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-24 max-w-5xl border-t border-[#0e1c27]/25 pt-16 text-center md:mt-32 md:pt-24 pb-12">
            <p className="display-type italic text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[1.05] tracking-tight text-[#18202a]">
              “In <span className="text-[#3d5a3e]">1898</span>, nearly <span className="text-[#3d5a3e]">1,000</span> people lived here. They built hotels, stores, a
              school, and thirteen saloons before the mines slowed and families left.”
            </p>
          </Reveal>
        </div>
      </section>

      <section className="paper-grain overflow-hidden bg-[#0e1c27] text-[#f8f6f1]">
        <div className="mx-auto grid max-w-[90rem] lg:min-h-[52rem] lg:grid-cols-[1.08fr_.92fr]">
          <Reveal className="relative min-h-[24rem] sm:min-h-[34rem] lg:min-h-full">
            <Image
              src="/images/garnet-visitors.png"
              alt="A family walking along the historic street between Garnet's timber buildings"
              fill
              unoptimized
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover sepia-[.22] saturate-[.76] contrast-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1218]/55 via-transparent to-transparent" />
            <p className="absolute inset-x-6 bottom-6 z-10 max-w-lg text-sm leading-6 text-white/68 md:inset-x-10 md:bottom-9">
              Allow two or three hours for the historic street, building interiors, and
              nearby trails.
            </p>
          </Reveal>

          <div className="flex items-center px-5 py-16 md:px-14 lg:px-16 xl:px-20">
            <Reveal>
              <h2 className="display-type text-4xl leading-[.96] tracking-[-0.035em] md:text-7xl">
                Spend the first hour on Main Street.
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-8 text-white/65">
                Begin with the Wells Hotel, Kelly&apos;s Saloon, the schoolhouse, and the
                cabins along the commercial street. Open doors lead into rooms that
                still hold the shape of work, meals, sleep, and celebration.
              </p>
              <p className="mt-5 max-w-lg leading-8 text-white/52">
                When the buildings begin to make sense, follow one of the mining trails
                into the forest. Most are under two miles and require no permit — but the
                terrain is uneven and the landscape explains exactly why the town was built
                here, and why getting here still feels remote.
              </p>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
                <CtaLink href="/explore" light>
                  Explore the town
                </CtaLink>
                <Link
                  href="/explore#town-map"
                  className="inline-flex items-center border-b border-white/35 pb-2 text-sm font-semibold text-white/78 transition-colors hover:border-white hover:text-white"
                >
                  Open the building map
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="conditions"
        className="scroll-mt-28 overflow-hidden bg-[#f2eee4] px-5 py-16 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end lg:gap-24">
            <h2 className="display-type text-4xl leading-[.97] tracking-[-0.035em] md:text-7xl">
              Make the last decisions while you still have service.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-black/60 lg:pb-2">
              Garnet&apos;s remoteness is part of the visit. It also means your pass,
              route, fuel, water, and parking plan should be settled before the final
              mountain miles.
            </p>
          </Reveal>

          <Reveal className="mt-14 grid overflow-hidden border border-[#0e1c27]/18 bg-white shadow-[0_28px_75px_rgba(13,18,24,.08)] lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative overflow-hidden bg-[#3d5a3e] px-7 py-10 text-white md:px-12 md:py-14">
              <div className="absolute right-[-5rem] top-[-5rem] h-64 w-64 rounded-full border border-white/12" />
              <div className="relative">
                <h3 className="display-type max-w-lg text-[clamp(2.2rem,6vw,4.8rem)] leading-[.96] tracking-[-0.035em]">
                  $10 for visitors age 16 and older.
                </h3>
                <p className="mt-5 text-base text-white/68">
                  Visitors younger than 16 enter free.
                </p>
                <p className="mt-9 max-w-md leading-7 text-white/78">
                  Purchase your day pass before leaving reliable cell service, and
                  print a paper copy to place on your vehicle dashboard. A standard pass covers
                  admission; special living history events require a separate ticket.
                </p>
                <a
                  href="https://www.recreation.gov/activitypass/AP23157"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-4 bg-[#f8f6f1] px-5 py-4 text-sm font-semibold text-[#18202a] transition-[background,transform] hover:-translate-y-1 hover:bg-white"
                >
                  Get the Recreation.gov pass
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>

            <div className="px-7 py-4 md:px-12 md:py-8">
              <dl>
                <div className="grid gap-3 border-b border-[#0e1c27]/15 py-7 md:grid-cols-[9rem_1fr] md:gap-8">
                  <dt className="display-type text-2xl text-[#1e2f1f]">Parking</dt>
                  <dd className="leading-7 text-black/60">
                    Spaces are limited. Arrive early on summer weekends and carpool
                    when you can; prepaid admission does not reserve a parking space.
                  </dd>
                </div>
                <div className="grid gap-3 border-b border-[#0e1c27]/15 py-7 md:grid-cols-[9rem_1fr] md:gap-8">
                  <dt className="display-type text-2xl text-[#1e2f1f]">No services</dt>
                  <dd className="leading-7 text-black/60">
                    There is no cell coverage, food concessions, fuel, or running tap water at Garnet.
                    Bring drinking water and snacks, fill your gas tank or EV charge in
                    Missoula, Bonner, or Drummond, and download offline maps.
                  </dd>
                </div>
                <div className="grid gap-3 py-7 md:grid-cols-[9rem_1fr] md:gap-8">
                  <dt className="display-type text-2xl text-[#1e2f1f]">The road</dt>
                  <dd className="leading-7 text-black/60">
                    Approach from Highway 200 at Mile Marker 22 via Garnet Range Road (11 miles).
                    The first 3.7 miles are paved; the remaining 7.3 miles are gravel. RVs and
                    trailers should avoid the narrow, steep cliff drop-offs of Cave Gulch from I-90.
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#0e1c27]/15 py-7">
                <Link
                  href="/visit"
                  className="inline-flex border-b border-[#3d5a3e] pb-2 text-sm font-semibold"
                >
                  Read the complete visitor guide
                </Link>
                <a
                  href="tel:4063293914"
                  className="text-sm font-semibold text-black/55 underline decoration-black/20 underline-offset-4"
                >
                  BLM Missoula Field Office · 406.329.3914
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SeasonalFieldGuide />

    </main>
  );
}
