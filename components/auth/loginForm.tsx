"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import BlurFade from "../ui/blur-fade";

export default function LoginForm() {
  const [formData, setFormData] = useState({
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a la plataforma.",
        });
        localStorage.setItem("token", token); // Guarda el token en localStorage
        setFormData({ email: "", password: "" }); // Reinicia el formulario
      } else {
        const errorData = await response.json();
        toast({
          title: "Error al iniciar sesión",
          description: errorData.message || "Credenciales incorrectas.",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast({
        title: "Error interno del servidor",
        description: "Intenta nuevamente más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlurFade delay={0.5} inView>
    <div className="w-[350px] mt-10 p-5 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-5">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
    </BlurFade>
  );
}
