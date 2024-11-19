import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function LayoutAuth() {
  return (
    <div className="min-h-[900px] flex flex-col lg:flex-row mt-3 rounded-xl">
      <div className="lg:w-1/2 p-10 flex flex-col justify-between relative">
        <h2 className="text-2xl font-semibold z-50">RaceNation</h2>
        <Image src="https://images.unsplash.com/photo-1602977050077-a669542f8dd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="authImage" fill objectFit="cover" className="absolute rounded-xl"/>
        <p className="text-xl z-50">
            Bienvenido a RaceNation, la comunidad líder para los amantes de la velocidad, los autos y la adrenalina.
        </p>
      </div>
      <div className="lg:w-1/2 p-10 flex items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px] min-h-[400px] flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
            <TabsTrigger value="login">Ingresar</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
