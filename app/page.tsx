'use client';

import Slider from '@/components/slider/slider';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import BlurFade from '@/components/ui/blur-fade';

export default function Home() {
  const { translations } = useThemeLanguage();

  return (
    <div>
      <BlurFade delay={0.25} inView>
        <Slider/>

        <div className='h-screen flex flex-col items-center p-5'>
          <BlurFade delay={0.25} inView>
            <h1 className='font-bold text-5xl mt-10'>{translations.home.headerTitle}</h1>

          </BlurFade>
        </div>
      </BlurFade>
    </div>
  );
}
