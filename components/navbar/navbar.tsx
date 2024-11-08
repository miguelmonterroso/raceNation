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
  const [hoveredOption, setHoveredOption] = React.useState<string | null>("tuning-show");

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
        <div className="text-lg font-semibold">RaceNation</div>
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
                      <Link href="/blog" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {translations.navbar.blog}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link
                        className="p-2 hover:text-purple"
                        href="/recommendations"
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
                            <ListItem href="/events/tuning" title="Tuning Show">
                            {translations.navbar.tuningShowDescription}
                            </ListItem>
                            <ListItem href="/events/drag" title="Drag Race">
                            {translations.navbar.dragRaceDescription}
                            </ListItem>
                            <ListItem href="/events/drift" title="Drift">
                              {translations.navbar.driftDescription}
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
                  title="Tuning Show"
                  onMouseEnter={() => setHoveredOption("tuning-show")}
                >
                  {translations.navbar.tuningShowDescription}
                </ListItem>
                <ListItem
                  href="/events/drift"
                  title="Drag Race"
                  onMouseEnter={() => setHoveredOption("drag-race")}
                >
                  {translations.navbar.dragRaceDescription}
                </ListItem>
                <ListItem
                  href="/events/tuning"
                  title="Drift"
                  onMouseEnter={() => setHoveredOption("drift")}
                >
                  {translations.navbar.driftDescription}
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
