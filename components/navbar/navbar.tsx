"use client";
import * as React from "react";
import Link from "next/link";
import { useThemeLanguage } from "../../context/ThemeLanguageContext";
import { Languages, Moon, Sun, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const { toggleLanguage, isDarkMode, toggleTheme, translations } = useThemeLanguage();
  const [hoveredOption, setHoveredOption] = React.useState<string | null>("drag-race");

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const imageMap: { [key: string]: string } = {
    "drag-race":
      "https://images.unsplash.com/photo-1606073312738-bedd7bd45361?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    drift:
      "https://images.unsplash.com/photo-1530538604540-de0436821dc9?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "tuning-show":
      "https://images.unsplash.com/photo-1691285833490-272a431041d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <nav className="flex items-center justify-between bg-background text-foreground shadow-md pb-4 lg:pb-3 px-4 p-6 mb-3">
      <Link href="/">
        {/* <div className="text-lg font-semibold">RaceNation</div> */}
        <svg color="currentColor" version="1.1" viewBox="0 0 2048 1193" width="90" height="90" xmlns="http://www.w3.org/2000/svg">
<path transform="translate(1756,92)" d="m0 0 5 1 5 5 3 4 4 11 2 17v8l-2 17-11 20-10 13-6 7-6 5-7 9-1 7 4 1 1 10 3 2 1 9 4 1 3 4v2l6 2 4 2 12 1 14-2 10 1 3 4 6 22 5 23 9 34 12 43 7 23 2 9v7l-10 8-20 12-8 6v7l4 5 1 16 3 3 1 51 3 5 1 15 3 1 1 21 3 1 3 9 2 2v10l4 1 1 2 1 10 4-1 23-12 14-7h7l4 6 5 13 3 16 6 24 4 19 5 17 5 19 9 32 3 8v8l-8 6-26 14-28 13-21 10-7 4-13 2h-4l-2 9-5 22-2 22-2 5-1 9v16l2 6 3 1 4 8 6 15 5 25 5 17 1 5v9l-5 4-20 6-40 9-41 6-26 3h-10l-4-2-30-2h-38l-34 3h-30l-31-3-41-6-39-7-17-2-24-6-12-4-26-6-22-4-42-11-16-6-5-5-7-4-11-5-26-10v-2l-5-1-10-4-11-1-4 2-1 5-2 2h-7-1l-5 1h-11l-9 3-8 4-4 3-9 3-7 5-1 2-10 4-4 1-1 4-4 3h-2l-2 5-3 5 1 3-3 5-4 5-1 4-4 2 5 12 9 11 6 9v6l-3 2-5-1-12-7-14-13-14-11-29-19-21-13-32-17-16-8-31-15-30-13-29-12-41-15-16-6-43-14-48-14-36-9-49-11-51-9-59-8-20-2-56-3h-73l-30 1-32 3-27 6-16 1-20 4-38 10-33 11-19 8-20 10-16 12-11 9-10 9-6-2-3-6-1-5v-18l5-22 9-17 5-8h2l2-4 7-7 1-2h2v-7l-4-2v-6l-4-1-2-6-7-7-1-10-3-2v-9l-4-2v-2l4-1v-8l4-4v-6l4-3 2-7 3-3-20 8-23 11-14 8-7 2-4-2 1-5 8-16 8-13 6-14 12-22 6-9 7-6 22-12 48-24 2-5 3-3 1-8 4-2 1-5 2-1 1-4v-6l4-3 2-4 2-1 2-6 3-1v-8l4-3 1-5 3-3v-7l4-1 1-4-11 4-19 11-14 8-17 11-7 3-4-1v-3l10-19 8-16 6-11 9-17 6-12 9-7 14-9 16-10 16-9 21-11 21-9 10-5 3-10v-11l-2-5 4-2 20-3 6-3 1-6v-11l6-19 3-6 2-6 4-6 9-6 15-7 37-14 36-12 9-2 7 1 2 3 1 7 6 2 12 3 3 1 10-3 2-1 21-3 9-2 18-1 2-1 15-1 3-15 3-7 5-4 5-2 20-3 31-2h62l8 1h50l11-1h22l27 3 28 6 25 5 17 2 28 2h15l46-5 11-1 36-7 30-4 36-6 14-3h7l41 11 34 6 47 5 25 2h89l45-3 46-5 36-6 48-11 36-10 26-9 34-14 13-6 17-9 19-11 16-11 21-16 15-13 20-20 13-17 4-9 6-15z"/>
<path transform="translate(413,720)" d="m0 0h45l46 2 38 3 33 4 44 7 36 7 37 9 40 11 52 17 30 12 36 15 47 23 23 13 24 13 21 13 24 16 36 26 14 12 11 9 15 14 21 21 7 8 11 13 13 18 1 4-5-1-12-7-14-13-14-11-29-19-21-13-32-17-16-8-31-15-30-13-29-12-41-15-16-6-43-14-48-14-36-9-49-11-51-9-59-8-20-2-56-3h-73l-30 1-32 3-27 6-16 1-20 4-38 10-33 11-19 8-20 10-16 12-11 9-10 9-6-2 1-2-2-14v-14l3-16 6-15 7-11 11-12 7-7 14-10 18-10 13-6 28-10 27-7 29-6 26-4 38-4 43-3z" fill="#A0A3A1"/>
<path transform="translate(1504,397)" d="m0 0h84l8 3 6 5 4 7v18l-17 95-14 80-9 50-5 9-5 6-10 6-3 1-12 1h-74l-9-2-9-8-3-7v-13l13-72 10-58 9-50 8-45 4-10 8-9 11-6z" fill="#FAFAFA"/>
<path transform="translate(1756,92)" d="m0 0 5 1 5 5 3 4 4 11 2 17v8l-2 17-11 20-10 13-6 7-6 5-5 6-4 1-8 7-18 13-19 12-16 9-38 19-30 13-40 14-35 10-39 9-34 6-35 4-37 2h-42l-31-2-32-4-45-8-30-7-26-8-27-10-26-12-24-14-3-1-13 5-15 6-25 4-12 3-13 1-20 1h-12l-22 4-21 3-25 2-15-1-31-3-42-8-18-4-22-3-15-1h-14l-27 2-34-1-16-3-13-1v-1h19l8 1h50l11-1h22l27 3 28 6 25 5 17 2 28 2h15l46-5 11-1 36-7 30-4 36-6 14-3h7l41 11 34 6 47 5 25 2h89l45-3 46-5 36-6 48-11 36-10 26-9 34-14 13-6 17-9 19-11 16-11 21-16 15-13 20-20 13-17 4-9 6-15z" fill="#9EA19F"/>
<path transform="translate(305,393)" d="m0 0 3 1h106l8 2 8 6 4 6 1 5-1 16-20 116-3 10-5 6-9 5-10 1 1 38 1 19 1 53h-42l-1-4-2-69-1-38-24 1h-9v2l5 1 4 2v8l-17 97h-43l2-15 15-85 15-86 14-80 2-10-5-1-2-5z" fill="#FAFAFA"/>
<path transform="translate(926,397)" d="m0 0h59l1 2 5 56 7 73 1 15 1 4 6-36 19-107 3-7h41l-1 10-32 180-14 80-2 10h-47l-1-4-10-111-3-31-1-1-10 58-15 85-2 4-35 1-7-1 5-30 15-85 23-130 5-29-6-1-6-3z" fill="#FAFAFA"/>
<path transform="translate(1632,397)" d="m0 0h59l1 1 7 77 4 41 2 25 1 5 14-79 12-67 1-3h42l-1 11-30 169-16 91-2 9h-46l-1-1-5-49-8-86-1-11-2 7-8 46-15 85-1 8-1 1h-42l1-12 18-101 16-91 11-62 1-7-10-4z" fill="#FAFAFA"/>
<path transform="translate(654,266)" d="m0 0h29l1 3-17 92-2 5h-18l-37-2-62-2-1 7-1 1-43 1-4 19-2 7-8-1-17 48-5 13-1 1-10 1-1-2 4-21 1-8v-16l-4-13-6-10-7-7-12-7-13-3-14-1-71-1 1-7 4-12 3-6 2-6 4-6 9-6 15-7 37-14 36-12 9-2 7 1 2 3 1 7 6 2 12 3 3 1 10-3 2-1 21-3 9-2 18-1 2-1 15-1 3-15 3-7 5-4 7-2h9l21-2z" fill="#F8F8F8"/>
<path transform="translate(1133,397)" d="m0 0h63l1 1v52l-1 90-1 137-41 1-1-1v-38h-56l5 3-1 8-9 27-2 1h-39l-2-1 3-10 30-86 17-48 10-29 19-55 14-40 1-5-10-5z" fill="#FBFBFB"/>
<path transform="translate(502,397)" d="m0 0h64v137l-1 143h-42v-39l-57 1 6 3-1 7-9 27-1 1h-42l1-5 18-52 15-43 22-63 17-49 14-40 7-19v-2l-10-5z" fill="#FAFAFA"/>
<path transform="translate(1310,656)" d="m0 0 18 3 3 1-2 16-5 27-1 3h69l6 50 3 24-11-6-8-1h-19l-12 1-8 4v-5h-59l-2 11-6 3-3 2-7 37-12 68h31l1 1 2 23 1 3-10-3-34-12-39-15-29-11-24-10-1-1-2-30-4-86v-12l11 3 71 24 47 15-4-43-2-23v-11h32l1-9 7-40z" fill="#FBFBFB"/>
<path transform="translate(1875,579)" d="m0 0 5 1 4 8 4 10 3 16 6 24 4 19 5 17 5 19 9 32 3 8v8l-8 6-26 14-28 13-21 10-7 4-6 1 3-16h-42l-2-1-13-57-12-53-2-10v-13l26-12 23-11 29-15 23-13z" fill="#FAFBFA"/>
<path transform="translate(778,397)" d="m0 0h128l-2 13-5 27-1 1-79 1 6 3v8l-11 64-1 4 55-1 1 2-7 38-1 1-65 1 3 2 5 3-1 11-11 62h72l-5 29-2 10-5 2h-105l-6-1 8-42 18-103 19-107 3-17v-4l-10-4z" fill="#FAFAFA"/>
<path transform="translate(665,397)" d="m0 0h93l-1 9-5 28-1 4h-82l9 5-2 14-15 84-15 87-2 9h72l-5 30-2 10-4 1h-85l-9-2-9-8-3-8v-11l8-47 27-152 5-28 6-12 7-7 9-5z" fill="#FAFAFA"/>
<path transform="translate(1456,825)" d="m0 0 12 1 42 5 22 2 3 1 2 12v20l-4 24-1 4h12l2 6 13 80v4l-21-2-45-6-43-8-24-5-3-2-8-61v-6h29l1-12 10-56z" fill="#FAFAFA"/>
<path transform="translate(1229,397)" d="m0 0h143l1 2-2 9-5 28-1 2-51 1 6 4-2 15-23 130-15 86-1 3-25 1h-14l-4-1 5-28 12-70 9-50 15-85 1-5-43-1 1-11 4-20v-3l-10-4z" fill="#FAFAFA"/>
<path transform="translate(1793,249)" d="m0 0 4 4 6 22 5 23 9 34 12 43 7 23 2 9v7l-14 8-19 12-9 6h-2l2-12 10-56-3-1-109-1-12-51v-4l35-18 18-10 23-14 27-18z" fill="#FBFBFB"/>
<path transform="translate(1392,397)" d="m0 0h55l1 2-5 25-24 136-20 113-1 4h-43l5-29 26-148 15-85 1-11-10-5z" fill="#FAFAFA"/>
<path transform="translate(1745,873)" d="m0 0h22l-2 16-1 5h45l1-11 2 2 7 18 5 25 5 17 1 5v9l-4 3-16 4-36 8-30 5-46 6h-4l-2-8-15-78v-5h65l1-13z" fill="#FAFAFA"/>
<path transform="translate(654,266)" d="m0 0h29l1 3-17 92-2 5h-18l-37-2-62-2 4-17 17-65 1-8 9-3h9l21-2z" fill="#FBFBFB"/>
<path transform="translate(884,706)" d="m0 0h132l1 1v107l-6-2-45-19-39-16-38-15-8-3 1-31 1-19z" fill="#FBFBFB"/>
<path transform="translate(1563,696)" d="m0 0h2l-1 6-2 4h78l2 9 10 51 1 6-18 2-8 4-5 6-4-2-8-6-10-3h-25l-11 2-6 4-5 6-3 9-6 32v3h6v4l-2 1h-13l-2-5-15-93-4-25v-5l28-2 13-4z" fill="#FBFBFB"/>
<path transform="translate(795,278)" d="m0 0 12 1 67 12 31 6 1 1v11l-3 54-1 7h-118l1-14 9-77z" fill="#FBFBFB"/>
<path transform="translate(1310,656)" d="m0 0 18 3 3 1-2 16-5 27-1 3h69l6 50 3 24-11-6-8-1h-19l-12 1-8 4v-5h-59l-2 11-6 2-2-11-5-58v-11h32l1-9 7-40z" fill="#FAFAFA"/>
<path transform="translate(1506,438)" d="m0 0h56l-15 86-16 90-4 23h-46l2-14 15-85 14-80 2-15-8-4z"/>
<path transform="translate(239,583)" d="m0 0 1 3-6 12-13 30-17 39-3 5-31 10-28 10-35 15-29 14-7 4-3-1 1-5 8-16 8-13 6-14 12-22 6-9 7-6 22-12 38-19 21-8 27-11z" fill="#F9F9F9"/>
<path transform="translate(569,273)" d="m0 0h2l-3 14-17 66-3 9-3 1-43 3-44 6-12 2h-14l3-10 22-65 3-3 2 7 9 7 5 1 18-5 2-1 21-3 9-2 18-1 2-1 15-1 3-15 3-7z"/>
<path transform="translate(275,432)" d="m0 0 1 2-6 32-7 38-14 7-24 11-19 10-15 9-12 7-14 9-7 3-4-1v-3l10-19 8-16 6-11 9-17 6-12 9-7 14-9 16-10 16-9 21-11z" fill="#F5F5F5"/>
<path transform="translate(1017,322)" d="m0 0 67 15 43 9 1 1 1 15v26l-1 8-5 1-4-1-10 29-14 40-2 3-9-3 1-9 11-62 4-22-1-1-82-1-1-47z" fill="#FAFAFA"/>
<path transform="translate(334,435)" d="m0 0h56l-2 14-13 77h-46l6-37 7-43v-6l-8-4z"/>
<path transform="translate(1638,790)" d="m0 0h34l3 4-1 13-11 62-3 6-3 3h-35l-3-6 5-29 8-45 4-6z" fill="#F7F7F7"/>
<path transform="translate(545,362)" d="m0 0h3l-1 7-1 1-43 1-4 19-2 7-8-1-17 48-5 13-1 1-10 1-1-2 4-21 1-8v-16l-4-13-6-10-7-7-12-7v-1l21-2 41-6 35-3z" fill="#F7F7F7"/>
<path transform="translate(1789,790)" d="m0 0h23l-2 14-13 73-4 2-11-1 1-10 2-10-3-1-25-1 2-9 4-10 16-29z" fill="#F7F7F7"/>
<path transform="translate(1355,790)" d="m0 0h33l3 3v11l-2 11-1 1h-12l-3-1 3-12h-14v14l20 30 1 4-4 19-5 8h-36l-2-4v-7l2-13 2-2h13l-1 13h13l1-12-7-12-13-20-1-5 4-19 4-6z" fill="#F7F7F7"/>
<path transform="translate(1706,790)" d="m0 0h34l3 4v8l-3 16-7 8-25 25-2 3-2 11h27l-1 12-1 1-35 1-8-1 5-29 33-33 3-12-13-1-1 12-2 1h-13l-1-2 4-18z" fill="#F6F6F6"/>
<path transform="translate(1588,789)" d="m0 0 16 1 3 4-1 13-2 11-9 10-23 23-3 7-1 7h27l-1 12-1 1h-43l5-29 33-33 3-12h-13l-1 11-2 1h-13v-8l3-12 4-5 2-1z" fill="#F7F7F7"/>
<path transform="translate(1094,256)" d="m0 0h7l8 2v2l6 2v3l4 2 3 3 16 8 23 10 36 12 28 7v1h-7l-27-7-32-11-21-9-16-8-18-10-8-4-13 5-15 6-25 4-12 3-13 1-20 1h-12l-22 4-21 3-25 2-15-1-31-3-42-8-18-4-22-3-15-1h-14l-27 2-34-1-16-3-13-1v-1h19l8 1h50l11-1h22l27 3 28 6 25 5 17 2 28 2h15l46-5 11-1 36-7 30-4 36-6z" fill="#A1A4A2"/>
<path transform="translate(1285,790)" d="m0 0h40l-1 9-1 4h-24l-1 13-2 10h17l1 3-3 10-1 1h-18l-1 16-2 9h22l1 2-2 11-26 1-13-1 6-31 9-52z" fill="#F7F7F7"/>
<path transform="translate(526,480)" d="m0 0h1l-1 42-1 49-1 26h-36l1-5 34-102z"/>
<path transform="translate(1156,481)" d="m0 0h1l-1 54-1 62h-37l12-36 14-43 11-33z"/>
<path transform="translate(1454,849)" d="m0 0h44l-1 10-6 35h-46l8-44z"/>
<path transform="translate(1124,666)" d="m0 0h2v21l-1 19h20l1 17v18l-9-3-38-14-35-13-16-5v-1h62l12-37z" fill="#F7F7F7"/>
<path transform="translate(1416,790)" d="m0 0h45l-2 12-1 1h-14l-1 10-11 63-3 3-13-1 5-27 8-46 1-2h-14z" fill="#F7F7F7"/>
<path transform="translate(1186,898)" d="m0 0h20l-1 3h-2l-1 5-2 2h-7-1l-5 1h-11l-9 3-8 4-4 3-9 3-7 5-1 2-10 4-4 1-1 4-4 3h-2l-2 5-3 5 1 3-3 5-4 5-1 4-4 2 2 5-1 3-3-6v-7l-4-1v-2l5-2 1-2-3-1v-3l-3-1v-13l8-5 3-3 8-4 12-4 10-5 5-2 5-3 7-3 8-6 16-5z" fill="#A1A4A2"/>
<path transform="translate(1343,467)" d="m0 0h18l1 8v11l-5 33-2 5-19-2-3-1 5-29 4-24z" fill="#F7F7F7"/>
<path transform="translate(828,586)" d="m0 0h50l-2 14-2 9-1 1h-49l-1-2 4-21z" fill="#F7F7F7"/>
<path transform="translate(681,580)" d="m0 0 17 4 30 8 1 1-1 11-2 6h-50l1-12 3-17z" fill="#F5F5F5"/>
<path transform="translate(415,786)" d="m0 0h37l31 1 51 4 48 6 49 8 52 11 41 10 43 12 35 11 26 9-4 1-42-14-31-9-41-11-58-13-51-9-59-8-20-2-56-3h-105v-1l29-2z" fill="#111"/>
<path transform="translate(1223,500)" d="m0 0 16 4-1 12-14 81-1 8-2-2 1-102z" fill="#F0F0F0"/>
<path transform="translate(1646,803)" d="m0 0h14l-5 29-6 32-1 1h-13l6-36 4-25z"/>
<path transform="translate(744,466)" d="m0 0h7l1 3-3 17-1 2-9-1-39-9-1-4 2-7z" fill="#F7F7F7"/>
<path transform="translate(1273,922)" d="m0 0 6 2 14 7 14 4 16 3 18 5 25 5 19 5 36 12v1l-10-1-23-7-26-6-22-4-42-11-16-6-5-5z" fill="#A1A4A2"/>
<path transform="translate(592,461)" d="m0 0 13 1-2 14-9 52-2 11h-1z" fill="#EAEAEA"/>
<path transform="translate(1570,356)" d="m0 0h2l2 14-57 1-23 2-10 4-4 2h-3l2-4 13-4 35-5 28-6z" fill="#F4F4F4"/>
<path transform="translate(415,786)" d="m0 0h37l31 1 40 3 2 2h-21l-38-2h-105v-1l29-2z" fill="#060606"/>
<path transform="translate(1096,256)" d="m0 0 9 1 4 1v2l6 2v3l4 2 3 3 16 8 23 10 36 12 28 7v1h-7l-27-7-32-11-21-9-16-8-18-10-5-3z" fill="#B8B9B7"/>
<path transform="translate(1744,239)" d="m0 0 4 4v2l6 2 4 2 12 1 14-2 6 1v1l-10 2-11 5-7 1v2l-4 2h-3v-4h-2l-1-4h-2l-6-10z" fill="#A1A4A2"/>
<path transform="translate(1824,961)" d="m0 0 2 1-10 4-32 8-26 5-34 5-18 2 1-3 57-8 38-8z" fill="#0F0F0F"/>
<path transform="translate(628,264)" d="m0 0h43l12 1-3 2h-26l-45 1-21 2h-9l4-2 14-2z" fill="#0C0C0C"/>
<path transform="translate(1792,811)" d="m0 0h1l-1 12-4 20h-13l2-5 13-24z"/>
<path transform="translate(1038,954)" d="m0 0 5 2 15 9 15 10 18 13 16 13 8 6v2l-6-2-10-7-12-11-14-11-29-19-6-4z" fill="#090909"/>
<path transform="translate(1466,865)" d="m0 0h14l1 2-3 11h-15l2-11z" fill="#F1F1F1"/>
<path transform="translate(132,796)" d="m0 0v3l-7 10-6 14-3 11-1 8v14l2 15-3-1-3-9v-18l5-22 9-17 4-6z" fill="#050505"/>
<path transform="translate(1814,326)" d="m0 0 2 2 11 40 8 28 2 5 1 13-2 1-5-21-17-65z" fill="#101010"/>
<path transform="translate(255,545)" d="m0 0 1 4-6 29-4 4-5 1-1-2 9-21z" fill="#E5E5E5"/>
<path transform="translate(1753,94)" d="m0 0h2l-2 9-8 16-9 12-12 13-16 16-2-1 23-23 13-17 4-9 6-15z" fill="#232424"/>
<path transform="translate(1749,829)" d="m0 0 1 2-4 8-3 11h-11v-3l12-12z" fill="#E8E9E8"/>
<path transform="translate(424,579)" d="m0 0 1 2-6 15-4 13-2-1v-19l4-4z" fill="#E4E5E4"/>
<path transform="translate(118,701)" d="m0 0m-2 1h2v2l-25 12-14 8-7 2-1-2 29-15z" fill="#0E0F0E"/>
<path transform="translate(1794,250)" d="m0 0 3 3 6 22 5 23 2 8-1 4-2-7-11-42z" fill="#171717"/>
<path transform="translate(665,366)" d="m0 0 11 1 25 3v1h-37z" fill="#CFD0CF"/>
<path transform="translate(1405,818)" d="m0 0h7l-3 23h-2z" fill="#DADADA"/>
<path transform="translate(1451,850)" d="m0 0h2l-1 11-5 28-2-3 2-16z" fill="#D0D1D0"/>
<path transform="translate(324,793)" d="m0 0h5l-2 2-23 5h-16v-1z" fill="#0B0B0B"/>
<path transform="translate(459,294)" d="m0 0h2l2 9 6 2 12 3 1 2-8 2-7-4-6-5-2-6z" fill="#A1A4A2"/>
<path transform="translate(1760,93)" d="m0 0 5 3 4 6 4 11v11h-1l-3-12-7-14z" fill="#0C0C0C"/>
<path transform="translate(132,796)" d="m0 0v3l-7 10-6 14-4 10-1-2 3-12 8-15 4-6z" fill="#101010"/>
<path transform="translate(1872,579)" d="m0 0 3 1-17 10-7 4-2-1 5-5 15-8z" fill="#181818"/>
<path transform="translate(1506,369)" d="m0 0 11 1v1l-23 2-10 4-4 2h-3l2-4 13-4z" fill="#ADAFAD"/>
<path transform="translate(105,651)" d="m0 0 1 2-11 22-8 15-1-3 9-19z" fill="#141414"/>
<path transform="translate(1737,979)" d="m0 0m-7 1h7v2l-31 4 1-3z" fill="#121212"/>
<path transform="translate(1133,397)" d="m0 0h63v1h-60v2l-3-1z" fill="#A8AAA9"/>
<path transform="translate(347,333)" d="m0 0 1 2-11 26-1 4h-2l3-12 4-8 2-6z" fill="#1B1C1B"/>
<path transform="translate(1753,94)" d="m0 0h2l-2 9-8 16h-3l4-9 6-15z" fill="#101010"/>
<path transform="translate(1834,415)" d="m0 0 2 1-10 7-19 12v-3l22-14z" fill="#121313"/>
<path transform="translate(1772,144)" d="m0 0h1v11l-11 20-5 5 2-5 6-10 5-12z" fill="#0F0F0F"/>
<path transform="translate(1096,256)" d="m0 0 9 1 4 1v2h2v2h-2l1 3-6-2-5-3z" fill="#CACBCA"/>
<path transform="translate(1764,975)" d="m0 0m-7 1h7v2l-27 4 1-3z" fill="#0A0A0A"/>
<path transform="translate(1111,261)" d="m0 0 4 1v3l4 2 4 4-1 2-13-7v-4z" fill="#BEBEBD"/>
<path transform="translate(118,701)" d="m0 0m-2 1h2v2l-23 11v-3l16-8z" fill="#222322"/>
<path transform="translate(1789,970)" d="m0 0m-5 1h5l-1 2-24 5 1-3z" fill="#121212"/>
<path transform="translate(194,480)" d="m0 0h2l-2 5-12 23-2 1 1-4 8-16z" fill="#1B1C1C"/>
<path transform="translate(896,467)" d="m0 0h3l-3 21-2 2 1-19z" fill="#C8C9C8"/>
<path transform="translate(1237,367)" d="m0 0 25 3v1h-17l-7-1z" fill="#BBBDBB"/>
<path transform="translate(81,697)" d="m0 0 1 2-12 23-2 1 2-6 7-14z" fill="#1E1E1E"/>
<path transform="translate(1823,928)" d="m0 0 2 3 4 14 1 11-2-3-5-21z" fill="#151515"/>
<path transform="translate(165,536)" d="m0 0 1 2-8 17-4 4v-3l10-19z" fill="#2E2F2F"/>
<path transform="translate(180,545)" d="m0 0 2 1-17 11-3 2-3-1 14-9z" fill="#0F100F"/>
<path transform="translate(132,796)" d="m0 0v3l-7 10-2 4h-2l2-6 6-9z" fill="#212222"/>
<path transform="translate(332,373)" d="m0 0h1l2 9v6l-4 2-3-1 3-2 1-6z" fill="#A1A4A2"/>
<path transform="translate(1737,979)" d="m0 0m-7 1h7v2l-15 2 1-3z" fill="#131313"/>
<path transform="translate(1484,373)" d="m0 0h5l-3 3-6 3h-3l2-4z" fill="#E0E1E0"/>
<path transform="translate(1884,591)" d="m0 0 3 4 2 10v5l-2-3-3-12z" fill="#141414"/>
<path transform="translate(347,333)" d="m0 0 1 2-5 12h-2l1-7z" fill="#0F0F0F"/>
<path transform="translate(1764,975)" d="m0 0m-7 1h7v2l-13 2 1-3z" fill="#050505"/>
<path transform="translate(733,705)" d="m0 0 13 1 1 3-9-1-5-2z" fill="#C3C4C3"/>
<path transform="translate(1834,415)" d="m0 0 2 1-10 7-5 2 5-5z" fill="#050505"/>
<path transform="translate(1760,810)" d="m0 0 1 2-6 9-1-3 3-6z" fill="#D1D2D1"/>
<path transform="translate(1749,107)" d="m0 0 1 2-6 11-2-1 4-9z" fill="#0C0C0C"/>
</svg>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden p-2">
            <Menu />
          </button>
        </SheetTrigger>

        <SheetContent className="border-0 h-full flex items-center justify-center">
          <SheetHeader className="h-[35%] flex items-center justify-evenly">
            <div className="flex gap-4 mt-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
              >
                <Languages />
              </button>
              <button
                onClick={handleThemeToggle}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition"
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
            </div>
            <SheetTitle>
              <Link href="/">RaceNation</Link>
            </SheetTitle>
            <SheetDescription className="flex flex-col items-center">
              <div className="flex flex-col w-[100%] items-center">
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col z-50">
                    <NavigationMenuItem>
                      <Link href="/team" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {translations.navbar.blog}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link
                        className="p-2 hover:text-purple"
                        href="/team"
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {translations.navbar.recommendations}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <div className="flex">
                      <NavigationMenuItem className="flex flex-col">
                        <NavigationMenuTrigger>Ranking</NavigationMenuTrigger>
                        <NavigationMenuContent className="flex-flex-col">
                          <ul className="flex flex-col p-8 bg-background border-0">
                            <ListItem href="/ranking/topSpeed" title="Top Speed">
                              {translations.navbar.topSpeedDescription}
                            </ListItem>
                            <ListItem href="/ranking/lapTime" title="Best Lap Times">
                              {translations.navbar.bestLapDescription}
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="flex flex-col">
                        <NavigationMenuTrigger>Eventos</NavigationMenuTrigger>
                        <NavigationMenuContent className="flex-flex-col">
                          <ul className="flex flex-col p-8 bg-background border-0">
                            <ListItem href="/events/drag" title="Drag Race">
                              {translations.navbar.dragRaceDescription}
                            </ListItem>
                            <ListItem href="/events/drift" title="Drift">
                              {translations.navbar.driftDescription}
                            </ListItem>
                            <ListItem href="/events/tuning" title="Tuning Show">
                              {translations.navbar.tuningShowDescription}
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </div>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <NavigationMenu className="hidden lg:flex lg:gap-4">
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {translations.navbar.home}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {translations.navbar.ranking}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem title="Top Speed" href="/ranking/topSpeed">
                  {translations.navbar.topSpeedDescription}
                </ListItem>
                <ListItem title="Best Lap Times" href="/ranking/lapTime">
                  {translations.navbar.bestLapDescription}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {translations.navbar.upcomingEvents}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3 relative h-full w-full">
                  <Image
                    src={imageMap[hoveredOption ?? "drag-race"]}
                    alt="eventImage"
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="rounded-md transition-all duration-300"
                  />
                </li>
                <ListItem
                  href="/events/drag"
                  title="Drag Race"
                  onMouseEnter={() => setHoveredOption("drag-race")}
                >
                  {translations.navbar.dragRaceDescription}
                </ListItem>
                <ListItem
                  href="/events/drift"
                  title="Drift"
                  onMouseEnter={() => setHoveredOption("drift")}
                >
                  {translations.navbar.driftDescription}
                </ListItem>
                <ListItem
                  href="/events/tuning"
                  title="Tuning Show"
                  onMouseEnter={() => setHoveredOption("tuning-show")}
                >
                  {translations.navbar.tuningShowDescription}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {translations.navbar.blog}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/recommendations" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {translations.navbar.recommendations}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex gap-4">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
        >
          <Languages />
        </button>
        <button
          onClick={handleThemeToggle}
          className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
