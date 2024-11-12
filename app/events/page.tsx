'use client';

import BlurFade from '@/components/ui/blur-fade';
import Card from '@/components/card/card';
import { useEffect, useState } from 'react';
interface Category {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export default function EventsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://racenationhub.com/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
  <BlurFade delay={0.25} inView>
      <div className='p-12'>
        <h1 className='font-bold text-5xl'>Explora los próximos eventos</h1>
        <p className='text-lg mt-3'>Selecciona una categoría para ver los eventos disponibles:</p>
        <div className="flex gap-5 flex-wrap justify-center mt-10">
          {loading ? (
            <p>Cargando categorías...</p>
          ) : categories.length > 0 ? (
            categories.map(category => (
              <Card key={category._id} 
                title={category.title} 
                description={category.description} 
                link={category.link} 
                image={category.image} 
              />
            ))
          ) : (
            <p>No hay categorías de eventos disponibles.</p>
          )}
        </div>
      </div>
    </BlurFade>

  );
}
