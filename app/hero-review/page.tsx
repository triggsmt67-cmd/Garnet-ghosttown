import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Four directions for Garnet", robots: { index: false, follow: false } };
const options = [
  { id: 1, name: "The historic panorama", description: "A brighter archival photograph, with a gradient protecting the headline.", image: "Home-Top-Banner.webp" },
  { id: 2, name: "The opening spread", description: "Warm paper, clear typography, and a historic photograph with no overlay.", image: "Home-Top-Banner.webp" },
  { id: 3, name: "The travel journal", description: "A bold Garnet masthead, a living landscape, and an archival print.", image: "Explore-Top-Banner.webp" },
  { id: 4, name: "A doorway through time", description: "An arched photographic window and two views of an enduring place.", image: "Explore-Historic-Street.webp" },
];
export default function HeroReviewIndex() {
  return <main id="main-content" className="bg-[#f2eee4] px-5 pt-44 pb-20 text-[#24352b] md:px-10"><div className="mx-auto max-w-6xl"><p className="text-xs font-semibold tracking-[.2em] uppercase">Garnet Ghost Town · Design review</p><h1 className="display-type mt-5 text-5xl leading-none md:text-7xl">One place. Four first impressions.</h1><p className="mt-6 max-w-xl text-lg">Explore each opening design, then use the links beneath the hero to compare the options.</p><div className="mt-12 grid gap-8 md:grid-cols-2">{options.map(option => <Link key={option.id} href={`/hero-review/${option.id}`} className="group border-t border-[#24352b]/30 pt-5"><p className="mb-3 text-xs font-semibold tracking-widest uppercase">Option 0{option.id}</p><div className="relative aspect-[2/1] overflow-hidden"><Image src={`/images/${option.image}`} alt="" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><h2 className="display-type mt-5 text-3xl">{option.name} <span aria-hidden="true">↗</span></h2><p className="mt-2 max-w-md">{option.description}</p></Link>)}</div></div></main>;
}
