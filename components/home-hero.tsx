import { HomeHeroJournal } from "./home-hero-journal";
import type { HeroRoadReport } from "./hero-conditions";

// Selected concept: option 3, The travel journal. All concepts remain at /hero-review.
export function HomeHero({ roadReport }: { roadReport?: HeroRoadReport }) {
  return <HomeHeroJournal roadReport={roadReport} />;
}
