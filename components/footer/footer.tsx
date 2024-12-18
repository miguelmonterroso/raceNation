'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { Instagram } from 'lucide-react';
// import { Facebook, Twitter } from 'lucide-react';
import BlurFade from '../ui/blur-fade';

export default function Footer() {
  const { translations } = useThemeLanguage();

  return (
    <BlurFade delay={0.25} inView>
    <footer className="bg-background text-foreground py-8 ">
      <div className="container mx-auto grid gap-8 md:grid-cols-3 p-10 lg:p-0">
        
        <div>
          <h2 className="text-2xl font-semibold">RaceNation</h2>
          <p className="mt-2 text-sm">{translations.footer.description}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold">{translations.footer.quickLinks}</h3>
          <ul className="mt-2 space-y-1">
            <li><Link href="/">{translations.navbar.home}</Link></li>
            <li><Link href="/events">{translations.navbar.upcomingEvents}</Link></li>
            <li><Link href="/ranking">{translations.navbar.ranking}</Link></li>
            <li><Link href="/blog">{translations.navbar.blog}</Link></li>
            <li><Link href="/recommendations">{translations.navbar.recommendations}</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold">{translations.footer.contact}</h3>
          <p className="mt-2 text-sm">{translations.footer.email}: contact@racenationhub.com</p>
          {/* <p className="text-sm">{translations.footer.phone}: +502 1234-5678</p> */}
          <div className="flex gap-4 mt-4">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6" />
            </a> */}
            <a href="https://instagram.com/racenationhub" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6" />
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6" />
            </a> */}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        © 2024 RaceNation. {translations.footer.rightsReserved}
      </div>
    </footer>
    </BlurFade>
  );
}
