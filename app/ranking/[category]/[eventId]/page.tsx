// /rankings/[category]/[eventId]/page.tsx
'use client';

import { eventData } from '../../data/data';
import Multi from '@/components/slider/multi/multi';
import RankingDataTable from '@/components/rankingTable/rankingTable';

export default function EventDetailPage({ params }: { params: { category: string; eventId: string } }) {
  const { category, eventId } = params;

  const event = eventData[category as keyof typeof eventData]?.find(e => e.id === Number(eventId));
  
  if (!event) return <p className='text-5xl p-12 font-bold'>Evento no encontrado</p>;

  return (
    <div className="p-12 mt-10">
      <h1 className="font-bold text-5xl mb-4">{event.title} - {event.date}</h1>
      <p className="text-lg text-gray-400 mb-2">{event.description}</p>
      <p className="text-gray-500 mb-4">Fecha: {event.date}</p>
      <h2 className='text-4xl font-bold mt-10 mb-10'>Aqui te dejamos los resultados de la fecha:</h2>
      {/* <Image src={event.image} alt={event.title} width={500} height={500}/> */}
      <RankingDataTable/>
      <Multi/>
      
    </div>
  );
}
