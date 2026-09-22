import type { GarnetEvent } from "@/lib/content/types";

export function formatEventPrice(event: GarnetEvent): string {
  if (event.price === undefined) return "Standard day pass";
  if (event.price === 0) return "Free";
  return `$${event.price} per person`;
}

const statusLabels: Record<Exclude<GarnetEvent["status"], "scheduled">, string> = {
  postponed: "Postponed",
  cancelled: "Cancelled",
  sold_out: "Sold out",
};

/** Postponed/cancelled/sold-out events stay visible, clearly marked. */
export function EventStatusBadge({
  status,
  className = "",
}: {
  status: GarnetEvent["status"];
  className?: string;
}) {
  if (status === "scheduled") return null;
  const urgent = status === "cancelled" || status === "postponed";
  return (
    <span
      className={`inline-block shrink-0 px-3 py-1 text-[0.6rem] font-bold tracking-[0.15em] uppercase ${
        urgent ? "bg-[#a8333d] text-white" : "bg-[#d3b350] text-[#18202a]"
      } ${className}`}
    >
      {statusLabels[status]}
    </span>
  );
}
