// /rankings/[category]/[eventId]/page.tsx
"use client";

// import { useState, useEffect } from "react";
import { eventsData } from "../../data/data";
// import Multi from "@/components/slider/multi/multi";
// import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";

// import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import Download from "yet-another-react-lightbox/plugins/download";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// import { Button } from "@/components/ui/button";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import Particles from "@/components/ui/particles";
import { AlarmClock, CalendarDays, MapPinned, Receipt } from "lucide-react";
import EventToCalendar from "@/components/eventCalendar/eventCalendar";

export default function EventDetailPage({
  params,
}: {
  params: { category: string; eventId: string };
}) {
  const { category, eventId } = params;
  const { translations } = useThemeLanguage();

  const event = eventsData[category as keyof typeof eventsData]?.find(
    (e) => e.url === eventId
  );

  // const [showFullDescription, setShowFullDescription] = useState(false);
  // const [charLimit, setCharLimit] = useState(120);
  // const [isAnimating, setIsAnimating] = useState(false);
  // const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // useEffect(() => {
  //   const updateCharLimit = () => {
  //     if (window.matchMedia("(min-width: 1024px)").matches) {
  //       setCharLimit(1000);
  //     } else {
  //       setCharLimit(120);
  //     }
  //   };

  //   updateCharLimit();
  //   window.addEventListener("resize", updateCharLimit);

  //   return () => window.removeEventListener("resize", updateCharLimit);
  // }, []);

  if (!event)
    return (
      <p className="text-5xl p-12 font-bold">
        {translations.rankingEventPage.notFound}
      </p>
    );

  // const toggleDescription = () => {
  //   setIsAnimating(true);
  //   setShowFullDescription((prevState) => {
  //     if (prevState) {
  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }
  //     return !prevState;
  //   });
  // };

  // const images = event.images.map((img: string) => ({
  //   src: img,
  //   downloadUrl: img,
  // }));

  return (
    <BlurFade delay={0.25} inView>
      <div className="mt-10 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-6 flex flex-col  justify-center">
            <h1 className="font-bold text-9xl">{event.title}</h1>
            <h2 className="font-semibold text-3xl">{event.subTitle}</h2>

            {/* <p className="text-gray-500 mb-4">{translations.rankingEventPage.date}: {event.date}</p> */}
          </div>
          <div className="w-full lg:w-1/2 p-6 flex flex-col  justify-center items-center">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Detalles del Evento
            </h2>

            <div className="grid grid-cols-1 gap-6 p-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-full">
                  <CalendarDays className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Fecha:</p>
                  <p className="text-sm">{event.date} - 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-full">
                  <AlarmClock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Hora:</p>
                  <p className="text-sm">{event.time}</p>
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
          <EventToCalendar event={event}/>

        </div>
        {/* <h2 className='text-4xl font-bold mt-10 mb-10 pl-12 pr-12'>{translations.rankingEventPage.results}</h2> */}
{/* 
        <div className="text-center mt-10 mb-10">
          <Button onClick={() => setIsLightboxOpen(true)}>
            {translations.rankingEventPage.pictures}
          </Button>
        </div>

        {isLightboxOpen && (
          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            slides={images}
            plugins={[Download, Thumbnails]}
            thumbnails={{ position: "bottom" }}
          />
        )}

        <h2 className="font-bold text-5xl mb-4 pl-12 pr-12 mt-5">
          {translations.rankingEventPage.upcomingEvents}
        </h2>
        <Multi />
        <Image
          src={event.image}
          alt={event.title}
          width={500}
          height={500}
          className="max-h-80 rounded-xl"
        />
        <p className="text-lg mb-2 mt-2">
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
                className="font-bold underline cursor-pointer"
                onClick={toggleDescription}
              >
                {showFullDescription ? " Ver menos" : " Ver más"}
              </span>
            </>
          )}
        </p> */}
        <Particles
        className="absolute inset-0"
        quantity={400}
        ease={80}
        refresh
      />
      </div>
      
    </BlurFade>
  );
}
