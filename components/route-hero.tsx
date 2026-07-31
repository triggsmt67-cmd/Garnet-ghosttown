import { Reveal } from "./reveal";

export function RouteHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="route-hero paper-grain">
      <div className="relative z-10 max-w-4xl">
        <Reveal>
          <p className="mb-6 text-sm font-semibold text-[#e0c46d]">{eyebrow}</p>
          <h1 className="display-type max-w-5xl text-5xl leading-[0.94] tracking-[-0.032em] sm:text-6xl md:text-[6.35rem]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
