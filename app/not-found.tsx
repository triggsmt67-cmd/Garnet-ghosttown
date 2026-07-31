import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main-content" className="paper-grain grid min-h-[80svh] place-items-center bg-[#0d1218] px-5 text-center text-[#f8f6f1]">
      <div>
        <p className="text-xs font-bold tracking-[0.2em] text-[#e0c46d] uppercase">404 · Trail not found</p>
        <h1 className="display-type mt-6 text-7xl leading-none md:text-9xl">A wrong turn.</h1>
        <p className="mx-auto mt-7 max-w-md text-white/55">
          Even the best-marked mountain road can surprise you. Let&apos;s head back toward town.
        </p>
        <Link href="/" className="group mt-9 inline-flex items-center gap-4 border-b border-[#e0c46d] py-3 text-xs font-bold tracking-[0.16em] uppercase">
          Return home
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
