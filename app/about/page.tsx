import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = { title: "About Garnet", description: "The history of Garnet, Montana: its mining boom, community, decline, and preservation." };
const archive = "/images/historic/university-archive/";
const chapters = [
  {
    years: "Early mining", title: "Gold brought people to the mountains.",
    paragraphs: [
      "In the 1800s, miners moved north as placer mines in California and Colorado became less productive. Placer mining separates gold from sand and gravel with running water. In the Garnet Mountains, miners first panned for gold, then used rockers and sluice boxes as loose gold became harder to find.",
      "By 1870, much of the area’s placer mining was no longer profitable. Miners had found gold-bearing quartz veins, but poor roads and limited ways to process the ore made larger operations difficult. Silver mines elsewhere drew many miners away.",
      "That changed in 1893. The repeal of the Sherman Silver Purchase Act helped set off a regional panic. Silver mines closed, leaving thousands of miners out of work. Some returned to the Garnet Mountains to search for gold."
    ], image: "garnet-ghost-town-mining-camp-and-mill-77-0022.webp", alt: "Historic mining camp and mill in the Garnet area", caption: "Mining camp and mill in the Garnet area."
  },
  {
    years: "1895–1898", title: "A mill, a rich strike, and a growing town.",
    paragraphs: [
      "In 1895, Dr. Armistead Mitchell built a stamp mill at the head of First Chance Gulch to crush local ore. A town grew around it. First called Mitchell, the settlement became known as Garnet in 1897, named for the ruby-colored stone found nearby.",
      "Soon after the mill was built, Sam Ritchey found a rich vein in the Nancy Hanks mine west of town. The mining boom followed. By January 1898, nearly 1,000 people lived in Garnet, and about twenty mines operated in the area.",
      "Miners and business owners built quickly, often without foundations or a town plan. Many buildings stood on mining claims. Small rooms were easier to heat, and getting gold out of the ground mattered more than building a town that would last."
    ], image: "garnet-ghost-town-horse-teams-and-wagons-77-0023.webp", alt: "Horse teams and wagons in historic Garnet", caption: "Horse teams and wagons at Garnet."
  },
  {
    years: "Life in Garnet", title: "More than a place to mine.",
    paragraphs: [
      "At its height, Garnet had four stores, four hotels, three livery stables, two barber shops, and thirteen saloons. Residents also had a union hall, butcher shop, candy shop, doctor’s office, and assay office, where ore could be tested. The school served 41 students.",
      "The surrounding mountains held gold-bearing quartz, but daily life also depended on supplies brought from Missoula and Deer Lodge. Garnet had a low crime rate and a school for local families. Its saloons and brothels were part of life in the mining town, too."
    ], image: "garnet-ghost-town-school-class-portrait-72-0570.webp", alt: "Garnet schoolchildren and their teacher", caption: "Garnet’s school class."
  },
  {
    years: "1900–1917", title: "The mines slowed. Then came the fire.",
    paragraphs: [
      "After 1900, gold became scarcer and more difficult to mine. Many owners leased their mines to others. By 1905, several mines had been abandoned and Garnet’s population had fallen to about 150.",
      "The Nancy Hanks mine produced about $300,000 worth of gold. Across Garnet’s mines, the estimated total reached $950,000 by 1917. Those figures reflect the value of gold at the time.",
      "A fire swept through the business district in 1912, destroying many commercial buildings. As work disappeared, more residents left. The town grew quieter, though some people stayed."
    ], image: "garnet-ghost-town-street-view-cabins-and-road-72-0597.webp", alt: "Historic street view of Garnet’s cabins and road", caption: "Cabins along Garnet’s road."
  },
  {
    years: "1934–1948", title: "One more return to the mines.",
    paragraphs: [
      "Higher gold prices brought another wave of miners to Garnet in 1934. They moved into empty cabins and worked old mines and piles of discarded ore again.",
      "World War II drew residents away to other jobs. Restrictions on dynamite for civilian use also made mining more difficult. By the 1940s, Garnet was again a ghost town. F. A. Davey and a few others remained, and Davey continued running his store.",
      "Some cabins were left with their furnishings inside, as if the owners might return. The hotel still stood. A few new cabins were built after the war, and an auction in 1948 sold items from Davey’s store."
    ], image: "garnet-ghost-town-weathered-two-story-building-72-0592.webp", alt: "Weathered two-story building in Garnet", caption: "A surviving building at Garnet."
  },
  {
    years: "Preservation", title: "Keeping what remains.",
    paragraphs: [
      "After residents left, souvenir hunters took more than small objects. Doors, woodwork, wallpaper, and even the hotel stairway were removed. Weather and time continued to damage the buildings.",
      "Garnet’s surviving homes, businesses, and mines help tell the stories of the people who worked here. Some found success. Others moved on. Preserving these places gives visitors a chance to understand their lives and the work that built Montana’s mining communities.",
      "Volunteers and public contributions help protect what remains. The Explore Montana Ghost Towns license plate also supports preservation. Most sponsor donations benefit Garnet, while 25 percent goes into a fund for preservation projects at other Montana ghost towns."
    ], image: "garnet-ghost-town-storefront-under-restoration-72-0593.webp", alt: "Historic photograph of a Garnet storefront under restoration", caption: "Restoration work on a Garnet storefront."
  }
];
export default function AboutPage() {
  return <main id="main-content" className="bg-[#f4f0e7] text-[#24352b]">
    <section className="relative isolate overflow-hidden bg-[#1e2f1f] px-5 pt-44 pb-12 text-[#f8f6f1] md:px-10 md:pt-48">
      <Image src="/images/historic/university-archive/garnet-ghost-town-street-view-cabins-and-road-72-0597.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,18,24,0.94),rgba(13,18,24,0.82)_55%,rgba(13,18,24,0.55))]" />
      <div className="mx-auto max-w-[82rem]"><p className="text-sm font-semibold text-[#e0c46d]">About Garnet</p><h1 className="display-type mt-4 max-w-4xl text-5xl leading-tight md:text-7xl">A mining town that wasn’t built to last.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">High in the Garnet Mountains east of Missoula, the buildings of a once-busy gold mining town still stand. They tell a story of hard work, changing fortunes, and the effort to preserve what was left behind.</p><Link href="/history" className="mt-7 inline-flex items-center gap-4 bg-[#e0c46d] px-6 py-4 text-base font-semibold text-[#1e2f1f] transition-colors hover:bg-[#edd58e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">History Timeline &amp; Stories <span aria-hidden="true">→</span></Link><nav aria-label="History chapters" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#e0c46d]">{chapters.map((chapter,i)=><a key={chapter.title} href={`#chapter-${i+1}`} className="underline underline-offset-4">{chapter.years}</a>)}</nav><p className="mt-6 text-xs text-white/70">Historic street view of Garnet. Courtesy of University of Montana.</p></div></section>
    <div className="mx-auto max-w-[82rem] px-5 md:px-10">{chapters.map((chapter,i)=><section id={`chapter-${i+1}`} key={chapter.title} className="scroll-mt-36 grid items-start gap-8 border-b border-[#24352b]/20 py-12 md:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16"><div><p className="text-sm font-semibold text-[#98613d]">{chapter.years}</p><h2 className="display-type mt-3 max-w-2xl text-3xl leading-tight md:text-4xl">{chapter.title}</h2><div className="mt-5 max-w-2xl space-y-4 text-base leading-8 text-[#625b50]">{chapter.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></div><figure className="lg:mt-9"><div className="relative aspect-[4/3]"><Image src={archive+chapter.image} alt={chapter.alt} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-contain" /></div><figcaption className="mt-3 border-l-2 border-[#a36b43] pl-3 text-xs leading-6 text-[#625b50]">{chapter.caption} Courtesy of University of Montana.</figcaption></figure></section>)}</div>
    <section className="mx-auto max-w-[82rem] px-5 py-12 md:px-10"><div className="flex flex-wrap gap-6 font-semibold"><Link href="/history" className="border-b border-[#98613d] pb-2">Explore the history timeline →</Link><Link href="/preserve" className="border-b border-[#98613d] pb-2">Learn about preservation →</Link><Link href="/license-plate" className="border-b border-[#98613d] pb-2">Ghost town license plate →</Link></div><p className="mt-8 text-sm text-[#625b50]">Adapted from the Garnet Preservation Association’s <a href="https://www.garnetghosttown.org/history.php" className="underline underline-offset-4">history of Garnet</a>.</p></section>
  </main>;
}
