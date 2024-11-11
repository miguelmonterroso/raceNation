import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ eventDate }: { eventDate: string }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <div className="mt-10 p-6 text-center">
      <h2 className="text-4xl font-bold mb-6">El evento comienza en:</h2>
      <div className="flex justify-center gap-6 text-4xl font-bold">
        <div>
          {timeLeft.days} <span className="text-lg font-normal">días</span>
        </div>
        <div>
          {timeLeft.hours} <span className="text-lg font-normal">horas</span>
        </div>
        <div>
          {timeLeft.minutes} <span className="text-lg font-normal">minutos</span>
        </div>
        <div>
          {timeLeft.seconds} <span className="text-lg font-normal">segundos</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
