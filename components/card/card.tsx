import Image from 'next/image';
import Link from 'next/link';
import { MagicCard } from '../ui/magic-card';

interface CardProps {
  title: string;
  description?: string;
  date: string;
  link: string;
  image: string;
}

export default function Card({ title, date, link, image }: CardProps) {
  const dateObj = new Date(date);

  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0'); // Agrega un "0" si es necesario
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

  const day = dateObj.toLocaleDateString("es-ES", { weekday: "long", timeZone: 'UTC' });
  const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

  const formattedDate = dateObj.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: 'UTC'
  });

  return (
    <Link href={link}>
      <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-72 w-full relative min-h-56 max-h-56 lg:max-h-0">
        <div className="absolute w-full h-full flex justify-center flex-col opacity-100 p-10">
            <h3 className="text-lg lg:text-2xl font-bold mb-2">{title}</h3>
            <p className="text-xs mt-2">{`${dayCapitalized}, ${formattedDate} - ${formattedTime}`}</p>
        </div>
        <Image
          src={image}
          width={520}
          height={520}
          objectFit='cover'
          priority
          className="rounded-md transition-all duration-300 opacity-30"
          alt="image"
        />
       
      </MagicCard>
    </Link>
  );
}
