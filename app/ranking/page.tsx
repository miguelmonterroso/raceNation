'use client';

import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function Ranking() {
  const { toggleLanguage, isDarkMode, toggleTheme, translations } = useThemeLanguage();

  return (
    <div className="w-full">
      <h1>{translations.rankingTitle || "Ranking"}</h1>
      <p>{translations.rankingDescription || "View the current rankings of cars."}</p>

      <button
        onClick={toggleLanguage}
        className="px-4 py-2 mt-4 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
      >
        {translations.changeLangButton}
      </button>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 mt-4 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition"
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <div className="mt-8">
        <p>Ranking content goes here...</p>
      </div>
    </div>
  );
}
