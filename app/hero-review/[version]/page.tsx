import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeHeroGradient } from "@/components/home-hero-gradient";
import { HomeHeroCream } from "@/components/home-hero-cream";
import { HomeHeroJournal } from "@/components/home-hero-journal";
import { HomeHeroFourth } from "@/components/home-hero-fourth";
import { getRoadReport } from "@/lib/content";

export const metadata = { title: "Hero design review", robots: { index: false, follow: false } };
const versions = { "1": HomeHeroGradient, "2": HomeHeroCream, "3": HomeHeroJournal, "4": HomeHeroFourth };
export default async function HeroReview({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  if (!Object.prototype.hasOwnProperty.call(versions, version)) notFound();
  const Hero = versions[version as keyof typeof versions];
  const roadReport = await getRoadReport();
  if (roadReport.href.startsWith("#")) roadReport.href = `/${roadReport.href}`;
  return <main id="main-content"><Hero roadReport={roadReport} /><nav aria-label="Compare hero designs" className="flex flex-wrap items-center justify-center gap-5 bg-[#f2eee4] px-5 py-8 text-sm text-[#24352b]"><Link href="/hero-review" className="font-semibold underline underline-offset-4">All concepts</Link>{Object.keys(versions).map(key => <Link key={key} href={`/hero-review/${key}`} aria-current={key === version ? "page" : undefined} className={`border px-4 py-2 ${key === version ? "bg-[#24352b] text-white" : "border-[#24352b]/30"}`}>Option {key}</Link>)}</nav></main>;
}
