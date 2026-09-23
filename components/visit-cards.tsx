"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/icons";

interface RouteDirection {
  title: string;
  subtitle: string;
  badge?: string;
  isCaution?: boolean;
  steps: string[];
  advisory?: string;
}

export function VisitCards() {
  const [activeTopic, setActiveTopic] = useState<number>(0);
  const [activeRoute, setActiveRoute] = useState<number>(0);

  const topics = [
    {
      id: "road",
      num: "01",
      buttonLabel: "The Road to Garnet",
      badge: "Access & 4 Routes",
      title: "The Road to Garnet",
      subtitle: "Seasonal vehicle access, mountain road caution, and turn-by-turn routes.",
    },
    {
      id: "buildings",
      num: "02",
      buttonLabel: "What’s There",
      badge: "29 Preserved Buildings",
      title: "What’s There",
      subtitle: "Arrested decay, self-guided exploration, and 5 seasonally staffed landmark buildings.",
    },
    {
      id: "activities",
      num: "03",
      buttonLabel: "What Can We Do",
      badge: "Activities & Trails",
      title: "What Can We Do",
      subtitle: "Walking tours, scavenger hunts, mountain geocaching, and historic hiking loops.",
    },
    {
      id: "bring",
      num: "04",
      buttonLabel: "What to Bring",
      badge: "Gear & Bear Safety",
      title: "What to Bring",
      subtitle: "Unpredictable mountain weather, food and water essentials, and bear spray.",
    },
    {
      id: "notThere",
      num: "05",
      buttonLabel: "What’s Not There",
      badge: "Off-Grid Realities",
      title: "What’s Not There",
      subtitle: "Zero cell service, no gas or commercial stores, and rustic facilities.",
    },
    {
      id: "cost",
      num: "06",
      buttonLabel: "Cost & Passes",
      badge: "Admission & Memberships",
      title: "Cost & Passes",
      subtitle: "BLM admission rates, payment methods, America the Beautiful passes, and GPA tiers.",
    },
  ];

  const routes: RouteDirection[] = [
    {
      title: "MT-200 from Missoula",
      subtitle: "Via I-90 Exit 109 & MT-200 East to Garnet Range Rd · Recommended",
      badge: "Recommended",
      isCaution: false,
      steps: [
        "From Missoula, take I-90 East to Exit 109 (Milltown / Bonner), then merge onto Highway 200 East.",
        "Drive east on Highway 200 for approximately 22 miles past Bonner and Potomac.",
        "Immediately past Mile Marker 22 (before Clearwater Junction), turn right (south) onto Garnet Range Road.",
        "Climb Garnet Range Road for 11 miles up to the ghost town parking area.",
      ],
      advisory:
        "Road profile: The first 3.7 miles are paved; the remaining 7.3 miles are well-maintained mountain gravel with occasional washboarding. Passable for all standard passenger vehicles.",
    },
    {
      title: "MT-200 from Seeley Lake",
      subtitle: "From Clearwater Junction (the giant steer statue) · Recommended",
      badge: "Recommended",
      isCaution: false,
      steps: [
        "At Clearwater Junction (intersection of MT-83 and MT-200, marked by the giant steer statue), turn right (west) toward Missoula onto Highway 200.",
        "Drive west on Highway 200 for approximately 7 to 8 miles.",
        "Turn left (south) onto Garnet Range Road, located between Mile Markers 22 and 23.",
        "Follow Garnet Range Road 11 miles up to the ghost town parking area.",
      ],
      advisory:
        "Road profile: Same 11-mile Garnet Range Road ascent (first 3.7 miles paved, remaining 7.3 miles gravel). Standard passenger car accessible.",
    },
    {
      title: "I-90 Westbound (Drummond)",
      subtitle: "From Deer Lodge / Butte / Helena · High-clearance recommended",
      badge: "Steep & Rough",
      isCaution: true,
      steps: [
        "Traveling west on I-90, take Exit 154 at Drummond and proceed through town.",
        "Turn right onto the Drummond Frontage Road and travel ~11 miles (or ~6 miles past the first sign) to Bear Gulch Road.",
        "Turn right onto Bear Gulch Road, drive 4 miles, then bear right onto Cave Gulch Road toward Garnet.",
        "Follow Cave Gulch Road 4 miles up to the ghost town.",
      ],
      advisory:
        "Mountain driving advisory: Cave Gulch is a rough mountain track with steep grades and sheer, unguarded drop-offs on the left. If you are uncomfortable with steep mountain roads or are towing trailers, take the gentler Highway 200 / Garnet Range Road route instead.",
    },
    {
      title: "I-90 Eastbound (Bearmouth)",
      subtitle: "From Missoula via Bearmouth exit · High-clearance recommended",
      badge: "No RVs or Trailers",
      isCaution: true,
      steps: [
        "Head east on I-90 toward Butte and take Exit 138 (Bearmouth).",
        "Cross under the interstate, stop at the stop sign, and turn right onto the Frontage Road heading east.",
        "Follow the Frontage Road for 4 miles to the signed Garnet Ghost Town turnoff.",
        "Turn left onto Bear Gulch Road for 4 miles, then turn right onto Cave Gulch Road for 4 miles to town.",
      ],
      advisory:
        "Mountain driving advisory: Narrow, single-lane shelf road with sharp drop-offs on the left and steep climbs. Not recommended for trailers, RVs, or nervous drivers. Standard passenger vehicles should use the Highway 200 / Garnet Range Road route.",
    },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[.38fr_.62fr] lg:gap-16">
      {/* ========================================================================= */}
      {/* LEFT COLUMN: INDEX MENU (Master) */}
      {/* ========================================================================= */}
      <nav aria-label="Visitor field guide topics" className="lg:sticky lg:top-32 lg:self-start">
        <p className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
          Visitor Guide Topics
        </p>
        <p className="mt-1 text-xs text-white/50">
          Select a topic below to review complete visitor details.
        </p>

        {/* Desktop & Tablet Vertical Topic Ledger */}
        <div className="mt-6 divide-y divide-white/10 border-y border-white/15">
          {topics.map((t, idx) => {
            const isCurrent = idx === activeTopic;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTopic(idx);
                  const panel = document.getElementById("field-guide-panel");
                  if (panel && window.innerWidth < 1024) {
                    panel.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`group flex w-full items-start justify-between py-5 text-left transition-colors ${
                  isCurrent ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <div className="pr-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`display-type text-2xl transition-colors ${
                        isCurrent ? "text-[#e0c46d]" : "text-white/35 group-hover:text-[#e0c46d]"
                      }`}
                    >
                      {t.num}
                    </span>
                    <span className="display-type text-xl md:text-2xl">{t.buttonLabel}</span>
                  </div>
                  <p className="mt-1 pl-8 text-xs text-white/45 leading-relaxed line-clamp-1">
                    {t.badge}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className={`mt-3 h-px shrink-0 transition-all duration-300 ${
                    isCurrent ? "w-12 bg-[#e0c46d]" : "w-4 bg-white/20 group-hover:w-8 group-hover:bg-white/50"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: READING STAGE (Detail) */}
      {/* ========================================================================= */}
      <div id="field-guide-panel" className="border border-white/15 bg-white/[0.02] p-8 md:p-14">
        {/* TOPIC 01: THE ROAD TO GARNET */}
        {activeTopic === 0 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">01</span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  Access &amp; Driving Routes
                </span>
              </div>
              <h3 className="display-type mt-4 text-3xl md:text-5xl">The Road to Garnet</h3>
              <p className="mt-4 text-base leading-7 text-white/70">
                Garnet Ghost Town is open year-round at 6,000 feet, but mountain conditions dictate the journey.
                Wheeled vehicle access is permitted from <strong>May 1 through December 31</strong> (weather
                permitting). The road closes to all wheeled vehicles from <strong>January 1 to April 30</strong>,
                when access is strictly over-snow via snowmobile, cross-country skis, or snowshoes.
              </p>
            </div>

            {/* Warnings */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="border-l-2 border-[#a8333d] bg-white/[0.03] p-5">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Spring &amp; Fall Ice Caution
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  In spring and late autumn, the steep road descending from the ridge directly into town becomes
                  a sheet of glare ice. <strong>Park in the main lot at the top of the hill and walk down.</strong>{" "}
                  Visitors driving down into town may not be able to drive back out due to ice. Towing services from
                  Garnet are extremely expensive and hard to arrange.
                </p>
              </div>

              <div className="border-l-2 border-[#e0c46d] bg-white/[0.03] p-5">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Winter Over-Snow Access
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  From January 1 through April 30, the town is reachable only by snowmobile, snowshoes, or
                  cross-country skis. Access is 11 miles from Highway 200 and 4 miles uphill from the Bearmouth winter
                  parking area (4 miles off I-90). Winter cabin renters typically come up the Bearmouth side.
                </p>
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-5 text-xs text-white/70 leading-relaxed">
              <strong>Zero Cellular Service:</strong> There is no cell service around the ghost town. Check the
              live road status on our front page before leaving pavement, and save your map and confirmation number offline.
            </div>

            {/* Turn-by-Turn Tabs */}
            <div className="pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2">
                <h4 className="display-type text-2xl text-[#e0c46d]">Turn-by-Turn Driving Directions</h4>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=46.82559,-113.33945"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-white/50 hover:text-[#e0c46d]"
                >
                  Open in Google Maps ↗
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-b border-white/15 pb-2">
                {routes.map((r, i) => (
                  <button
                    key={r.title}
                    type="button"
                    onClick={() => setActiveRoute(i)}
                    className={`pb-2 text-xs font-bold tracking-[0.12em] uppercase transition-colors border-b-2 ${
                      activeRoute === i
                        ? "border-[#e0c46d] text-[#e0c46d]"
                        : "border-transparent text-white/45 hover:text-white"
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 border border-white/10 bg-white/[0.02] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h5 className="display-type text-xl text-white">{routes[activeRoute].title}</h5>
                    <p className="text-xs text-white/50">{routes[activeRoute].subtitle}</p>
                  </div>
                  {routes[activeRoute].badge && (
                    <span
                      className={`rounded-full px-3 py-1 text-[0.62rem] font-bold tracking-[0.12em] uppercase border ${
                        routes[activeRoute].isCaution
                          ? "border-[#a8333d]/60 text-[#e0c46d] bg-[#a8333d]/15"
                          : "border-white/20 text-white/60"
                      }`}
                    >
                      {routes[activeRoute].badge}
                    </span>
                  )}
                </div>

                <ol className="mt-5 space-y-3">
                  {routes[activeRoute].steps.map((st, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3 text-xs leading-relaxed text-white/80">
                      <span className="display-type text-base text-[#e0c46d] shrink-0">{sIdx + 1}.</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>

                {routes[activeRoute].advisory && (
                  <div className="mt-5 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/60">
                    <strong>Advisory:</strong> {routes[activeRoute].advisory}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 02: WHAT'S THERE */}
        {activeTopic === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">02</span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  29 Preserved Buildings
                </span>
              </div>
              <h3 className="display-type mt-4 text-3xl md:text-5xl">What’s There</h3>
              <p className="mt-4 text-base leading-7 text-white/70">
                There are <strong>29 historic buildings remaining</strong> in Garnet. The town is maintained in
                a state of <em>&ldquo;arrested decay&rdquo;</em>—which means the buildings are stabilized, preserved,
                and protected in their existing historical condition, rather than sanitized or falsely restored.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-6 space-y-3">
              <h4 className="display-type text-2xl text-[#e0c46d]">Wander the Historic Townsite</h4>
              <p className="text-sm leading-relaxed text-white/75">
                Many of the buildings are open year-round and most of these do not have doors or windows.
                Visitors are encouraged to wander around the town, going in and out of the old buildings and
                imagining the lives of the families that lived in them. Interpretive signs stand outside many
                of the buildings, offering glimpses into Garnet’s boom-town past.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2">
                <h4 className="display-type text-2xl text-white">Five Seasonally Staffed Buildings</h4>
                <span className="text-xs text-[#e0c46d]">10:00 a.m. – 4:30 p.m. Daily</span>
              </div>
              <p className="mt-2 text-xs text-white/50">
                Open during the summer and fall months (subject to ranger staffing and weather conditions):
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "Kelly’s Saloon",
                    detail: "The historic social center of town with its original wooden bar counter and backroom.",
                  },
                  {
                    name: "Davey’s Store",
                    detail: "The primary commercial mercantile that supplied miners with dry goods, food, and blasting powder.",
                  },
                  {
                    name: "The Wells Hotel",
                    detail: "Garnet’s landmark two-story hotel featuring the original dining room, parlor, and guest rooms.",
                  },
                  {
                    name: "The Adams House",
                    detail: "An intact family home illustrating frontier domestic life, furnishings, and hardships at 6,000 feet.",
                  },
                  {
                    name: "The Schoolhouse",
                    detail: "The historic one-room school where Garnet’s children gathered for classes until 1936.",
                  },
                ].map((b) => (
                  <div key={b.name} className="border border-white/10 bg-white/[0.02] p-5">
                    <h5 className="display-type text-xl text-white">{b.name}</h5>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">{b.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 03: WHAT CAN WE DO */}
        {activeTopic === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">03</span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  Activities &amp; Trails
                </span>
              </div>
              <h3 className="display-type mt-4 text-3xl md:text-5xl">What Can We Do</h3>
              <p className="mt-4 text-base leading-7 text-white/70">
                Exploring the town can easily take <strong>several hours</strong>, depending on how much time you
                spend inside the buildings. For many visitors, simply wandering the quiet streets is enough, but
                there are several active ways to experience the town and surrounding mountains.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Interpretation
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">Self-Guided Tour</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Pick up the self-guided tour brochure at the visitor center or print it from home before your trip.
                  Numbered markers guide you through historical highlights and former business sites.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Families &amp; Youth
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">Scavenger Hunt</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  A fun, family-friendly scavenger hunt printable from home to keep kids engaged searching for
                  architectural details, antique tools, and period relics around the townsite.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  GPS Exploration
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">Geocaching</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Public lands around Garnet feature active geocaches. Download cache coordinates and offline maps
                  to your GPS device before you leave highway coverage.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Hiking Trails
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">Historic Mine Loops</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Hike the <strong>Sierra Mine Loop</strong> through old mine adits, follow the <strong>Placer Trail</strong>{" "}
                  along the creek, or walk the <strong>Warren Park Trail</strong> to an old miner’s cabin and picnic grounds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 04: WHAT TO BRING */}
        {activeTopic === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">04</span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  Gear &amp; Bear Safety
                </span>
              </div>
              <h3 className="display-type mt-4 text-3xl md:text-5xl">What to Bring</h3>
              <p className="mt-4 text-base leading-7 text-white/70">
                In the spring and summer, visitors are often surprised at how cold the mountains can be. Snow has fallen
                here in <strong>June and July</strong>. Because there is <strong>no place to buy food or drinks</strong> in
                Garnet today, preparation is essential.
              </p>
            </div>

            <div className="space-y-5">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <h4 className="display-type text-2xl text-[#e0c46d]">Clothing Layers &amp; Footwear</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  As with many parts of Montana, weather shifts quickly and frequently. Bring warm clothing layers,
                  a wind/waterproof shell, and sturdy shoes with traction for walking rough, unpaved dirt lanes and boardwalks.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <h4 className="display-type text-2xl text-[#e0c46d]">Pack All Food &amp; Drinking Water</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  Davey’s Store closed in 1947 and although one bar stayed open until the 1960s, no businesses remain open
                  today. Plan to bring your own drinking water, snacks, and picnics. There are many beautiful spots around
                  town to relax, eat, and take in the mountain scenery.
                </p>
              </div>

              <div className="border-l-2 border-[#e0c46d] bg-white/[0.03] p-6">
                <h4 className="display-type text-2xl text-[#e0c46d]">Be Bear Aware &amp; Pack Bear Spray</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/80">
                  Garnet is an area that black bears and grizzly bears frequent. Always carry EPA-approved bear spray
                  where you can reach it quickly (on your hip or chest). During the summer months, bear-proof dumpsters
                  are located up near the main parking lot. You are encouraged to throw all trash into them or pack it out.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 05: WHAT'S NOT THERE */}
        {activeTopic === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">05</span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  Off-Grid Realities
                </span>
              </div>
              <h3 className="display-type mt-4 text-3xl md:text-5xl">What’s Not There</h3>
              <p className="mt-4 text-base leading-7 text-white/70">
                Garnet is an off-grid historic sanctuary preserved without commercialization. Knowing what isn’t on the
                mountain will make your visit effortless.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Communication
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">No Cell Service</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  There is no cell service in Garnet and just a few spots on the Garnet Range Road provide any signal.
                  Do not plan on being able to call or use the internet—it likely will not work. Download maps and passes before leaving.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Services
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">No Fuel or Concessions</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  There are no gas stations, EV charging stations, cafes, or supply stores. Fill your gas tank in Bonner,
                  Potomac, or Drummond before beginning the 11-mile gravel climb.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6 sm:col-span-2">
                <span className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#e0c46d]">
                  Restrooms
                </span>
                <h4 className="display-type mt-2 text-2xl text-white">Public Vault Toilets</h4>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Clean public vault toilets are located at the main parking lot and near the visitor center. There is no
                  running tap water or indoor plumbing in the historic buildings.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 06: COST & PASSES */}
        {activeTopic === 5 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between">
                <span className="display-type text-5xl text-[#e0c46d]">06</span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/55">
                  Admission &amp; Memberships
                </span>
              </div>
              <h3 className="display-type mt-4 text-3xl md:text-5xl">Cost</h3>
              <p className="mt-4 text-base leading-7 text-white/70">
                Garnet is located on federal public lands managed by the Missoula Field Office of the Bureau of Land
                Management with support from the Garnet Preservation Association. Admission is <strong>$10 per adult (16 and older)</strong>,
                and <strong>children under 16 enter free</strong>.
              </p>
            </div>

            {/* Payment Options */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2">
                <h4 className="display-type text-2xl text-[#e0c46d]">Three Ways to Pay on Site</h4>
                <a
                  href="https://www.recreation.gov/activitypass/AP23157"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-white/50 hover:text-[#e0c46d]"
                >
                  Rec.gov Pass ↗
                </a>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <h5 className="display-type text-xl text-white">Tap-to-Pay</h5>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Electronic pay station in the parking lot accepts contactless credit and debit cards.
                  </p>
                </div>
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <h5 className="display-type text-xl text-white">Recreation.gov</h5>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Prepay online before you drive. <em>Important: Print a paper copy of your receipt to place on your dashboard.</em>
                  </p>
                </div>
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <h5 className="display-type text-xl text-white">Cash or Check</h5>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    Self-service fee envelopes are available at the fee box iron ranger kiosk.
                  </p>
                </div>
              </div>
            </div>

            {/* America the Beautiful */}
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="display-type text-2xl text-white">America the Beautiful Federal Passes</h4>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[0.62rem] font-bold tracking-wider text-[#e0c46d] uppercase">
                  Admits Up to 4 Adults
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                We honor the Annual, Senior / Lifetime, Access, and Military America the Beautiful passes. A passholder
                can bring up to <strong>three additional people</strong> (up to four people total enter free). Leave your
                pass on your dash so rangers can verify your pass.
              </p>
            </div>

            {/* GPA Memberships */}
            <div>
              <h4 className="display-type text-2xl text-[#e0c46d]">Garnet Preservation Association Cards</h4>
              <p className="mt-1 text-xs text-white/60">
                GPA membership cards also gain free entrance into Garnet. Family membership gives free entrance to the
                cardholder’s immediate family. Make sure you print a copy of your card and place it on your dashboard.
              </p>

              <div className="mt-4 border-t border-b border-white/15 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-[0.62rem] font-bold tracking-[0.14em] uppercase text-white/45">
                      <th className="py-2.5 pr-4">Membership Level</th>
                      <th className="py-2.5 px-4">Cost</th>
                      <th className="py-2.5 pl-4">Benefits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-white">Individual</td>
                      <td className="py-2.5 px-4 text-[#e0c46d]">$20 / year</td>
                      <td className="py-2.5 pl-4 text-white/60">Free entrance for cardholder</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-white">Family</td>
                      <td className="py-2.5 px-4 text-[#e0c46d]">$30 / year</td>
                      <td className="py-2.5 pl-4 text-white/60">Free entrance for cardholder + immediate family</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-white">Sponsor</td>
                      <td className="py-2.5 px-4 text-[#e0c46d]">$50 / year</td>
                      <td className="py-2.5 pl-4 text-white/60">Free entrance + preservation support</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-white">Benefactor</td>
                      <td className="py-2.5 px-4 text-[#e0c46d]">$100 / year</td>
                      <td className="py-2.5 pl-4 text-white/60">Free entrance + major preservation contribution</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-semibold text-white">Lifetime</td>
                      <td className="py-2.5 px-4 text-[#e0c46d]">$500</td>
                      <td className="py-2.5 pl-4 text-white/60">Lifetime free access for cardholder &amp; family</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-l-2 border-[#3d5a3e] bg-white/[0.02] p-4 text-xs leading-relaxed text-white/80">
              <strong>100% Reinvested in Garnet:</strong> All moneys generated in Garnet Ghost Town are used in
              Garnet for Garnet-related expenses including staffing, preservation, restoration, and education projects.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
