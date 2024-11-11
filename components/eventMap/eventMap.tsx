import React from 'react';
import { Button } from '../ui/button';

interface MapProps {
  locationUrl: string;
}

export default function EventMap({ locationUrl }: MapProps) {
  return (
    <div className="mt-10">
      <h2 className="text-4xl font-bold mb-4 text-center">Ubicación del Evento</h2>
      <div className="flex justify-center mb-6">
        <iframe
          src={locationUrl}
          width="600"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationUrl)}`, '_blank')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Abrir en Google Maps
        </Button>

        <Button
          onClick={() => window.open(`https://waze.com/ul?ll=${encodeURIComponent(locationUrl)}`, '_blank')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Abrir en Waze
        </Button>
      </div>
    </div>
  );
};

