import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const relationshipId = searchParams.get("relationshipId");

  return NextResponse.json({
    sessions: [],
    message: "Video sessions retrieved"
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { relationshipId, scheduledAt, duration = 60, sessionType = "video" } = body;

    if (!relationshipId) {
      return NextResponse.json({ error: "Relationship ID is required" }, { status: 400 });
    }

    if (!scheduledAt) {
      return NextResponse.json({ error: "Scheduled time is required" }, { status: 400 });
    }

    const sessionId = Date.now().toString(36);
    const roomId = "mentorship_" + sessionId;

    const meetingLink = "https://j-connect.gov.ng/video/" + roomId;

    return NextResponse.json({
      success: true,
      message: "Video session scheduled",
      session: {
        id: sessionId,
        roomId,
        relationshipId,
        scheduledAt,
        duration,
        sessionType,
        meetingLink,
        status: "scheduled"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to schedule session" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { sessionId, status } = body;

    if (!sessionId || !status) {
      return NextResponse.json({ error: "Session ID and status are required" }, { status: 400 });
    }

    const validStatuses = ["scheduled", "in-progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Session status updated",
      sessionId,
      status
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}