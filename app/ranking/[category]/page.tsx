// /ranking/[category]/page.tsx
'use client';

import Card from '@/components/card/card';
import BlurFade from '@/components/ui/blur-fade';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

const eventData = {
  topSpeed: [
    { id: 1, title: "Top 10 MotorSport", description: "High-speed drag racing", date: "2024-12-01", link: "/ranking/topSpeed/top-10", image: "https://images.unsplash.com/photo-1693762462997-e33980ab0cd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Guatemala RaceWay", description: "Jornada 1", date: "2024-12-15", link: "/ranking/topSpeed/raceway-etapa-3", image: "https://images.unsplash.com/photo-1689827022229-f84c24d8c61d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Jocotillo Racing", description: "Etapa 3", date: "2024-12-15", link: "/ranking/topSpeed/jocotillo", image: "https://images.unsplash.com/photo-1682428609721-af4d46215283?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Clandestinas", description: "Segunda edicion", date: "2024-12-15", link: "/ranking/topSpeed/clandestinas", image: "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  lapTime: [
    { id: 1, title: "Autodromo los volcanes", description: "Etapa 5", date: "2024-11-10", link: "/ranking/lapTime/volcanes-etapa-5", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Autodromo los volcanes", description: "Etapa 4", date: "2024-11-20", link: "/ranking/lapTime/volcanes-etapa-4", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]
};

export default function RankingCategoryPage({ params }: { params: { category: string } }) {
  const { translations } = useThemeLanguage();

  const { category } = params;

  const events = eventData[category as keyof typeof eventData] || [];
  
  const categoryTranslated = category === "topSpeed" 
  ? translations.rankingPage.categories.Drag.header 
  : translations.rankingPage.categories.Circuit.header;

  return (
    <BlurFade delay={0.25} inView>
    <div className='p-12 mt-10'>
      <h1 className='font-bold text-5xl mb-10'>{categoryTranslated}</h1>
      <div className="flex gap-5 flex-wrap justify-center">
        {events.length > 0 ? (
          events.map(event => <Card key={event.id} {...event} />)
        ) : (
          <p>{translations.rankingPage.noResults}</p>
        )}
      </div>
    </div>
    </BlurFade>

  );
}
