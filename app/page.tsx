"use client";

import Slider from "@/components/slider/slider";
import { useThemeLanguage } from "../context/ThemeLanguageContext";
import BlurFade from "@/components/ui/blur-fade";
import BentoBox from "@/components/bentoBox/bentoBox";
import Multi from "@/components/slider/multi/multi";
import RankingTable from "@/components/rankingTable/rankingTable";
import { Button } from "@/components/ui/button";
export default function Home() {
  const { translations } = useThemeLanguage();

  return (
    <div>
      <BlurFade delay={0.45} inView>
        <Slider />

        <div className="flex flex-col items-center p-5">
          <BlurFade delay={0.25} inView>
            <h1 className="font-bold text-5xl mt-10">
              {translations.home.headerTitle}
            </h1>
            <BentoBox />
          </BlurFade>
        </div>

        <div className="flex flex-col mt-5">
          <BlurFade delay={0.25} inView>
            <div className="p-12">
              <h2 className="font-bold text-5xl self-start ">
                {translations.home.upcomingEvents.title}
              </h2>
              <p className="text-lg mt-3">
                {translations.home.upcomingEvents.subtitle}
              </p>
            </div>
            <Multi/>
          </BlurFade>
        </div>

        <div className="flex flex-col mt-5">
          <BlurFade delay={0.25} inView>
            <div className="p-12">
              <h2 className="font-bold text-5xl self-start ">
                {translations.home.ranking.title}
              </h2>
              <p className="text-lg mt-3">
                {translations.home.ranking.subTitle}
              </p>
            </div>
            <div className="p-3">
              <RankingTable/>
            </div>
            <div className="flex justify-center">
              <Button>{translations.home.ranking.button}</Button>
            </div>
          </BlurFade>
        </div>
      </BlurFade>
    </div>
  );
}
