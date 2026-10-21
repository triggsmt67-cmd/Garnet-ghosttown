"use client";

import { homeHeroCopy } from "./home-hero-copy";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "./icons";

export function HomeHeroPortal() {
  const [archival, setArchival] = useState(false);

  return (
    <section className="portal-hero" aria-labelledby="portal-title">
      <div className="portal-composition">
        <div className="portal-copy">
          <p className="portal-eyebrow"><span aria-hidden="true">✳</span> {homeHeroCopy.location}</p>
          <h1 id="portal-title" className="display-type portal-title">{homeHeroCopy.titleLead} <em>{homeHeroCopy.titleAccent}</em></h1>
          <p className="portal-detail">{homeHeroCopy.description}</p>
          <div className="portal-actions">
            <Link href="/visit" className="portal-primary">{homeHeroCopy.primaryAction} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/explore" className="portal-explore">{homeHeroCopy.secondaryAction} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className="portal-gallery">
          <div className="portal-arch-outline" aria-hidden="true" />
          <div className="portal-window">
            <Image src="/images/Explore-Historic-Street.webp" alt="A preserved wooden building beside a sunlit meadow and evergreen forest at Garnet" aria-hidden={archival} fill priority sizes="(min-width: 1024px) 47vw, (min-width: 640px) 70vw, 90vw" className={`portal-view portal-view-today ${archival ? "portal-view-hidden" : ""}`} />
            {archival && <Image src="/images/Home-Top-Banner.webp" alt="Archival photograph of Garnet’s main street, showing buildings and people during the mining era" fill sizes="(min-width: 1024px) 47vw, 90vw" className="portal-view portal-view-archive" />}
            <div className="portal-window-shade" />
            <p className="portal-image-caption" aria-live="polite">{archival ? "From the Garnet archives" : "Garnet today"}</p>
          </div>
          <span className="portal-side-note" aria-hidden="true">Garnet, Montana</span>
          <div className="portal-view-controls" role="group" aria-label="Choose a view of Garnet">
            <button type="button" aria-pressed={!archival} onClick={() => setArchival(false)}>Today</button>
            <span aria-hidden="true" className="portal-control-divider" />
            <button type="button" aria-pressed={archival} onClick={() => setArchival(true)}>In the archives</button>
          </div>
        </div>
      </div>
    </section>
  );
}
