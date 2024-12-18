import BlurFade from '@/components/ui/blur-fade';
import Card from '@/components/card/card';

const eventData = {
  events: [
    { id: 1, title: "Enderezado y pintura", description: "Expertos en pintura", link: "/recommendations/paint", image: "https://images.unsplash.com/photo-1591278169757-deac26e49555?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Mecanica General", description: "Expertos en mecanica", link: "/recommendations/mechanics", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Tuners", description: "Los mejores tuners en tu region", link: "/recommendations/tuners", image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Importadores", description: "Listo para tu proxima compra?", link: "/recommendations/imports", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Car parts", description: "Los mejores car shops", link: "/recommendations/parts", image: "https://images.unsplash.com/photo-1532329521746-bf9397448e42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Detailing", description: "Deja tu vehiculo como nuevo", link: "/recommendations/detailing", image: "https://images.unsplash.com/photo-1681163101469-5175a8925526?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: "Black List", description: "No caigas en sus garras", link: "/recommendations/blackList", image: "https://images.unsplash.com/photo-1537090357686-51aaa968f2ab?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ]
};

export default function RecommendationsPage() {

  const events = eventData.events;

  return (
    <BlurFade delay={0.25} inView>
    <div className='p-12'>
      <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl'>Explora nuestras recomendaciones</h1>
      <p className='text-lg mt-3'>Selecciona una categoria para ver las recomendaciones:</p>
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
