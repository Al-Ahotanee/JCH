import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 });
  }

  return NextResponse.json({ 
    results: {
      users: [],
      jobs: [],
      courses: [],
      mentors: []
    },
    query,
    type,
    message: "Search completed" 
  });
}