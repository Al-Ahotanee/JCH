import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ 
    results: [],
    message: "Results retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { examId, answers } = body;

    if (!examId || !answers) {
      return NextResponse.json({ error: "Exam ID and answers are required" }, { status: 400 });
    }

    const score = Math.floor(Math.random() * 100);
    const passed = score >= 70;

    return NextResponse.json({ 
      success: true, 
      message: "Exam submitted",
      result: {
        examId,
        score,
        passed,
        totalPoints: 100,
        submittedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit exam" }, { status: 500 });
  }
}