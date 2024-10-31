'use client';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Home() {
  const { toggleLanguage, isDarkMode, toggleTheme, translations } = useThemeLanguage();

  return (
    <div className="w-full">
      <h1>{translations.welcomeText}</h1>

      <button
        onClick={toggleLanguage}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
      >
        {translations.changeLangButton}
      </button>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition"
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}
