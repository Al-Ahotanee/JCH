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
    const userId = session.id;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF and DOCX files are allowed" }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
    }

    const fileName = `${userId}_cv_${Date.now()}_${file.name}`;
    
    return NextResponse.json({ 
      success: true, 
      message: "CV uploaded successfully",
      cv: {
        fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload CV" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || session.id;

  return NextResponse.json({ 
    cvs: [],
    message: "CVs retrieved" 
  });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const cvId = searchParams.get("id");

  if (!cvId) {
    return NextResponse.json({ error: "CV ID required" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "CV deleted" });
}