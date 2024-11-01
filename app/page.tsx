'use client';

import Slider from '@/components/slider/slider';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Home() {
  const { translations } = useThemeLanguage();

  return (
    <div>
      <Slider/>
      
      <h1>{translations.home.headerTitle}</h1>

    </div>
  );
}
