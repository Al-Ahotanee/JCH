import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ 
    education: [],
    message: "Education records retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { institutionName, qualificationType, fieldOfStudy, yearOfGraduation, grade } = body;

    if (!institutionName || !qualificationType) {
      return NextResponse.json({ error: "Institution and qualification are required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Education added",
      educationId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add education" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Education ID required" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Education deleted" });
}