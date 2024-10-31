'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '../locales/translations.json';

type Language = 'es' | 'en';

interface ThemeLanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  translations: typeof translations[Language];
}

const ThemeLanguageContext = createContext<ThemeLanguageContextProps | undefined>(undefined);

export const ThemeLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');
  
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    const storedTheme = localStorage.getItem('isDarkMode') === 'true';

    if (storedLanguage) setLanguage(storedLanguage);
    setIsDarkMode(storedTheme || true);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        isDarkMode,
        toggleTheme,
        translations: translations[language],
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};
