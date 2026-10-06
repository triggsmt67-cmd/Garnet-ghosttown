import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";
import { RouteHero } from "@/components/route-hero";
import { TownMap } from "@/components/town-map";

export const metadata: Metadata = {
  title: "Explore Garnet",
  description:
    "Discover preserved buildings, self-guided mining trails, scavenger hunts, geocaching, and mountain activities at Garnet Ghost Town.",
};

type Activity = { title: string; tag: string; copy: string; detail?: string; href?: string; action?: string };
const experiences: Activity[] = [
  {title: "Walk the Historic Street", tag: "At Garnet", copy: "Visit the hotel, saloon, store, schoolhouse, and family cabins.", detail: "Look for newspaper insulation, worn doorways, and household objects. Open buildings vary with the season. Leave artifacts where you find them."},
  {title: "Sierra Mine Loop Trail", tag: "Starts at the parking lot", copy: "Follow numbered stops through two early mining claims.", detail: "Collect the interpretive brochure at the Visitor Center. Cross the road from the parking lot and follow signs to the Sierra and Forest Lode claims, dating to 1872 and 1884. Match the numbered posts to the brochure."},
  {title: "Warren Park Trail", tag: "Allow 2–3 hours round trip", copy: "Walk through forest to a park where Garnet families once picnicked.", detail: "Edward Brook Warren built a cabin and mine nearby, then created a park with tables, benches, swings, and a glider. The trail from the main parking lot passes a spring and cabin remains. Expect uneven ground and climbs. Bring water and lunch."},
  {title: "Placer Trail", tag: "Allow about one hour", copy: "Extend your walk from the Sierra Mine Loop to the Visitor Center.", detail: "At the trail split, continue right onto the Placer Trail. It crosses bridges and passes cabins and private property. Stay on the trail and respect property boundaries. Placer mining used water to separate gold from gravel."},
  {title: "Garnet Day", tag: "Check confirmed dates", copy: "Join a community event hosted by the BLM and Garnet Preservation Association.", detail: "Traditionally held in June. Check the events page or call the BLM at 406.329.3914 for current plans.", href: "/events", action: "See events"},
];
const nearby: Activity[] = [
  {title:"Camping",tag:"Outside the townsite",copy:"No camping within half a mile of Garnet. Ask the BLM about camping on nearby public land.",detail:"The association lists no camping within half a mile of Garnet and a 14-day stay limit on eligible public land. Confirm current boundaries, stay limits, and fire restrictions with the Missoula Field Office before choosing a site.",href:"https://www.blm.gov/visit/garnet-ghost-town",action:"BLM contact information"},
  {title:"Fishing",tag:"Elk Creek & Blackfoot River",copy:"Explore nearby trout waters.",detail:"Elk Creek flows into the Blackfoot River. Check Montana Fish, Wildlife & Parks for current licenses, seasons, access, and fishing regulations.",href:"https://fwp.mt.gov/fish",action:"Fishing information"},
  {title:"Hiking",tag:"Wales Creek Wilderness Study Area",copy:"Explore steep, forested country beyond Garnet.",detail:"Ask the BLM for routes and access information before heading into the Wales Creek area. Bring a map and prepare for mountain terrain.",href:"https://www.blm.gov/visit/garnet-ghost-town",action:"Contact the BLM"},
  {title:"Hunting",tag:"Garnet Range",copy:"Find current hunting information for the surrounding public lands.",detail:"The range supports elk, deer, moose, bears, mountain lions, and grouse. Check licenses, seasons, district rules, and land ownership with Montana Fish, Wildlife & Parks. Garnet itself is a no-shooting area.",href:"https://fwp.mt.gov/hunt",action:"Hunting information"},
  {title:"Mountain Biking",tag:"Designated routes",copy:"Ride backcountry roads and trails through the Garnet Range.",detail:"Request the Garnet Mountain Bike Trail Map from the BLM. Confirm which routes are open and suitable for your trip before riding."},
  {title:"OHV Riding",tag:"Designated motorized routes",copy:"Explore approved backcountry routes by off-highway vehicle.",detail:"Request the Garnet OHV Trails Guide from the BLM. Check seasonal closures and vehicle requirements, and stay on designated routes."},
  {title:"Snowmobiling & Cross-Country Skiing",tag:"Winter recreation",copy:"Explore the range on snowy trails, then consider a cabin stay.",detail:"Ask the BLM for the winter recreation map and current trail conditions. Grooming and difficulty vary; some trails are ungroomed. Plan for changing weather and remote travel.",href:"/cabin-rentals",action:"Winter cabin rentals"},
];
function ReadMore({item}: {item: Activity}) {
  if (!item.detail) return null;
  return <details className="group mt-4 max-w-2xl"><summary className="w-fit cursor-pointer list-none border-b border-[#3d5a3e] pb-1 text-sm font-semibold text-[#3d5a3e] focus-visible:outline-2 focus-visible:outline-offset-4"><span className="group-open:hidden">Read more</span><span className="hidden group-open:inline">Show less</span><span className="sr-only"> about {item.title}</span></summary><div className="mt-4 border-l-2 border-[#a36b43] pl-4 text-sm leading-7 text-black/70"><p>{item.detail}</p>{item.href && <a href={item.href} className="mt-3 inline-block font-semibold underline underline-offset-4">{item.action} →</a>}</div></details>;
}

