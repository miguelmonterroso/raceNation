import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/s3";

export async function POST(req) {
  try {
    const formData = await req.formData(); 

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No se encontró ningún archivo" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer()); 
    const fileName = file.name; 
    const fileType = file.type; 

    const result = await uploadFile(fileBuffer, fileName, fileType);

    return NextResponse.json(
      { message: "Archivo subido exitosamente", url: result.Location },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { message: "Error al procesar el archivo" },
      { status: 500 }
    );
  }
}
