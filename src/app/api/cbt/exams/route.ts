import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  return NextResponse.json({ 
    exams: [],
    message: "Exams retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "recruiter" && session.role !== "super_admin" && session.role !== "recruitment_admin" && session.role !== "cbt_admin") {
    return NextResponse.json({ error: "Only recruiters can create CBT exams" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, description, jobId, duration, passingScore, randomizeQuestions } = body;

    if (!title) {
      return NextResponse.json({ error: "Exam title is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "CBT exam created",
      examId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 });
  }
}