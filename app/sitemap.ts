import type { MetadataRoute } from "next";
import { buildings } from "@/lib/buildings";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://garnetghosttown.org";
  return [
    { url: `${base}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${base}/visit`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/explore`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${base}/history`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${base}/preserve`, priority: 0.7, changeFrequency: "monthly" },
    ...buildings.map((building) => ({
      url: `${base}/explore/${building.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];
}
