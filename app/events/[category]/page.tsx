// /events/[category]/page.tsx
'use client';

import Card from '@/components/card/card';

const eventData = {
  drag: [
    { id: 1, title: "Drag Race Event 1", description: "High-speed drag racing", date: "2024-12-01" },
    { id: 2, title: "Drag Race Event 2", description: "Exciting drag races", date: "2024-12-15" },
  ],
  tuning: [
    { id: 1, title: "Tuning Show 1", description: "Showcase of modified cars", date: "2024-11-10" },
    { id: 2, title: "Tuning Show 2", description: "Tuning competition", date: "2024-11-20" },
  ],
  drift: [
    { id: 1, title: "Drift Event 1", description: "Amazing drift skills", date: "2024-10-25" },
    { id: 2, title: "Drift Event 2", description: "Drift challenges", date: "2024-11-05" },
  ],
};

export default function EventCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const events = eventData[category as keyof typeof eventData] || [];

  return (
    <div>
      <h1>Próximos Eventos de {category}</h1>
      <div className="cards-container">
        {events.length > 0 ? (
          events.map(event => <Card key={event.id} {...event} />)
        ) : (
          <p>No hay eventos próximos para esta categoría.</p>
        )}
      </div>
    </div>
  );
}