const activities = [
  {
    title: "Townsite Scavenger Hunt",
    tag: "All Ages · Free at Visitor Center",
    copy: "Pick up a free card at the Visitor Center. Search for building details, square nails, stove lids, and cellar doors. Families can look closely together and learn why old objects should stay where they are.",
  },
  {
    title: "High-Country Geocaching",
    tag: "Backcountry GPS · Public Lands",
    copy: "Several geocaches are hidden on surrounding BLM public lands. Download coordinates before leaving cell service, then follow them through the forest around First Chance Gulch.",
  },
  {
    title: "Garnet Back Country Byway",
    tag: "Scenic 12-Mile Mountain Drive",
    copy: "Garnet Range Road is an official BLM Back Country Byway, with views toward the Blackfoot River Valley and Bob Marshall Wilderness. Watch for elk, mule deer, hawks, and seasonal wildflowers.",
  },
  {
    title: "Heritage Photography",
    tag: "Golden Hour · Historic Textures",
    copy: "Morning and late-afternoon light brings out the texture of weathered timber, old glass, and mountain streets. Bring a wider lens for building interiors and a longer lens for details you should not touch.",
  },
];

export default function ExplorePage() {
  return (
    <main id="main-content">
      <RouteHero
        eyebrow="Explore Garnet"
        title="See Garnet building by building."
        intro="Walk Garnet’s dirt streets, visit the old buildings, and follow trails to the nearby mines."
        image="/images/garnet-hero.png"
        imageAlt="Historic buildings lining the main street at Garnet Ghost Town"
        imagePosition="object-[center_45%]"
      />

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                At Garnet
              </span>
              <h2 className="display-type mt-2 leading-[0.9] tracking-[-0.04em] font-normal section-heading">
                Take Main Street
                <span className="block text-[#3d5a3e]">at walking speed.</span>
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-black/65">
              Worn doorways, handwritten shipping tags, old wallpaper, and handmade tools
              are easy to miss when you rush. Give yourself two or three hours for the town,
              with more time if you plan to hike.
            </p>
          </Reveal>

          <figure className="mt-10">
            <div className="relative aspect-[16/7] overflow-hidden bg-[#e9e1d1]">
              <Image src="/images/garnet-town.JPG" alt="Garnet’s wooden buildings along the town street" fill sizes="(min-width: 1440px) 1300px, 90vw" className="object-cover object-[center_55%]" />
            </div>
            <figcaption className="mt-3 text-xs leading-6 text-black/60">Start with a walk through Garnet’s historic buildings.</figcaption>
          </figure>
          <div className="mt-16 divide-y divide-black/15 border-y border-black/15">
            {experiences.map((item, index) => (
              <Reveal
                key={item.title}
                className="grid gap-4 py-8 md:grid-cols-[.7fr_1.3fr] md:gap-12 md:py-10"
                delay={index * 90}
              >
                <div>
                  <h3 className="display-type text-3xl font-normal text-[#0e1c27] md:text-4xl">{item.title}</h3>
                  <span className="mt-2 inline-block rounded-full bg-[#3d5a3e]/10 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#3d5a3e]">
                    {item.tag}
                  </span>
                </div>
                <div><p className="max-w-2xl text-sm leading-7 text-black/65">{item.copy}</p><ReadMore item={item} /></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="nearby" className="scroll-mt-36 bg-[#f2eee4] px-5 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-[82rem]"><p className="text-xs font-semibold uppercase tracking-wider text-[#3d5a3e]">Beyond Garnet</p><h2 className="display-type mt-3 text-4xl md:text-5xl">Activities nearby</h2><p className="mt-5 max-w-2xl leading-7 text-black/65">Make time for the surrounding mountains, too. Contact the BLM at <a href="tel:4063293914" className="underline">406.329.3914</a> for maps and current access information.</p><div className="mt-8 grid gap-6 sm:grid-cols-2">
        <figure><div className="relative aspect-[16/10] overflow-hidden bg-[#e9e1d1]"><Image src="/images/garnet-fog.webp" alt="A view of Garnet in the mountain mist" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" /></div><figcaption className="mt-3 text-xs leading-6 text-black/60">Garnet’s mountain setting. Check access and weather before heading out.</figcaption></figure>
        <figure><div className="relative aspect-[16/10] overflow-hidden bg-[#e9e1d1]"><Image src="/images/historic/university-archive/garnet-ghost-town-hillside-buildings-in-winter-77-0004.webp" alt="Historic view of Garnet’s hillside buildings in winter snow" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" /></div><figcaption className="mt-3 text-xs leading-6 text-black/60">Historic winter view. Courtesy of University of Montana.</figcaption></figure>
      </div><div className="mt-8 grid gap-x-12 md:grid-cols-2">{nearby.map(item=><article key={item.title} className="border-t border-black/15 py-7"><h3 className="display-type text-3xl">{item.title}</h3><p className="mt-2 text-xs font-semibold text-[#3d5a3e]">{item.tag}</p><p className="mt-3 text-sm leading-7 text-black/65">{item.copy}</p><ReadMore item={item} /></article>)}</div><p className="mt-6 text-xs text-black/60">Activity details adapted from the association’s <a href="https://www.garnetghosttown.org/things-to-do.php#nearby" className="underline">Things to Do page</a>. Confirm current rules and conditions before your trip.</p></div></section>
      <TownMap />

      <section className="grid bg-[#0d1218] text-[#f8f6f1] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[34rem]">
          <Image
            src="/images/historic/university-archive/garnet-ghost-town-false-front-building-with-old-doors-72-0594.webp"
            alt="Garnet false-front building with weathered wooden doors"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-contain object-center"
          />
        </div>
        <div className="flex items-center px-5 py-14 md:px-16 lg:px-20">
          <Reveal>
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#e0c46d]">
              Look Closely
            </span>
            <h2 className="display-type mt-4 max-w-3xl leading-[1.02] font-normal section-heading">
              Look closely at the buildings.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-white/70">
              Look at the tall front wall that rises above the roof and the old doors below.
              Watch for similar details along Main Street. Inside open rooms, look for
              newspaper used to insulate walls, wooden beams, and household objects.
            </p>
            <p className="archive-caption text-white/60">False-front building and old doors. Courtesy of University of Montana.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#3d5a3e]">
                More Ways to Explore
              </span>
              <h2 className="display-type mt-2 leading-[0.98] font-normal section-heading">
                Beyond the boardwalks.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/65">
                Visiting with children, looking for geocaches, or bringing a camera? There is
                more to explore beyond the main street.
              </p>
            </div>
            <div className="divide-y divide-black/15 border-t border-black/15">
              {activities.map((item, index) => (
                <Reveal key={item.title} className="py-7" delay={index * 60}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="display-type text-2xl font-normal text-[#0e1c27]">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-[#3d5a3e]/10 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#3d5a3e]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-black/65">
                    {item.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 border-t border-black/15 pt-12 text-center">
            <CtaLink href="/visit">Plan your visit</CtaLink>
            <CtaLink href="/events">See upcoming events</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}
