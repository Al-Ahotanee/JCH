import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const status = searchParams.get("status");

  const mockVideoSessions = [
    {
      id: 1,
      mentorshipSessionId: 1,
      roomId: "room_abc123",
      hostUserId: 1,
      hostName: "Dr. Ahmed Mohammed",
      participantUserId: 2,
      participantName: "Ali Ibrahim",
      status: "completed",
      startedAt: "2026-04-05T10:00:00Z",
      endedAt: "2026-04-05T10:45:00Z",
    },
    {
      id: 2,
      mentorshipSessionId: 2,
      roomId: "room_def456",
      hostUserId: 3,
      hostName: "Engr. Fatima Sani",
      participantUserId: 4,
      participantName: "Musa Yusuf",
      status: "scheduled",
      scheduledAt: "2026-04-06T14:00:00Z",
    },
  ];

  let filtered = mockVideoSessions;

  filtered = filtered.filter(
    (s) => s.hostUserId === user.id || s.participantUserId === user.id
  );

  if (sessionId) {
    filtered = filtered.filter((s) => s.mentorshipSessionId === parseInt(sessionId));
  }
  if (status) {
    filtered = filtered.filter((s) => s.status === status);
  }

  return NextResponse.json({ sessions: filtered });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { mentorshipSessionId, participantId, scheduledAt, duration } = body;

  const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const newSession = {
    id: Date.now(),
    mentorshipSessionId,
    roomId,
    hostUserId: user.id,
    hostName: user.fullName || "Host",
    participantUserId: participantId,
    status: "scheduled",
    scheduledAt: scheduledAt || new Date().toISOString(),
    duration: duration || 30,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ success: true, session: newSession });
}

export async function PATCH(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { sessionId, action } = body;

  if (action === "start") {
    return NextResponse.json({
      success: true,
      session: {
        id: sessionId,
        status: "active",
        startedAt: new Date().toISOString(),
        webrtcConfig: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        },
      },
    });
  }

  if (action === "end") {
    return NextResponse.json({
      success: true,
      session: {
        id: sessionId,
        status: "completed",
        endedAt: new Date().toISOString(),
      },
    });
  }

  if (action === "join") {
    return NextResponse.json({
      success: true,
      session: {
        id: sessionId,
        status: "active",
        webrtcConfig: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        },
      },
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}