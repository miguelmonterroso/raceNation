"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, setHours, setMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "El nombre del evento debe tener al menos 5 caracteres.",
  }),
  eventDate: z.date({
    required_error: "La fecha del evento es obligatoria.",
  }),
  eventTime: z.string().nonempty({
    message: "La hora del evento es obligatoria.",
  }),
  image: z.instanceof(File).optional(), 
  description: z.string().optional(),
  price: z.string().optional(),
  location: z.string().optional(),
  locationUrl: z.string().url().optional(),
  subTitle: z.string().optional(),
  instagram: z.string().url().optional(),
  tiktok: z.string().url().optional(),
  category: z.string().nonempty({
    message: "La categoría es obligatoria.",
  }),
  link: z.string().optional(),
  url: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;
interface props {
  ig?: string;
  tk?: string;
}
export default function EventsForm({ig, tk} : props) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      eventDate: undefined,
      eventTime: "",
      description: "",
      price: "",
      location: "",
      locationUrl: "",
      subTitle: "",
      instagram: ig || "",
      tiktok: tk || "",
      category: "",
      image: undefined,
      link: "",
      url: "",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const category = useWatch({ control: form.control, name: "category" });
  const title = useWatch({ control: form.control, name: "title" });

  const generateLinkAndUrl = (category: string, title: string) => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    const formattedCategory = category.toLowerCase().replace(/\s+/g, "-");

    return {
      link: `/events/${formattedCategory}/${formattedTitle}`,
      url: formattedTitle,
    };
  };

  useEffect(() => {
    const { link, url } = generateLinkAndUrl(category, title);
    form.setValue("link", link);
    form.setValue("url", url);
  }, [category, title, form]);

  const { link, url } = generateLinkAndUrl(category, title);

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (data.image) {
        const formData = new FormData();
        formData.append("file", data.image);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error("Error al subir la imagen");

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      }

      const [hours, minutes] = data.eventTime.split(":").map(Number);
      const combinedDate = setHours(setMinutes(data.eventDate, minutes), hours);

      const year = combinedDate.getFullYear();
      const month = String(combinedDate.getMonth() + 1).padStart(2, "0");
      const day = String(combinedDate.getDate()).padStart(2, "0");
      const hour = String(combinedDate.getHours()).padStart(2, "0");
      const minute = String(combinedDate.getMinutes()).padStart(2, "0");
      const second = String(combinedDate.getSeconds()).padStart(2, "0");

      const isoDate = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;

      const finalData = {
        ...data,
        eventDate: isoDate,
        category: category.toLowerCase().replace(/\s+/g, "-"),
        image: imageUrl, 
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) throw new Error("Failed to create event");

      toast({
        title: "Evento creado exitosamente",
        description: `El evento ${data.title} ha sido creado.`,
      });

      form.reset();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el evento. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlurFade>
    <Form {...form}>
      <h2 className="text-2xl mb-5 font-semibold pt-5">Agregar nuevo Evento:</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-3 lg:w-1/2">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre del Evento</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: Carrera de autos" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex items-center gap-4 flex-col lg:flex-row">
          <FormField control={form.control} name="eventDate" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-2">Fecha del Evento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Selecciona una fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Controller
                    control={form.control}
                    name="eventDate"
                    render={({ field: controllerField }) => (
                      <Calendar
                        mode="single"
                        selected={controllerField.value}
                        onSelect={controllerField.onChange}
                        initialFocus
                      />
                    )}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="eventTime" render={({ field }) => (
            <FormItem>
              <FormLabel>Hora del Evento</FormLabel>
              <FormControl>
                <Input type="time" {...field} className="w-full min-w-[300px]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="image" render={({ field }) => (
  <FormItem>
    <FormLabel>Imagen de Portada</FormLabel>
    <FormControl>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => field.onChange(e.target.files?.[0])}
      />
    </FormControl>
    <FormMessage />
  </FormItem>
)} />

        <FormField control={form.control} name="subTitle" render={({ field }) => (
          <FormItem>
            <FormLabel>Subtítulo</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: Gran exhibición de autos y motos" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Precio */}
        <FormField control={form.control} name="price" render={({ field }) => (
          <FormItem>
            <FormLabel>Precio</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: Q 100.00 - Menores de 12, GRATIS" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="location" render={({ field }) => (
          <FormItem>
            <FormLabel>Ubicación</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: Hotel Bahia de Atitlan, Panajachel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="locationUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>URL de Ubicación</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: https://maps.app.goo.gl/..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="instagram" render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: https://www.instagram.com/..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="tiktok" render={({ field }) => (
          <FormItem>
            <FormLabel>TikTok</FormLabel>
            <FormControl>
              <Input placeholder="Ejemplo: https://www.tiktok.com/..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel>Categoría</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorías</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.title}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="link" render={() => (
          <FormItem>
            <FormLabel>Enlace del Evento</FormLabel>
            <FormControl>
              <Input value={link} readOnly />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="url" render={() => (
          <FormItem>
            <FormLabel>URL del Evento</FormLabel>
            <FormControl>
              <Input value={url} readOnly />
            </FormControl>
          </FormItem>
        )} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Publicar Evento"}
        </Button>
      </form>
    </Form>
    </BlurFade>
  );
}
