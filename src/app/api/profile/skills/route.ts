import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ 
    skills: [],
    message: "Skills retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { skillName, category, proficiencyLevel } = body;

    if (!skillName) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Skill added",
      skillId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
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
    return NextResponse.json({ error: "Skill ID required" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Skill deleted" });
}