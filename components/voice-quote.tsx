import type { StoryVoice } from "@/lib/content/types";

/**
 * "Voices of Garnet": a remembered moment in someone's own words.
 * The speaker is always named; unattributed quotes are never styled this way.
 */
export function VoiceQuote({ voice, className = "" }: { voice: StoryVoice; className?: string }) {
  // Long oral-history passages read better a size down.
  const size =
    voice.quote.length > 220
      ? "text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.35]"
      : "text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.2]";

  return (
    <figure className={`relative border-y border-[#0e1c27]/15 py-12 md:py-16 ${className}`}>
      <p className="text-[0.64rem] font-bold tracking-[0.18em] text-[#3d5a3e] uppercase">
        A voice from Garnet
      </p>
      <blockquote className="mt-6">
        <p className={`display-type ${size} tracking-[-0.01em] text-[#18202a]`}>
          <span aria-hidden="true" className="mr-1 text-[#d3b350]">
            “
          </span>
          {voice.quote}
          <span aria-hidden="true" className="ml-0.5 text-[#d3b350]">
            ”
          </span>
        </p>
      </blockquote>
      <figcaption className="mt-8 text-sm leading-6">
        <span className="font-semibold text-[#18202a]">{voice.speaker}</span>
        {voice.source && <span className="block text-black/45">{voice.source}</span>}
      </figcaption>
    </figure>
  );
}
