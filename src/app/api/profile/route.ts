import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ 
    message: "Profile API ready",
    userId: session.id,
    role: session.role 
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { fullName, phone, gender, dateOfBirth, maritalStatus, nationality, stateOfOrigin, lga, ward, village, residentialAddress, nin } = body;

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated",
      userId: session.id 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}