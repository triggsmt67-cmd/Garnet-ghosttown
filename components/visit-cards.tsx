"use client";

import { useState } from "react";

interface RouteDirection {
  title: string;
  shortLabel: string;
  subtitle: string;
  badge: string;
  isCaution?: boolean;
  steps: string[];
  advisory: string;
}

const topics = [
  { id: "drive", num: "01", label: "Drive & seasonal access", summary: "Choose a route and know when the road is open." },
  { id: "expect", num: "02", label: "What to expect", summary: "Historic buildings, walking conditions, and services." },
  { id: "arrive", num: "03", label: "Passes & arrival", summary: "Admission, payment, parking, and the first stop." },
];

const routes: RouteDirection[] = [
  {
    title: "MT-200 from Missoula", shortLabel: "Missoula", subtitle: "I-90 Exit 109 to MT-200 East", badge: "Recommended",
    steps: [
      "Take I-90 East to Exit 109 at Bonner, then follow MT-200 East.",
      "Continue about 22 miles, then turn south just past Mile Marker 22 onto Garnet Range Road.",
      "Follow Garnet Range Road 11 miles to the upper parking area.",
    ],
    advisory: "This is the gentlest approach. The first 3.7 miles of Garnet Range Road are paved; the remainder is maintained mountain gravel.",
  },
  {
    title: "MT-200 from Seeley Lake", shortLabel: "Seeley Lake", subtitle: "Via Clearwater Junction", badge: "Recommended",
    steps: [
      "At Clearwater Junction, turn west onto MT-200 toward Missoula.",
      "Drive 7 to 8 miles and turn south onto Garnet Range Road between Mile Markers 22 and 23.",
      "Follow Garnet Range Road 11 miles to the upper parking area.",
    ],
    advisory: "This route uses the same maintained Garnet Range Road approach and is generally suitable for standard passenger vehicles when conditions permit.",
  },
  {
    title: "I-90 from Drummond", shortLabel: "Drummond", subtitle: "Bear Gulch and Cave Gulch roads", badge: "Steep & rough", isCaution: true,
    steps: [
      "Take I-90 Exit 154 at Drummond and continue through town.",
      "Use the Drummond Frontage Road to Bear Gulch Road, then follow signs toward Garnet.",
      "Bear right onto Cave Gulch Road for the final climb to the townsite.",
    ],
    advisory: "Cave Gulch has steep grades and exposed drop-offs. High clearance is recommended; use the MT-200 route if you are towing or dislike narrow mountain roads.",
  },
  {
    title: "I-90 from Bearmouth", shortLabel: "Bearmouth", subtitle: "Bear Gulch and Cave Gulch roads", badge: "No RVs or trailers", isCaution: true,
    steps: [
      "Take I-90 Exit 138 at Bearmouth and turn east on the Frontage Road.",
      "Continue 4 miles to the signed Garnet turnoff, then take Bear Gulch Road.",
      "After 4 miles, turn onto Cave Gulch Road and continue 4 miles to Garnet.",
    ],
    advisory: "This is a narrow shelf road with sharp drop-offs and steep climbs. Standard passenger vehicles should use the MT-200 approach when possible.",
  },
];

