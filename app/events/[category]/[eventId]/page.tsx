"use client";

import { useEffect, useState } from 'react';
import BlurFade from "@/components/ui/blur-fade";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { AlarmClock, CalendarDays, MapPinned, Receipt } from "lucide-react";
import EventToCalendar from "@/components/eventCalendar/eventCalendar";
import ServicesSection from "@/components/servicesSection/servicesSection";
import CountdownTimer from "@/components/countDown/countDown";
import SocialMediaLinks from "@/components/socialMediaLinks/socialMediaLinks";

interface Event {
  _id: string;
  title: string;
  subTitle: string;
  price: string;
  location: string;
  locationUrl: string;
  time: string;
  eventDate: string;
  instagram: string;
  tiktok: string;
  image: string;
}

export default function EventDetailPage({
  params,
}: {
  params: { category: string; eventId: string };
}) {
  const { eventId } = params;
  const { translations } = useThemeLanguage();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data);        
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p>Cargando evento...</p>;
  if (!event) return <p className="text-5xl p-12 font-bold">{translations.rankingEventPage.notFound}</p>;

  const dateObj = new Date(event.eventDate)
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

  const day = dateObj.toLocaleDateString("es-ES", { weekday: "long" });
const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

  const formattedDate = dateObj.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const eventWithDetails = {
    ...event,
    time: formattedTime,
    day: dayCapitalized, 
    image: event.image || "",
    date: formattedDate
  };

  console.log("Hora:", formattedTime);     
  console.log("Día:", dayCapitalized);
  console.log("Fecha:", formattedDate); 

  return (
    <BlurFade delay={0.25} inView>
      <div className="mt-10 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-6 flex flex-col  justify-center">
            <h1 className="font-bold text-9xl">{event.title}</h1>
            <h2 className="font-semibold text-3xl">{event.subTitle}</h2>
          </div>
          <div className="w-full lg:w-1/2 p-6 flex flex-col  justify-center items-center">
            <h2 className="text-3xl font-bold mb-4 text-center">Detalles del Evento</h2>

            <div className="grid grid-cols-1 gap-6 p-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-full">
                  <CalendarDays className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Fecha:</p>
                  <p className="text-sm">
                    {`
                    ${dayCapitalized}, ${formattedDate}
                    `}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-full">
                  <AlarmClock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Hora:</p>
                  <p className="text-sm">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-full">
                  <Receipt className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Precio:</p>
                  <p className="text-sm">{event.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-full">
                  <MapPinned className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Ubicación:</p>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="print-area">
        <EventToCalendar event={eventWithDetails} />
        </div>
        <SocialMediaLinks
          instagramUrl={event.instagram}
          tiktokUrl={event.tiktok}
        />
          <BlurFade delay={0.25} inView>
          <div className="relative h-[19vh] sm:h-[30vh] lg:h-[65vh] xl:h-[79vh] w-full overflow-hidden mt-10">
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover bg-red-200"
              src="https://www.youtube.com/embed/31kplxJn6nw?autoplay=1&mute=1&controls=0&loop=1&playlist=31kplxJn6nw&showinfo=0&modestbranding=1"
              title="Event Background Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <h1 className="text-white text-3xl lg:6xl font-extrabold drop-shadow-md text-center p-4">
                Disfruta el tuning.
              </h1>
            </div>
          </div>
        </BlurFade>
        <CountdownTimer eventDate={event.eventDate} />
        <ServicesSection />
      </div>
    </BlurFade>
  );
}
