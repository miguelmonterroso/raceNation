// /events/[category]/page.tsx
'use client';

import Card from '@/components/card/card';
import BlurFade from '@/components/ui/blur-fade';

const eventData = {
  drag: [
    { id: 1, title: "Drag Race Event 1", description: "High-speed drag racing", date: "2024-12-01", link: "/events/drag", image: "https://images.unsplash.com/photo-1693762464888-3a0088e8e629?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Drag Race Event 2", description: "Exciting drag races", date: "2024-12-15", link: "/events/drag", image: "https://images.unsplash.com/photo-1693762463565-9f174a718fb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  tuning: [
    { id: 1, title: "Drive Fest - Diciembre", description: "Showcase of modified cars", date: "2024-11-10", link: "/events/tuning/drive-fest-diciembre", image: "https://images.unsplash.com/photo-1681820819635-7912e0c94cde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Tuning Show 2", description: "Tuning competition", date: "2024-11-20", link: "/events/drift", image: "https://images.unsplash.com/photo-1630357431803-abb8b18f2a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  drift: [
    { id: 1, title: "Drift Event 1", description: "Amazing drift skills", date: "2024-10-25", link: "/events/tuning", image: "https://images.unsplash.com/photo-1676768639358-32e7001c87f3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Drift Event 2", description: "Drift challenges", date: "2024-11-05", link: "/events/tuning", image: "https://images.unsplash.com/photo-1668454433271-3cc99885ee01?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },
    { id: 3, title: "Drift Event 3", description: "Drift challenges", date: "2024-11-05", link: "/events/tuning", image: "https://images.unsplash.com/photo-1631201983450-97f67ba02690?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },
  ],
};

export default function EventCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const events = eventData[category as keyof typeof eventData] || [];

  return (
    <BlurFade delay={0.25} inView>
      <div className='p-12 mt-10'>
        <h1 className='font-bold text-5xl mb-10'>Próximos Eventos de {category}</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {events.length > 0 ? (
            events.map(event => <Card key={event.id} {...event} />)
          ) : (
            <p>No hay eventos próximos para esta categoría.</p>
          )}
        </div>
      </div>
    </BlurFade>
 
  );
}
