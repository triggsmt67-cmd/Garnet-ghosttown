import { Leaf } from "./icons";

export function PreservationBanner() {
  return (
    <aside
      id="preservation-banner"
      aria-labelledby="preservation-banner-title"
      className="relative overflow-hidden border-y border-[#d3b350]/25 bg-[#1e2f1f] px-5 py-10 text-[#f8f6f1] md:px-10 md:py-12"
    >
      <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-[#d3b350]/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-7">
        <div className="grid h-16 w-16 place-items-center border border-[#d3b350]/40 bg-[#0e1c27] text-[#d3b350]">
          <Leaf className="h-8 w-8" />
        </div>

        <div>
          <h2 id="preservation-banner-title" className="display-type text-2xl leading-tight md:text-3xl">
            Keeping Garnet standing is a continuing job.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/56 md:text-base">
            Mountain weather keeps working on roofs, foundations, and original wood.
            The Bureau of Land Management cares for the town with support from the
            nonprofit Garnet Preservation Association.
          </p>
        </div>
      </div>
    </aside>
  );
}
