import BlurFade from '@/components/ui/blur-fade';
import Card from '@/components/card/card';

const eventData = {
  events: [
    { id: 1, title: "Drag", description: "Enterate de los resultados de eventos de 1/4 de milla", date: "2024-12-01", link: "/ranking/topSpeed", image: "https://images.unsplash.com/photo-1693762462997-e33980ab0cd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Circuit", description: "Enterate de los resultados de eventos de circuito", date: "2024-12-15", link: "/ranking/lapTime", image: "https://images.unsplash.com/photo-1689827022229-f84c24d8c61d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ]
};

export default function RankingPage() {

  const events = eventData.events;

  return (
    <BlurFade delay={0.25} inView>
    <div className='p-12'>
      <h1 className='font-bold text-5xl'>Explora el Ranking</h1>
      <p className='text-lg mt-3'>Selecciona una categoría para ver los rankings disponibles:</p>
      <div className="flex gap-5 flex-wrap justify-center mt-10">
        {events.length > 0 ? (
          events.map(event => <Card key={event.id} {...event} />)
        ) : (
          <p>No hay eventos próximos para esta categoría.</p>
        )}
      </div>
    </div>
    </BlurFade>

  );
}
