'use client';

import Slider from '@/components/slider/slider';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import BlurFade from '@/components/ui/blur-fade';
import BentoBox from '@/components/bentoBox/bentoBox';

export default function Home() {
  const { translations } = useThemeLanguage();

  return (
    <div>
      <BlurFade delay={0.45} inView>
        <Slider/>

        <div className='h-screen flex flex-col items-center p-5'>
          <BlurFade delay={0.25} inView>
            <h1 className='font-bold text-5xl mt-10'>{translations.home.headerTitle}</h1>
            <BentoBox/>
          </BlurFade>
        </div>
      </BlurFade>
    </div>
  );
}
