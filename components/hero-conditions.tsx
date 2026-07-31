import Link from "next/link";
import { ArrowRight } from "./icons";
import { WeatherCard } from "./weather-card";

export type HeroRoadReport = {
  status: string;
  note: string;
  updatedLabel: string;
  href: string;
  tone?: "open" | "caution" | "closed";
};

const statusColor: Record<NonNullable<HeroRoadReport["tone"]>, string> = {
  open: "bg-[#d3b350]",
  caution: "bg-[#e0a24a]",
  closed: "bg-[#d9555f]",
};

const unavailableReport: HeroRoadReport = {
  status: "Confirm access before leaving",
  note: "Call the BLM Missoula Field Office",
  updatedLabel: "Road report unavailable",
  href: "#conditions",
  tone: "caution",
};

export function HeroConditions({ roadReport }: { roadReport?: HeroRoadReport }) {
  const report = roadReport ?? unavailableReport;
  const tone = report.tone ?? "caution";

  return (
    <aside
      aria-label="Current weather and road access"
      className="grid w-full grid-cols-[.88fr_1.12fr] border-t border-white/20 pt-4 text-[#f8f6f1] lg:block lg:min-w-[19rem] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5"
    >
      <div className="pr-4 lg:pr-0">
        <WeatherCard compact />
      </div>

      <Link
        href={report.href}
        className="group border-l border-white/18 pl-4 lg:mt-4 lg:block lg:border-t lg:border-l-0 lg:pt-4 lg:pl-0"
      >
        <span className="flex items-center justify-between gap-3">
          <span className="label-type flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.17em] text-white/50 uppercase">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${statusColor[tone]}`}
            />
            Road access
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-white/42 transition-transform group-hover:translate-x-1" />
        </span>
        <strong className="mt-1.5 block text-sm leading-5 font-semibold text-white/90">
          {report.status}
        </strong>
        <span className="mt-1 hidden text-xs leading-5 text-white/58 sm:block">
          {report.note}
        </span>
        <span
          data-road-updated
          className="mt-1 block text-[0.58rem] font-semibold tracking-[0.08em] text-white/38 uppercase"
        >
          {report.updatedLabel}
        </span>
      </Link>
    </aside>
  );
}
