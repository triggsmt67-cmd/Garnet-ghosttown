type NavLink = { href: string; label: string };
export const links: (NavLink & { children?: NavLink[] })[] = [
  {
    href: "/visit", label: "Plan Your Visit",
    children: [
      { href: "/visit", label: "Visitor information" },
      { href: "/updates", label: "Current updates" },
      { href: "/faq", label: "Common questions" },
      { href: "/cabin-rentals", label: "Winter cabin rentals" },
      { href: "/montana-ghost-towns", label: "Montana ghost towns" },
    ],
  },
  {
    href: "/explore", label: "Things to Do",
    children: [
      { href: "/explore", label: "Walks & activities" },
      { href: "/gallery", label: "Photo Gallery" },
    ],
  },
  { href: "/events", label: "Events & Programs" },
  {
    href: "/about", label: "Garnet History",
    children: [
      { href: "/about", label: "About Garnet" },
      { href: "/history", label: "History & Stories" },
    ],
  },
];

export const involvementLinks = [
  { href: "/preserve", label: "Ways to Help" },
  { href: "/license-plate", label: "License Plate & Grants" },
  { href: "/association", label: "About the Association" },
];
