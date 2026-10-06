"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mountain } from "./icons";
import type { FireStatus } from "@/lib/fire-shared";
import { FireStatusBar } from "./fire-status-bar";

const links = [
  { href: "/visit", label: "Plan Your Visit" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About Garnet" },
  { href: "/events", label: "Education & Events" },

];

const involvementLinks = [
  { href: "/preserve", label: "Preservation & volunteering" },
  { href: "/board", label: "Board members" },
  { href: "/license-plate", label: "Ghost town license plate" },
];

export function Header({ fire }: { fire: FireStatus }) {
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
      <FireStatusBar fire={fire} />
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
              <span className="mt-1 block text-[0.62rem] leading-none font-bold tracking-[0.23em] uppercase text-white/72">
                Ghost Town · Montana
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:gap-6 xl:flex" aria-label="Main navigation">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              if (link.href === "/visit" || link.href === "/about") return (
                <details key={link.href} className="relative" onKeyDown={event => { if (event.key === "Escape") event.currentTarget.open = false; }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false; }}>
                  <summary className={`cursor-pointer list-none text-xs font-semibold tracking-[0.12em] uppercase hover:text-[#e0c46d] ${active || (link.href === "/visit" ? ["/cabin-rentals", "/faq", "/updates"].includes(pathname) : pathname === "/history") ? "text-[#e0c46d]" : "text-white/75"}`}>{link.label} <span aria-hidden="true">⌄</span></summary>
                  <div className="absolute left-0 top-full mt-5 w-64 border border-white/15 bg-[#0d1218] p-2 shadow-xl">{(link.href === "/visit" ? [{href:"/visit",label:"Visitor information"},{href:"/cabin-rentals",label:"Winter cabin rentals"},{href:"/faq",label:"Common questions"},{href:"/updates",label:"Current updates"}] : [{href:"/about",label:"About Garnet"},{href:"/history",label:"History timeline & stories"}]).map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={event => { const parent = event.currentTarget.closest("details"); if (parent) parent.open = false; }} className="block px-4 py-3 text-sm text-white/85 hover:bg-white/10 focus-visible:bg-white/10">{item.label}</Link>)}</div>
                </details>
              );
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:text-[#e0c46d] ${
                    active ? "text-[#e0c46d]" : "text-white/75"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[#d3b350] transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
            <details className="group relative" onKeyDown={(event) => { if (event.key === "Escape") event.currentTarget.open = false; }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false; }}>
              <summary className={`cursor-pointer list-none text-xs font-semibold tracking-[0.12em] uppercase hover:text-[#e0c46d] ${involvementLinks.some(link => pathname === link.href) ? "text-[#e0c46d]" : "text-white/75"}`}>Get Involved <span aria-hidden="true">⌄</span></summary>
              <div className="absolute right-0 top-full mt-5 w-72 border border-white/15 bg-[#0d1218] p-2 shadow-xl">
                {involvementLinks.map(link => <Link key={link.href} href={link.href} onClick={event => { const disclosure = event.currentTarget.closest("details"); if (disclosure) disclosure.open = false; }} className="block px-4 py-3 text-sm text-white/85 hover:bg-white/10 focus-visible:bg-white/10" aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
              </div>
            </details>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=46.82559,-113.33945"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 bg-[#3d5a3e] px-4 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#4a6e4c]"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          <button
            className="relative grid h-11 w-11 place-items-center text-[#f8f6f1] xl:hidden"
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
        className={`grid max-h-[calc(100dvh-8rem)] overflow-y-auto bg-[#0d1218] transition-[grid-template-rows] duration-500 xl:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="min-h-0" aria-label="Mobile navigation">
          <div className="space-y-1 px-5 pt-8 pb-6">
            {links.map((link) => (
              <div key={link.href}><Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-type flex items-center justify-between border-b border-white/10 py-4 text-3xl text-[#f8f6f1]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-5 w-5 text-white/65" />
              </Link>{link.href === "/about" && <Link href="/history" onClick={() => setOpen(false)} className="block py-3 pl-3 text-base text-[#e0c46d]">History timeline & stories →</Link>}{link.href === "/visit" && <Link href="/updates" onClick={() => setOpen(false)} className="block py-3 pl-3 text-base text-[#e0c46d]">Current updates →</Link>}{link.href === "/visit" && <Link href="/faq" onClick={() => setOpen(false)} className="block py-3 pl-3 text-base text-[#e0c46d]">Common questions →</Link>}{link.href === "/visit" && <Link href="/cabin-rentals" onClick={() => setOpen(false)} className="block py-3 pl-3 text-base text-[#e0c46d]">Winter cabin rentals →</Link>}</div>
            ))}
            <details className="border-b border-white/10 py-4 text-[#f8f6f1]">
              <summary className="display-type cursor-pointer text-3xl">Get Involved</summary>
              <div className="mt-3 grid gap-1">{involvementLinks.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-3 pl-3 text-base text-white/80">{link.label}</Link>)}</div>
            </details>
          </div>
        </nav>
      </div>
    </header>
  );
}
