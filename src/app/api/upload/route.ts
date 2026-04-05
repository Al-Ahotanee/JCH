import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png", "image/jpg"];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "File uploaded",
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/${session.id}/${file.name}`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}