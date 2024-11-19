"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import BlurFade from "../ui/blur-fade";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
            title: "Usuario creado exitosamente",
            description: `Tu usuario fue creado, puedes iniciar sesion.`,
          });
            setFormData({ name: "", email: "", password: "" });
      } else {
        const errorData = await response.json();
        toast({
            title: errorData.message,
            description: "Error al registrar usuario",
          });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error interno del servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlurFade delay={0.5} inView>
    <div className="w-[350px] mt-10 p-5 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-5">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-1" htmlFor="name">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1" htmlFor="email">
            Correo Electrónico
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1" htmlFor="password">
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña segura"
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Registrando..." : "Registrar"}
        </Button>
      </form>
    </div>
    </BlurFade>

  );
}
