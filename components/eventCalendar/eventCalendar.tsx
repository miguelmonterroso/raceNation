import html2canvas from 'html2canvas';
import { CalendarDays, AlarmClock, Receipt, MapPinned } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  
import Image from 'next/image';
interface EventDetails {
    title: string;
    subTitle: string;
    date: string;
    time: string;
    endTime?: string;
    price: string;
    location: string;
    day: string;
    image: string;
  }

const EventToCalendar = ({ event }: { event: EventDetails }) => {

    const downloadAsJpeg = () => {
     const hiddenTableElement = document.getElementById("hidden");
    if (hiddenTableElement) {
      hiddenTableElement.style.display = "block";

      setTimeout(() => {
        html2canvas(hiddenTableElement, {
          backgroundColor: "black",
          scale: 2,
        }).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/jpeg", 1.0);
          link.download = "ranking_table.jpeg";
          link.click();

          hiddenTableElement.style.display = "none";
        });
      }, 100);
    }
    }


  return (
    <>
    <div className='flex justify-center items-center w-full'>
        <Button onClick={downloadAsJpeg}>
            Descargar Invitacion
        </Button>
    </div>
        
    <div id='hidden' className='bg-white h-screen w-[650px] min-h-[900px] max-h-[900px]'
          style={{
          display: "none",
          position: "absolute",
          bottom: "-9999px",
        }}
    >
      <div className='w-full h-full flex items-center justify-center'>
      <Card className='min-w-[500px] max-w-[550px] shadow-5xl bg-gradient-to-tr from-violet-600 via-violet-600 to-fuchsia-600 border-none rounded-none flex flex-col justify-center items-center min-h-[750px]'>
            <CardHeader>
                <Image src={event.image} alt="test" width={500} height={300} className='rounded-none opacity-70 min-h-[290px] max-h-[290px] object-cover'/>
            </CardHeader>
            <CardContent className='bg-white p-10 h-full font-mono min-h-[400px] flex flex-col justify-center m-4 min-w-[500px] max-w-[500px]'>
                <CardTitle className='text-sky-700 font-bold text-5xl mb-5 font-sans'>
                    {event.title}
                </CardTitle>
                <CardDescription className='text-slate-700 mb-2 flex items-center gap-5 text-md'>
                    <CalendarDays className="w-6 h-6 text-secondary" />
                    {event.day}, {event.date}
                    </CardDescription>
                <p className='text-slate-700 text-md mb-2 flex items-center gap-5'>
                    <AlarmClock className="w-6 h-6 text-secondary" />
                    {event.time} AM
                </p>
                <p className='text-slate-700 text-md mb-2 flex items-center gap-5'>
                    <MapPinned className="w-6 h-6 text-secondary" />
                    {event.location}
                </p>
                <p className='text-slate-700 text-md flex items-center gap-5'>
                    <Receipt className="w-6 h-6 text-secondary" />
                    Q {event.price}
                </p>

            </CardContent>
        </Card>
      </div>

    </div>

    </>
  );
};

export default EventToCalendar;
