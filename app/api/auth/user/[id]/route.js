import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID de usuario inválido" },
        { status: 400 }
      );
    }

    const db = await connectToDB("RaceNationHub");
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Usuario encontrado",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          instagram: user.instagram || "",
          tiktok: user.tiktok || "",
          profileImage: user.profileImage || "",
          createdAt: user.createdAt || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
