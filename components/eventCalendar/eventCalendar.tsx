import html2canvas from 'html2canvas';
import { CalendarDays, AlarmClock, Receipt, MapPinned } from 'lucide-react';
import { saveAs } from 'file-saver';
import { Button } from '../ui/button';

interface EventDetails {
    title: string;
    subTitle: string;
    date: string;
    time: string;
    endTime?: string;
    price: string;
    location: string;
  }

const EventToCalendar = ({ event }: { event: EventDetails }) => {
  const handleAddToCalendar = async () => {
    const element = document.getElementById('event-details');
    if (element) {
      const canvas = await html2canvas(element);
      const dataURL = canvas.toDataURL('image/png');
      const blob = await (await fetch(dataURL)).blob();
      saveAs(blob, `${event.title}-evento.png`);
    }

    const icsContent = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${event.title}
    DESCRIPTION:${event.subTitle}
    LOCATION:${event.location}
    DTSTART:${formatDateToICS(event.date)}T${formatTimeToICS(event.time)}
    DTEND:${formatDateToICS(event.date)}T${formatTimeToICS(event.endTime ?? event.time)}
    END:VEVENT
    END:VCALENDAR`;
    

    const icsBlob = new Blob([icsContent], { type: 'text/calendar' });
    saveAs(icsBlob, `${event.title}.ics`);
  };

  const formatDateToICS = (date: string): string => {
    return date.replace(/-/g, ''); // Formato YYYYMMDD
  };

  const formatTimeToICS = (time: string): string => {
    return time.replace(/:/g, '') + '00'; // Formato HHMMSS
  };

  return (
    <div className="event-wrapper">
      <div id="event-details" className="flex flex-col lg:flex-row bg-black p-6 rounded-lg shadow-lg">
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="font-bold text-5xl">{event.title}</h1>
          <h2 className="font-semibold text-3xl">{event.subTitle}</h2>
        </div>
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4 text-center">Detalles del Evento</h2>
          <div className="grid grid-cols-1 gap-6 p-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-full">
                <CalendarDays className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-lg font-semibold">Fecha:</p>
                <p className="text-sm">{event.date}</p>
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
      <Button
        onClick={handleAddToCalendar}
        className="mt-6 px-4 py-2 rounded-lg"
      >
        Añadir al Calendario
      </Button>
    </div>
  );
};

export default EventToCalendar;
