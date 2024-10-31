'use client';

import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Home() {
  // Accedemos al contexto
  const {  toggleLanguage, isDarkMode, toggleTheme, translations } = useThemeLanguage();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      {/* Texto en el idioma seleccionado */}
      <h1>{translations.welcomeText}</h1>

      {/* Botón para cambiar el idioma */}
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
      >
        {translations.changeLangButton}
      </button>

      {/* Botón para cambiar el tema */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition"
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}
