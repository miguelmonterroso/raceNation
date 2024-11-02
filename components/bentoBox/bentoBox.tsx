'use client';

import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { es } from "date-fns/locale";
import { Notebook, Trophy, Wrench } from "lucide-react";
import Globe from "../ui/globe";
import Orbit from '../orbit/orbit'
import Iphone15Pro from "../ui/iphone-15-pro";

export default function BentoBox() {
    const { translations, language } = useThemeLanguage();
    const features = [
        {
            Icon: CalendarIcon,
            name: translations.home.bentoBox.calendar.title,
            description: translations.home.bentoBox.calendar.subTitle,
            className: "col-span-3 lg:col-span-1",
            href: "#",
            cta: translations.home.bentoBox.calendar.cta,
            background: (
              <Calendar
                mode="single"
                selected={new Date(2022, 4, 11, 0, 0, 0)}
                className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
                locale={language === 'es' ? es : undefined}
              />
            ),
          },
      {
        Icon: Trophy,
        name:  translations.home.bentoBox.ranking.title,
        description: translations.home.bentoBox.ranking.subTitle,
        href: "#",
        cta: translations.home.bentoBox.ranking.cta,
        className: "col-span-3 lg:col-span-2",
        background: (<Globe className="left-10 top-[-100px] md:left-64 md:top-[-150px] lg:left-96" />),
      },
      {
        Icon: Wrench,
        name: translations.home.bentoBox.recommendations.title,
        description: translations.home.bentoBox.recommendations.subTitle,
        href: "#",
        cta: translations.home.bentoBox.recommendations.cta,
        className: "col-span-3 lg:col-span-2",
        background: (<Orbit/>),
      },
      {
        Icon: Notebook,
        name: translations.home.bentoBox.blog.title,
        description: translations.home.bentoBox.blog.subTitle,
        href: "#",
        cta: translations.home.bentoBox.blog.cta,
        className: "col-span-3 lg:col-span-1",
        background: (<div className="relative">
            <div className="relative">
      <Iphone15Pro
      width={800}
      height={600}
      className="absolute"
        src="https://images.unsplash.com/photo-1678961221176-192772797f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
          </div>),
      },
    ];

    
  return (
    <BentoGrid className="mt-10">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
