import { homeHeroCopy } from "./home-hero-copy";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";
import { HeroConditions, type HeroRoadReport } from "./hero-conditions";

export function HomeHeroJournal({ roadReport }: { roadReport?: HeroRoadReport }) {
  return (
    <>
      <section className="garnet-arrival" aria-labelledby="arrival-title">
        <div className="arrival-heading">
          <div className="arrival-kicker">
            <span>{homeHeroCopy.location}</span>
          </div>
          <h1 id="arrival-title" className="arrival-title-row">
            <span className="display-type arrival-title">Garnet,</span>{" "}
            <span className="display-type arrival-intro">a glimpse into<br /> <em>{homeHeroCopy.titleAccent}</em></span>
          </h1>
        </div>

        <div className="arrival-landscape">
          <Image
            src="/images/Explore-Top-Banner.webp"
            alt="Preserved wooden buildings, green meadows, and forest at Garnet Ghost Town today"
            fill
            priority
            sizes="100vw"
            className="arrival-photo"
          />
          <div className="arrival-shade" />
          <div className="arrival-invitation">
            <p className="display-type arrival-description">{homeHeroCopy.description}</p>
            <div className="arrival-actions">
              <Link href="/visit" className="arrival-primary">{homeHeroCopy.primaryAction} <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/explore" className="arrival-secondary">{homeHeroCopy.secondaryAction} <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <Link href="/history" className="arrival-archive" aria-label="Discover Garnet’s history and stories">
            <div className="arrival-archive-image">
              <Image src="/images/Home-Top-Banner.webp" alt="An archival view of Garnet’s busy main street" fill sizes="(min-width: 768px) 220px, 130px" className="object-cover" />
            </div>
            <span className="arrival-archive-caption">History & Stories <span aria-hidden="true">↗</span></span>
          </Link>
          <span className="arrival-photo-label">Garnet, today</span>
        </div>
      </section>
      <div className="bg-[#24352b] px-5 py-5 md:px-10">
        <div className="mx-auto max-w-[82rem]">
          <HeroConditions roadReport={roadReport} layout="strip" />
        </div>
      </div>
    </>
  );
}
