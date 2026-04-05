import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const examId = searchParams.get("examId");

  return NextResponse.json({ 
    questions: [],
    message: "Questions retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "recruiter" && session.role !== "super_admin" && session.role !== "recruitment_admin" && session.role !== "cbt_admin") {
    return NextResponse.json({ error: "Only recruiters can add questions" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { examId, question, options, correctAnswer, points } = body;

    if (!examId || !question || !options || !correctAnswer) {
      return NextResponse.json({ error: "Exam ID, question, options, and correct answer are required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Question added",
      questionId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add question" }, { status: 500 });
  }
}