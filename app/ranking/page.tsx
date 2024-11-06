'use client';

import BlurFade from '@/components/ui/blur-fade';
import Card from '@/components/card/card';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

export default function RankingPage() {
  const { translations } = useThemeLanguage();

  const eventData = {
    events: [
      { id: 1, title: "Drag" as const, description: "Todos los resultados de eventos de drag", link: "/ranking/topSpeed", image: "https://images.unsplash.com/photo-1693762462997-e33980ab0cd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: 2, title: "Circuit" as const, description: "Todos los resultados de eventos de circuito", link: "/ranking/lapTime", image: "https://images.unsplash.com/photo-1689827022229-f84c24d8c61d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ]
  };

  const events = eventData.events.map(event => ({
    ...event,
    title: translations.rankingPage.categories[event.title]?.title || event.title,
    description: translations.rankingPage.categories[event.title]?.subtitle || event.description
  }));

  return (
    <BlurFade delay={0.25} inView>
      <div className='p-12'>
        <h1 className='font-bold text-5xl'>{translations.rankingPage.title}</h1>
        <p className='text-lg mt-3'>{translations.rankingPage.subTitle}</p>
        <div className="flex gap-5 flex-wrap justify-center mt-10">
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
