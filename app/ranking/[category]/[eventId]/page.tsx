// /rankings/[category]/[eventId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { eventData } from '../../data/data';
import Multi from '@/components/slider/multi/multi';
import RankingDataTable from '@/components/rankingTable/rankingTable';
import Image from 'next/image';
import BlurFade from '@/components/ui/blur-fade';

// Importa el Lightbox y el plugin de descarga
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Download from 'yet-another-react-lightbox/plugins/download';
import { Button } from '@/components/ui/button';

export default function EventDetailPage({ params }: { params: { category: string; eventId: string } }) {
  const { category, eventId } = params;

  const event = eventData[category as keyof typeof eventData]?.find(e => e.url === eventId);
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [charLimit, setCharLimit] = useState(120);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Estado para manejar la apertura del lightbox

  useEffect(() => {
    const updateCharLimit = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setCharLimit(1000); 
      } else {
        setCharLimit(120); 
      }
    };

    updateCharLimit(); 
    window.addEventListener('resize', updateCharLimit); 

    return () => window.removeEventListener('resize', updateCharLimit);
  }, []);

  if (!event) return <p className='text-5xl p-12 font-bold'>Evento no encontrado</p>;

  const toggleDescription = () => {
    setIsAnimating(true);
    setShowFullDescription(prevState => {
      if (prevState) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return !prevState;
    });
  };

  // Configuración de imágenes para el lightbox
  const images = event.images.map((img: string) => ({
    src: img,
    downloadUrl: img, // URL de la imagen para que sea descargable
  }));

  return (
    <BlurFade delay={0.25} inView>
      <div className="mt-10">
        <h1 className="font-bold text-5xl mb-4 pl-12 pr-12">{event.title} - {event.date}</h1>
        <div className='flex flex-col lg:flex-row pl-12 pr-12'>
          <div className='pr-20'>
            <p className="text-lg text-gray-400 mb-2 mt-2">
              {event.description.length <= charLimit ? (
                event.description
              ) : (
                <>
                  {showFullDescription ? (
                    <BlurFade delay={0.2} inView={isAnimating}>
                      {event.description}
                    </BlurFade>
                  ) : (
                    `${event.description.slice(0, charLimit)}... `
                  )}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? " Ver menos" : " Ver más"}
                  </span>
                </>
              )}
            </p>
            <p className="text-gray-500 mb-4">Fecha: {event.date}</p>
          </div>
          <Image src={event.image} alt={event.title} width={500} height={500} className='max-h-80'/>
        </div>
        <h2 className='text-4xl font-bold mt-10 mb-10 pl-12 pr-12'>Aquí te dejamos los resultados de la fecha:</h2>
        <RankingDataTable/>

        {/* Botón para abrir el lightbox */}
        <div className="text-center mt-10 mb-10">
          <Button onClick={() => setIsLightboxOpen(true)}>
            Ver fotos del evento
          </Button>

        </div>

        {isLightboxOpen && (
          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            slides={images}
            plugins={[Download]}
          />
        )}

        <Multi/>
      </div>
    </BlurFade>
  );
}
