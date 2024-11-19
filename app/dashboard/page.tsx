'use client'
import { CalendarIcon, HomeIcon, Trophy, PencilIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { useState } from "react";
import EventsForm from "@/components/dashboard/forms/events";
import BlogForm from "@/components/dashboard/forms/blog";
import RankingForm from "@/components/dashboard/forms/ranking";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlurFade from "@/components/ui/blur-fade";

export default function Dashboard(){

    const [activeForm, setActiveForm] = useState<"events" | "blog" | "ranking" | null>(null);

    const handleSelect = (formType: "events" | "blog" | "ranking") => {
      setActiveForm(formType); 
    };

  
    const DATA = {
      navbar: [
        { icon: HomeIcon, label: "Home", onClick: () => (<div>HOLA</div>) },
        { icon: CalendarIcon, label: "Add Events", onClick: () => handleSelect("events") },
        { icon: PencilIcon, label: "Add Blog", onClick: () => handleSelect("blog") },
        { icon: Trophy, label: "Add Ranking", onClick: () => handleSelect("ranking") }
      ],
    };

    return(
        <div className="w-full h-screen p-10">
            <h2 className="font-bold text-3xl">Bienvenido</h2>
          
        <div className="mt-8 h-[67vh]">
            <ScrollArea className="h-[67vh] p-3">
              <BlurFade delay={0.5} inView> 
                {activeForm === "events" && <EventsForm />}
              </BlurFade>
              <BlurFade delay={0.5} inView> 
              {activeForm === "blog" && <BlogForm />}

              </BlurFade>
              <BlurFade delay={0.5} inView> 
              {activeForm === "ranking" && <RankingForm />}

                </BlurFade>
            </ScrollArea>
        </div>

        <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label={item.label}
                    onClick={item.onClick}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                    <item.icon className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
        </div>
    )
};