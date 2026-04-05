import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ 
    employment: [],
    message: "Employment records retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { employmentStatus, currentEmployer, jobTitle, sector, workDuration, roles, references } = body;

    if (!employmentStatus) {
      return NextResponse.json({ error: "Employment status is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Employment record added",
      employmentId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add employment" }, { status: 500 });
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
    return NextResponse.json({ error: "Employment ID required" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Employment deleted" });
}