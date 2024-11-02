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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as Language;
      const storedTheme = localStorage.getItem('isDarkMode');
      
      if (storedLanguage) setLanguage(storedLanguage);
      if (storedTheme !== null) setIsDarkMode(storedTheme === 'true');

      document.documentElement.classList.add(storedTheme === 'true' ? 'dark' : 'light');
      document.documentElement.classList.remove(storedTheme === 'true' ? 'light' : 'dark');
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('language', language);
    }
  }, [language, isClient]);

  useEffect(() => {
    if (isClient) {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      localStorage.setItem('isDarkMode', String(isDarkMode));
    }
  }, [isDarkMode, isClient]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (!isClient) {
    return null;
  }

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
