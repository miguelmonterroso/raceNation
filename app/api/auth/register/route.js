import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/mongodb";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  email: z.string().email({ message: "El correo electrónico debe ser válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await connectToDB("RaceNationHub");
    const collection = db.collection("users");

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const result = await collection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user", // Se agrega el rol por defecto
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Usuario registrado exitosamente", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Error de validación", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error al registrar usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
