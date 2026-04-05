import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const approved = searchParams.get("approved");

  return NextResponse.json({ 
    mentors: [],
    message: "Mentors retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { category, bio, expertise } = body;

    return NextResponse.json({ 
      success: true, 
      message: "Mentor application submitted",
      mentorId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply as mentor" }, { status: 500 });
  }
}