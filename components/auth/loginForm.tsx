"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import BlurFade from "../ui/blur-fade";
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from "@/context/AuthContext";
import { LogIn } from "lucide-react";
interface DecodedToken {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  image: string;
  instagram: string;
  tiktok: string;
}
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const setUser = useAuthStore((state) => state.setUser);

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
        const decodedToken = jwtDecode<DecodedToken>(token);
    
        setUser(
          {
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
            role: decodedToken.role,
            image: decodedToken.image,
            instagram: decodedToken.instagram,
            tiktok: decodedToken.tiktok

          },
          token
        );

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a la plataforma.",
        });
        localStorage.setItem("token", token); 
        setFormData({ email: "", password: "" });
        setTimeout(()=>{
          window.location.replace('/dashboard');
        }, 2000);
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
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"} <LogIn/>
        </Button>
      </form>
    </div>
    </BlurFade>
  );
}
