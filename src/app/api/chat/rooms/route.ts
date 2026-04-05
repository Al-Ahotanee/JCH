import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ 
    rooms: [],
    message: "Chat rooms retrieved" 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, topic } = body;

    if (!name) {
      return NextResponse.json({ error: "Room name is required" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Chat room created",
      roomId: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chat room" }, { status: 500 });
  }
}