export function VisitCards() {
  const [activeTopic, setActiveTopic] = useState(0);
  const [activeRoute, setActiveRoute] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
      <nav aria-label="Visitor field guide topics" className="lg:sticky lg:top-32 lg:self-start">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {topics.map((topic, index) => {
            const isCurrent = activeTopic === index;
            return (
              <button
                key={topic.id}
                type="button"
                aria-pressed={isCurrent}
                onClick={() => setActiveTopic(index)}
                className={`border px-5 py-4 text-left transition-colors ${isCurrent ? "border-[#e0c46d] bg-[#e0c46d]/10 text-white" : "border-white/20 text-white/75 hover:border-white/40 hover:text-white"}`}
              >
                <span className="text-[0.62rem] font-bold tracking-[0.16em] text-[#e0c46d] uppercase">{topic.num}</span>
                <span className="display-type mt-1 block text-xl leading-tight">{topic.label}</span>
                <span className="mt-2 hidden text-xs leading-5 text-white/65 lg:block">{topic.summary}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="min-w-0 border border-white/15 bg-white/[0.025] p-6 sm:p-8 md:p-10">
        {activeTopic === 0 && (
          <section aria-labelledby="drive-title" className="animate-fadeIn">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#e0c46d] uppercase">Access &amp; directions</p>
            <h3 id="drive-title" className="display-type mt-2 text-4xl md:text-5xl">Choose the road before you lose service.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Wheeled vehicles are generally permitted May 1 through December 31, weather permitting. From January 1 through April 30, access is over-snow only. Always confirm current conditions before leaving pavement.
            </p>

            <div className="mt-8 flex gap-2 overflow-x-auto border-b border-white/15 pb-3">
              {routes.map((route, index) => (
                <button
                  key={route.title}
                  type="button"
                  onClick={() => setActiveRoute(index)}
                  className={`shrink-0 border px-3 py-2 text-[0.68rem] font-bold tracking-[0.1em] uppercase transition-colors ${activeRoute === index ? "border-[#e0c46d] bg-[#e0c46d] text-[#0e1c27]" : "border-white/20 text-white/72 hover:border-white/40 hover:text-white"}`}
                >
                  {route.shortLabel}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="display-type text-2xl md:text-3xl">{routes[activeRoute].title}</h4>
                  <p className="mt-1 text-xs text-white/65">{routes[activeRoute].subtitle}</p>
                </div>
                <span className={`border px-3 py-1 text-[0.65rem] font-bold tracking-[0.12em] uppercase ${routes[activeRoute].isCaution ? "border-[#a8333d]/70 bg-[#a8333d]/15 text-[#f0d47b]" : "border-white/25 text-white/72"}`}>
                  {routes[activeRoute].badge}
                </span>
              </div>

              <ol className="mt-6 space-y-4">
                {routes[activeRoute].steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[1.75rem_1fr] gap-3 text-sm leading-6 text-white/75">
                    <span className="display-type text-xl text-[#e0c46d]">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-l-2 border-[#e0c46d] pl-4 text-xs leading-6 text-white/70">{routes[activeRoute].advisory}</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=46.82559,-113.33945" target="_blank" rel="noreferrer" className="mt-6 inline-flex text-xs font-bold tracking-[0.12em] text-[#e0c46d] uppercase underline underline-offset-8">
                Open destination in Google Maps ↗
              </a>
            </div>
          </section>
        )}

        {activeTopic === 1 && (
          <section aria-labelledby="expect-title" className="animate-fadeIn">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#e0c46d] uppercase">At the townsite</p>
            <h3 id="expect-title" className="display-type mt-2 text-4xl md:text-5xl">Historic, walkable, and intentionally off-grid.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Garnet is a preserved town, not a recreated attraction. Plan two to four hours to walk the streets, enter open buildings, read interpretive signs, and explore nearby trails.
            </p>

            <div className="mt-8 grid gap-px bg-white/15 sm:grid-cols-2">
              {[
                ["A preserved townsite", "Historic buildings are stabilized in their existing condition, with seasonal access to staffed landmarks."],
                ["Uneven walking surfaces", "Expect gravel, stairs, weathered boards, and rocky paths rather than paved walkways."],
                ["No concessions or fuel", "Bring food, drinking water, and a full tank or charge. There is no repair service on the mountain."],
                ["No cellular service", "Download maps, passes, and anything else you need before beginning the mountain road."],
              ].map(([title, copy]) => (
                <div key={title} className="bg-[#101f2b] p-5 sm:p-6">
                  <h4 className="display-type text-2xl text-white">{title}</h4>
                  <p className="mt-2 text-xs leading-6 text-white/70">{copy}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTopic === 2 && (
          <section aria-labelledby="arrive-title" className="animate-fadeIn">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#e0c46d] uppercase">Admission &amp; arrival</p>
            <h3 id="arrive-title" className="display-type mt-2 text-4xl md:text-5xl">Park high, pay once, then walk into town.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Use the upper ridge lot and walk roughly a quarter mile downhill to the townsite. Do not drive into town, especially when spring or autumn ice makes the return climb hazardous.
            </p>

            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {[
                ["Ages 16 and older", "$10 admission"],
                ["Visitors under 16", "Free"],
                ["America the Beautiful pass", "Passholder plus up to 3 additional adults"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-sm text-white/70">{label}</span>
                  <span className="display-type text-2xl text-white">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="border border-white/15 p-5">
                <p className="text-[0.62rem] font-bold tracking-[0.14em] text-[#e0c46d] uppercase">Payment</p>
                <p className="mt-2 text-sm leading-6 text-white/75">Use the parking-lot kiosk, a cash envelope, or Recreation.gov. Print a prepaid receipt for your dashboard.</p>
              </div>
              <div className="border border-white/15 p-5">
                <p className="text-[0.62rem] font-bold tracking-[0.14em] text-[#e0c46d] uppercase">First stop</p>
                <p className="mt-2 text-sm leading-6 text-white/75">Walk down to the visitor area for current building access, trail information, and seasonal interpretation.</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
