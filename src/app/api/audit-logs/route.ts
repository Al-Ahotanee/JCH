import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const action = searchParams.get("action");
  const entityType = searchParams.get("entityType");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  const mockLogs = [
    { id: 1, userId: 1, action: "LOGIN", entityType: "auth", details: "User logged in", createdAt: new Date().toISOString() },
    { id: 2, userId: 1, action: "PROFILE_UPDATE", entityType: "profile", details: "Updated personal information", createdAt: new Date().toISOString() },
    { id: 3, userId: 2, action: "JOB_APPLY", entityType: "job", entityId: 5, details: "Applied for Software Developer position", createdAt: new Date().toISOString() },
    { id: 4, userId: 1, action: "COURSE_ENROLL", entityType: "course", entityId: 1, details: "Enrolled in Introduction to Programming", createdAt: new Date().toISOString() },
    { id: 5, userId: 3, action: "MENTOR_REQUEST", entityType: "mentorship", details: "Requested mentor assignment", createdAt: new Date().toISOString() },
  ];

  let filtered = mockLogs;

  if (user.role !== "super_admin" && user.role !== "citizen_db_admin") {
    filtered = filtered.filter(log => log.userId === user.id);
  }

  if (userId) filtered = filtered.filter(log => log.userId === parseInt(userId));
  if (action) filtered = filtered.filter(log => log.action === action);
  if (entityType) filtered = filtered.filter(log => log.entityType === entityType);

  const paginated = filtered.slice(offset, offset + limit);

  return NextResponse.json({
    logs: paginated,
    total: filtered.length,
    limit,
    offset,
  });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action, entityType, entityId, details } = body;

  const newLog = {
    id: Date.now(),
    userId: user.id,
    action,
    entityType,
    entityId,
    details,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ success: true, log: newLog });
}