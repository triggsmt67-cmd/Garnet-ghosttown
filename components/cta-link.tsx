import Link from "next/link";
import { ArrowRight } from "./icons";

export function CtaLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 border-b py-2 text-sm font-semibold ${
        light ? "border-[#e0c46d] text-[#f8f6f1]" : "border-[#3d5a3e] text-[#171713]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}
