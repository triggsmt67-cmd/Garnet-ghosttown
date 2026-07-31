"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mountain } from "./icons";
import { FireStatusBar } from "./fire-status-bar";

const links = [
  { href: "/visit", label: "Plan Your Visit" },
  { href: "/explore", label: "Explore" },
  { href: "/#events", label: "Events" },
  { href: "/history", label: "History" },
  { href: "/preserve", label: "Preserve" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <FireStatusBar />
      <div
        className={`border-b transition-all duration-500 ${
          scrolled || open
            ? "border-white/10 bg-[#0d1218]/96 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl"
            : "border-transparent bg-[#0d1218]/12 py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 md:px-10">
          <Link href="/" className="group flex items-center gap-3 text-[#f8f6f1]">
            <Mountain className="h-7 w-11 text-[#d3b350] transition-transform duration-500 group-hover:-translate-y-0.5" />
            <span>
              <span className="display-type block text-[1.45rem] leading-none font-semibold tracking-[0.02em]">
                Garnet
              </span>
              <span className="mt-1 block text-[0.55rem] leading-none font-bold tracking-[0.25em] uppercase text-white/55">
                Ghost Town · Montana
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:text-[#e0c46d] ${
                  pathname === link.href ? "text-[#e0c46d]" : "text-white/75"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-[#d3b350] transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=46.82559,-113.33945"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 bg-[#a8333d] px-4 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#bd3a46]"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          <button
            className="relative grid h-11 w-11 place-items-center text-[#f8f6f1] md:hidden"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`absolute h-px w-6 bg-current transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute h-px w-6 bg-current transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`grid overflow-hidden bg-[#0d1218] transition-[grid-template-rows] duration-500 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="min-h-0" aria-label="Mobile navigation">
          <div className="space-y-1 px-5 pt-8 pb-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-type flex items-center justify-between border-b border-white/10 py-4 text-3xl text-[#f8f6f1]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-5 w-5 text-white/40" />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
