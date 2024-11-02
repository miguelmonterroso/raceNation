import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeLanguageProvider } from "../context/ThemeLanguageContext";
import Navbar from "../components/navbar/navbar";
import BlurFade from "@/components/ui/blur-fade";
import Footer from "@/components/footer/footer";
import { Separator } from "@/components/ui/separator";
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
  description: "RaceNation - Car Community",
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
