"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import BlurFade from "../ui/blur-fade";
import { Eye, EyeClosed } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: `Revisa que ambas contraseñas sean identicas`,
      });
      setIsSubmitting(false);

      return;
    }
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
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
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
            <Label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Contraseña
            </Label>
            <div className="flex items-center justify-end">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña segura"
                required
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="bg-red-200 absolute mr-9 mb-5">
                    {showPassword ? (
                      <EyeClosed
                        onClick={togglePasswordVisibility}
                        className="absolute mr-3 cursor-pointer"
                      />
                    ) : (
                      <Eye
                        onClick={togglePasswordVisibility}
                        className="absolute mr-3 cursor-pointer"
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {showPassword ? "Hide Password" : "Show Password"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div>
            <Label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Confirmar Contraseña
            </Label>
            <div className="flex items-center justify-end">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                required
              />
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="bg-red-200 absolute mr-9 mb-5">
                    {showPassword ? (
                      <EyeClosed
                        onClick={togglePasswordVisibility}
                        className="absolute mr-3 cursor-pointer"
                      />
                    ) : (
                      <Eye
                        onClick={togglePasswordVisibility}
                        className="absolute mr-3 cursor-pointer"
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {showPassword ? "Hide Password" : "Show Password"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Registrando..." : "Registrar"}
          </Button>
        </form>
      </div>
    </BlurFade>
  );
}
