'use client';

import { useEffect, useState } from 'react';
import BlurFade from '@/components/ui/blur-fade';
import Card from '@/components/card/card';

interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  link: string;
  image: string;
}

export default function EventCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events?category=${category}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return (
    <BlurFade delay={0.25} inView>
      <div className='p-12 mt-10'>
        <h1 className='font-bold text-5xl mb-10'>Próximos Eventos de {category}</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {loading ? (
            <p>Cargando eventos...</p>
          ) : events.length > 0 ? (
            events.map(event => (
              <Card key={event._id} 
                title={event.title} 
                description={event.description} 
                link={event.link} 
                image={event.image} 
                date={event.eventDate}
              />
            ))
          ) : (
            <p>No hay eventos próximos para esta categoría.</p>
          )}
        </div>
      </div>
    </BlurFade>
  );
}
