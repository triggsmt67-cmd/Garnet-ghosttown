import Image from "next/image";
import { Reveal } from "./reveal";

export function RouteHero({
  eyebrow,
  title,
  intro,
  image = "/images/garnet-hero.png",
  imageAlt = "",
  imagePosition = "object-center",
  contentClassName = "",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  contentClassName?: string;
}) {
  return (
    <section className="route-hero paper-grain">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${imagePosition}`}
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(13,18,24,0.96),rgba(14,28,39,0.7)_52%,rgba(13,18,24,0.2))]" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(135deg,rgba(168,51,61,0.12),rgba(211,179,80,0.12))] mix-blend-color" />
      <div className={`relative z-10 max-w-4xl ${contentClassName}`}>
        <Reveal>
          <p className="mb-6 text-sm font-semibold text-[#e0c46d]">{eyebrow}</p>
          <h1 className="display-type max-w-5xl text-5xl leading-[0.94] tracking-[-0.032em] sm:text-6xl md:text-[6.35rem]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
