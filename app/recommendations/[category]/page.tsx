// /recommendations/[category]/page.tsx
'use client';

import Card from '@/components/card/card';
import BlurFade from '@/components/ui/blur-fade';

const eventData = {
  paint: [
    { id: 1, title: "Bengala", description: "High-speed drag racing", link: "/", image: "https://images.unsplash.com/photo-1693762462997-e33980ab0cd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Taller de la ciudad", description: "Exciting drag races", link: "/", image: "https://images.unsplash.com/photo-1689827022229-f84c24d8c61d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Taller Pintura 2", description: "Exciting drag races", link: "/", image: "https://images.unsplash.com/photo-1682428609721-af4d46215283?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Taller Pintura 3", description: "Exciting drag races", link: "/", image: "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  mechanics: [
    { id: 1, title: "V-tri Motors", description: "Showcase of modified cars", link: "/", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Tecnomotor", description: "Tuning competition", link: "/", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  tuners: [
    { id: 1, title: "Tuner 1", description: "Showcase of modified cars", link: "/", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Tuner 2", description: "Tuning competition", link: "/", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  imports: [
    { id: 1, title: "importador 1", description: "Showcase of modified cars", link: "/", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "importador 2", description: "Tuning competition", link: "/", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  parts: [
    { id: 1, title: "parts 1", description: "Showcase of modified cars", link: "/", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "parts 2", description: "Tuning competition", link: "/", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  detailing: [
    { id: 1, title: "detailer 1", description: "Showcase of modified cars", link: "/", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "detailer 2", description: "Showcase of modified cars", link: "/", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  blackList: [
    { id: 1, title: "Marco Gonzalez", description: "Por hueco y feo",  link: "/", image: "https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Mario Torres", description: "Por caco y marica",  link: "/", image: "https://images.unsplash.com/photo-1696092516075-848e47759e7d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]
};

export default function RecommendationsCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const events = eventData[category as keyof typeof eventData] || [];

  return (
    <BlurFade delay={0.25} inView>
    <div className='p-12 mt-10'>
      <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl mb-10'>Recomendaciones</h1>
      <div className="flex gap-5 flex-wrap justify-center">
        {events.length > 0 ? (
          events.map(event => <Card key={event.id} {...event} />)
        ) : (
          <p>No hay recomendaciones para esta categoría.</p>
        )}
      </div>
    </div>
    </BlurFade>

  );
}
