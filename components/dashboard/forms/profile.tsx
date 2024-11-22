import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    instagram: "",
    tiktok: "",
    profileImage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/auth/user/${user.id}`);
      if (!response.ok) throw new Error("Error al obtener información del usuario");

      const data = await response.json();
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        role: data.user.role || "",
        instagram: data.user.instagram || "",
        tiktok: data.user.tiktok || "",
        profileImage: data.user.profileImage || "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error al cargar la información del usuario.",
      });
    }
  }, [user?.id, toast]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen a S3");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
      throw new Error("Error al subir la imagen");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.profileImage;

      if (selectedFile) {
        imageUrl = await uploadImageToS3(selectedFile);
      }

      const updatedData = {
        ...formData,
        profileImage: imageUrl,
      };

      const response = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la información del usuario");
      }

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente.",
      });

      await fetchUserData();

      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error al actualizar tu perfil.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-12 flex flex-col lg:flex-row gap-5">
      <div className="lg:w-1/2 flex flex-col gap-5">
        <Label htmlFor="userName">Nombre</Label>
        <Input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          readOnly
        />
        <Label htmlFor="role">Rol</Label>
        <Input
          name="role"
          type="text"
          value={formData.role}
          onChange={handleChange}
          placeholder="Rol"
          readOnly
        />
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          name="instagram"
          type="text"
          value={formData.instagram}
          onChange={handleChange}
          placeholder="URL de Instagram"
        />
        <Label htmlFor="tiktok">TikTok</Label>
        <Input
          name="tiktok"
          type="text"
          value={formData.tiktok}
          onChange={handleChange}
          placeholder="URL de TikTok"
        />
      </div>
      <div className="flex items-center justify-center flex-col lg:w-1/2 gap-5">
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src={formData.profileImage || "https://via.placeholder.com/200"} className="object-contain" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input type="file" onChange={handleFileChange} className="lg:w-1/4" />
        <div className="w-full flex items-end justify-end h-full">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </form>
  );
}
