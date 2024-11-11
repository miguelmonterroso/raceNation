import { UtensilsCrossed, Crown, ShoppingBag } from 'lucide-react'; // Íconos representativos

const ServicesSection = () => {
  return (
    <div className="mt-10 p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Servicios Disponibles en el Evento</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Zona de Comida */}
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg">
          <div className="p-4 bg-primary rounded-full mb-4">
            <UtensilsCrossed className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Zona de Comida</h3>
          <p className="text-center text-lg">
            Disfruta de una variedad de food trucks y puestos de comida con opciones para todos los gustos.
          </p>
        </div>

        {/* Zonas VIP */}
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg">
          <div className="p-4 bg-primary rounded-full mb-4">
            <Crown className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Zona VIP</h3>
          <p className="text-center text-lg">
            Acceso exclusivo a áreas VIP con vistas privilegiadas, atención personalizada y servicios premium.
          </p>
        </div>

        {/* Merchandising */}
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg">
          <div className="p-4 bg-primary rounded-full mb-4">
            <ShoppingBag className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Merchandising</h3>
          <p className="text-center text-lg">
            Encuentra productos exclusivos del evento: camisetas, gorras y más, ¡lleva un recuerdo a casa!
          </p>
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;
