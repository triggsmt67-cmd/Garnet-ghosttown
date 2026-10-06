"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./icons";

const endings = {
  home: { label: "Your time at Garnet", title: "Check the route and plan your visit.", href: "/visit", action: "Plan your visit" },
  visit: { label: "Once you arrive", title: "See which buildings you can explore.", href: "/explore", action: "Explore the town" },
  explore: { label: "Garnet’s residents", title: "Meet the people who made Garnet a town.", href: "/history", action: "Read Garnet’s stories" },
  history: { label: "Caring for Garnet", title: "Learn how crews care for Garnet’s buildings.", href: "/preserve", action: "See how Garnet is preserved" },
  preserve: { label: "Visit Garnet", title: "Come see Garnet for yourself.", href: "/visit", action: "Plan your visit" },
  board: { label: "Support preservation", title: "Help care for Montana’s ghost towns.", href: "/license-plate", action: "See the license plate" },
  "license-plate": { label: "More ways to help", title: "Get involved with preservation at Garnet.", href: "/preserve", action: "Explore ways to help" },
  "cabin-rentals": { label: "Winter access", title: "Check the route before heading to Garnet.", href: "/visit", action: "Visitor information" },
  about: { label: "Stories through time", title: "Explore Garnet’s history, one story at a time.", href: "/history", action: "See the timeline" },
  updates: { label: "Visitor information", title: "Find answers before you head to Garnet.", href: "/faq", action: "Common questions" },
  faq: { label: "Ready to visit?", title: "Check the route and plan your day at Garnet.", href: "/visit", action: "Plan your visit" },
  events: { label: "Explore Garnet", title: "Take a look around the town.", href: "/explore", action: "Explore the town" },
};

export function PageClosing() {
  const pathname = usePathname();
  const route = pathname.split("/")[1] || "home";
  const ending = endings[route === "stories" ? "history" : route as keyof typeof endings] ?? endings.home;
  return (
    <aside aria-label="Continue exploring Garnet" className="border-y border-[#d3b350]/25 bg-[#1e2f1f] px-5 py-8 md:px-10 md:py-10">
      <div className="mx-auto flex max-w-[82rem] flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-[#e0c46d] uppercase">{ending.label}</p>
          <h2 className="display-type mt-2 max-w-2xl text-2xl leading-tight md:text-3xl">{ending.title}</h2>
        </div>
        <Link href={ending.href} className="inline-flex shrink-0 items-center gap-4 self-start border-b border-[#d3b350] py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e0c46d] md:self-center">
          {ending.action}<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
