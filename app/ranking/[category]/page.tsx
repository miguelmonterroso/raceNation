// /ranking/[category]/page.tsx
'use client';

import Card from '@/components/card/card';

const eventData = {
  topSpeed: [
    { id: 1, title: "Top Speed Race Event 1", description: "High-speed drag racing", date: "2024-12-01" },
    { id: 2, title: "Top Speed Race Event 2", description: "Exciting drag races", date: "2024-12-15" },
  ],
  lapTime: [
    { id: 1, title: "Best time Show 1", description: "Showcase of modified cars", date: "2024-11-10" },
    { id: 2, title: "Bes time Show 2", description: "Tuning competition", date: "2024-11-20" },
  ]
};

export default function RankingCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const events = eventData[category as keyof typeof eventData] || [];

  return (
    <div>
      <h1>Rankings de categoria {category}</h1>
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
