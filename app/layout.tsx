import type { Metadata } from "next";
import { Barlow, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { getFireStatus } from "@/lib/fire";
import { isIndexable } from "@/lib/site";

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://garnetghosttown.org"),
  title: {
    default: "Garnet Ghost Town | Step Into Montana History",
    template: "%s | Garnet Ghost Town",
  },
  description:
    "Plan a trip from Missoula to Garnet Ghost Town, one of Montana's best-preserved mining towns. Find seasonal access, directions, fees, trails, and history.",
  openGraph: {
    title: "Garnet Ghost Town",
    description: "Plan a visit to a preserved Montana mining town in the Garnet Mountains.",
    images: ["/images/garnet-hero.png"],
  },
  // Belt and braces with robots.txt: a stray link to a preview URL still
  // shouldn't put draft content into search results.
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fire = await getFireStatus();

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <ScrollProgress />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header fire={fire} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
