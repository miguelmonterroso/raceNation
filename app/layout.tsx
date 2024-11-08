import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeLanguageProvider } from "../context/ThemeLanguageContext";
import Navbar from "../components/navbar/navbar";
import BlurFade from "@/components/ui/blur-fade";
import Footer from "@/components/footer/footer";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumb from "@/components/breadCrumb/breadCrumb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RaceNation",
  description:
    "RaceNation es la plataforma definitiva para entusiastas del automovilismo en Guatemala. Encuentra los últimos eventos de carreras, clasificaciones en tiempo real y contenido exclusivo para fanáticos de drag, drift, y tuning. Únete a la comunidad que vive la pasión por la velocidad y mantente al tanto de los próximos eventos en la escena del automovilismo.",
  openGraph: {
    title: "RaceNation - La Comunidad del Automovilismo",
    description:
      "RaceNation es la plataforma definitiva para entusiastas del automovilismo en Guatemala. Encuentra los últimos eventos, rankings y contenido exclusivo de drag, drift, y tuning.",
    url: "https://racenationhub.com",
    type: "website",
    images: [
      {
        url: "https://racenationhub.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RaceNation - La Comunidad del Automovilismo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center`}
      >
        <ThemeLanguageProvider>
          <div className="w-full  flex flex-col justify-center">
            <BlurFade delay={0.25} inView>
            <Navbar />
            <DynamicBreadcrumb/>
            {children}
            </BlurFade>
            <Separator className="mt-10"/>
            <Footer/>
            
          </div>
          
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
