import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  return NextResponse.json({ 
    lessons: [],
    message: "Lessons retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "instructor" && session.role !== "super_admin" && session.role !== "learning_admin") {
    return NextResponse.json({ error: "Only instructors can add lessons" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { courseId, title, content, videoUrl, duration, order } = body;

    if (!courseId || !title) {
      return NextResponse.json({ error: "Course ID and title are required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lesson added",
      lessonId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add lesson" }, { status: 500 });
  }
}