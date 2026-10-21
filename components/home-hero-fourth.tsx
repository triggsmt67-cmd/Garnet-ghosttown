import { HomeHeroPortal } from "./home-hero-portal";
import { HeroConditions, type HeroRoadReport } from "./hero-conditions";

export function HomeHeroFourth({ roadReport }: { roadReport?: HeroRoadReport }) {
  return (
    <>
      <HomeHeroPortal />
      <div className="bg-[#24352b] px-5 py-5 md:px-10">
        <div className="mx-auto max-w-[82rem]">
          <HeroConditions roadReport={roadReport} layout="strip" />
        </div>
      </div>
    </>
  );
}
