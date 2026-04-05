import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");

  return NextResponse.json({ 
    courses: [],
    message: "Courses retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "instructor" && session.role !== "super_admin" && session.role !== "learning_admin") {
    return NextResponse.json({ error: "Only instructors can create courses" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, description, category, level, duration, price, isFree, thumbnail } = body;

    if (!title) {
      return NextResponse.json({ error: "Course title is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Course created",
      courseId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}