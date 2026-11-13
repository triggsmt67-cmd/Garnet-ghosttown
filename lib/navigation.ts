export const navLabels = {
  visit: "Plan Your Visit",
  explore: "Things to Do",
  events: "Events & Programs",
  history: "History & Stories",
  updates: "Current updates",
  cabins: "Winter cabin rentals",
} as const;

type NavLink = { href: string; label: string };
export const links: (NavLink & { children?: NavLink[] })[] = [
  {
    href: "/visit", label: navLabels.visit,
    children: [
      { href: "/visit", label: "Visitor information" },
      { href: "/updates", label: navLabels.updates },
      { href: "/faq", label: "Common questions" },
      { href: "/cabin-rentals", label: navLabels.cabins },
      { href: "/montana-ghost-towns", label: "Montana ghost towns" },
    ],
  },
  {
    href: "/explore", label: navLabels.explore,
    children: [
      { href: "/explore", label: "Walks & activities" },
      { href: "/gallery", label: "Photo Gallery" },
    ],
  },
  { href: "/events", label: navLabels.events },
  {
    href: "/about", label: "Garnet History",
    children: [
      { href: "/about", label: "About Garnet" },
      { href: "/history", label: navLabels.history },
    ],
  },
];

export const involvementLinks = [
  { href: "/preserve", label: "Ways to Help" },
  { href: "/license-plate", label: "License Plate & Grants" },
  { href: "/association", label: "About the Association" },
];
