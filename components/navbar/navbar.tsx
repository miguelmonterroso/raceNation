'use client'
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import Link from 'next/link';
import { Languages, Moon, Sun} from 'lucide-react';

export default function Navbar() {
  const { toggleLanguage, isDarkMode, toggleTheme, translations } = useThemeLanguage();

  return (
    <nav className="flex items-center justify-between bg-background text-foreground shadow-md pb-4">
      <div className="text-lg font-semibold">
        {translations.welcomeText}
      </div>

      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          {translations.navbar.home}
        </Link>
        <Link href="/ranking" className="hover:underline">
          {translations.navbar.ranking}
        </Link>
        <Link href="/upcoming-events" className="hover:underline">
          {translations.navbar.upcomingEvents}
        </Link>
        <Link href="/blog" className="hover:underline">
          {translations.navbar.blog}
        </Link>
        <Link href="/recommendations" className="hover:underline">
          {translations.navbar.recommendations}
        </Link>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
        >
          <Languages/>
        </button>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition"
        >
          {isDarkMode ? <Sun/> : <Moon/>}
        </button>
      </div>
    </nav>
  );
}
