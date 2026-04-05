import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const lga = searchParams.get("lga");
  const qualification = searchParams.get("qualification");
  const employmentType = searchParams.get("employmentType");
  const industry = searchParams.get("industry");

  return NextResponse.json({ 
    jobs: [],
    filters: { lga, qualification, employmentType, industry },
    message: "Jobs retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "recruiter" && session.role !== "super_admin" && session.role !== "recruitment_admin") {
    return NextResponse.json({ error: "Only recruiters can post jobs" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, description, jobType, industry, qualification, skillRequirement, experienceLevel, location, lga, employmentType, applicationDeadline, isInternal } = body;

    if (!title) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Job posted",
      jobId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}