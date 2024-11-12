"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  eventName: z.string().min(5, {
    message: "El nombre del evento debe tener al menos 5 caracteres.",
  }),
  eventDate: z.string().nonempty({
    message: "La fecha del evento es obligatoria.",
  }),
  eventDescription: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>; 

export default function BlogForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventDate: "",
      eventDescription: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data); 
  };

  return (
    <Form {...form}>
      <h2 className="text-2xl mb-5 font-semibold">Agregar nuevo Blog:</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Evento</FormLabel>
              <FormControl>
                <Input placeholder="Ejemplo: Carrera de autos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha del Evento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del Evento</FormLabel>
              <FormControl>
                <Input placeholder="Descripción opcional" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Publicar Evento</Button>
      </form>
    </Form>
  );
}
