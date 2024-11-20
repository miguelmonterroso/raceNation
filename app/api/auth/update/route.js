import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { z } from "zod";

const updateUserSchema = z.object({
  email: z.string().email({ message: "El correo electrónico debe ser válido" }),
  name: z.string().optional(),
  role: z.string().optional(),
  profileImage: z.string().url({ message: "La URL de la imagen debe ser válida" }).optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
});

export async function PUT(req) {
  try {
    const body = await req.json();
    const validatedData = updateUserSchema.parse(body);

    const { email, ...updates } = validatedData;

    const db = await connectToDB("RaceNationHub");
    const collection = db.collection("users");

    const existingUser = await collection.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const result = await collection.updateOne(
      { email },
      { $set: updates }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No se realizaron cambios, los datos pueden ser iguales" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Usuario actualizado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Error de validación", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error al actualizar usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
