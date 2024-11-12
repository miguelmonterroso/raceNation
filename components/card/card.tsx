import Image from 'next/image';
import Link from 'next/link';
import { MagicCard } from '../ui/magic-card';

interface CardProps {
  title: string;
  description?: string;
  date?: string;
  link: string;
  image: string;
}

export default function Card({ title, date, link, image }: CardProps) {
  const dateObj = date ? new Date(date) : null;

  const formattedTime = dateObj
    ? `${dateObj.getUTCHours() % 12 || 12}:${dateObj.getUTCMinutes()
        .toString()
        .padStart(2, '0')} ${dateObj.getUTCHours() >= 12 ? 'PM' : 'AM'}`
    : null;

  const dayCapitalized = dateObj
    ? dateObj.toLocaleDateString("es-ES", { weekday: "long", timeZone: 'UTC' }).charAt(0).toUpperCase() +
      dateObj.toLocaleDateString("es-ES", { weekday: "long", timeZone: 'UTC' }).slice(1)
    : null;

  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: 'UTC'
      })
    : null;

  return (
    <Link href={link}>
      <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-72 w-full relative min-h-56 max-h-56 lg:max-h-0">
        <div className="absolute w-full h-full flex justify-center flex-col opacity-100 p-10">
          <h3 className="text-lg lg:text-2xl font-bold mb-2">{title}</h3>
          {date && (
            <p className="text-xs mt-2">
              {`${dayCapitalized}, ${formattedDate} - ${formattedTime}`}
            </p>
          )}
        </div>
        <Image
          src={image}
          width={520}
          height={520}
          objectFit="cover"
          priority
          className="rounded-md transition-all duration-300 opacity-30"
          alt="image"
        />
      </MagicCard>
    </Link>
  );
}
