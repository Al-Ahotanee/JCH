import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  return NextResponse.json({ 
    applications: [],
    message: "Applications retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Application submitted",
      applicationId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "recruiter" && session.role !== "super_admin" && session.role !== "recruitment_admin") {
    return NextResponse.json({ error: "Only recruiters can update applications" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ error: "Application ID and status required" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Application status updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}