import type { MetadataRoute } from "next";
import { buildings } from "@/lib/buildings";
import { getStories } from "@/lib/content";
import { isIndexable } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Nothing to advertise while the site is blocked from search.
  if (!isIndexable) return [];

  const { data: stories } = await getStories();
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
    ...stories.map((story) => ({
      url: `${base}/stories/${story.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];
}
