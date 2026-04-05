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
  const lga = searchParams.get("lga");
  const sector = searchParams.get("sector");
  const qualification = searchParams.get("qualification");
  const employmentStatus = searchParams.get("employmentStatus");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Search query must be at least 2 characters" }, { status: 400 });
  }

  const searchTerm = query.toLowerCase();
  const offset = (page - 1) * limit;

  const results: Record<string, any[]> = {
    users: [],
    jobs: [],
    courses: [],
    mentors: [],
    skills: []
  };

  const totalResults: Record<string, number> = {
    users: 0,
    jobs: 0,
    courses: 0,
    mentors: 0,
    skills: 0
  };

  const hasFilters = !!(lga || sector || qualification || employmentStatus || category);

  return NextResponse.json({
    success: true,
    query,
    type,
    filters: hasFilters ? { lga, sector, qualification, employmentStatus, category } : null,
    page,
    limit,
    results,
    total: totalResults,
    message: "Search completed"
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { query, filters, types } = body;

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    const searchTypes = types || ["users", "jobs", "courses", "mentors", "skills"];
    const appliedFilters = filters || {};

    return NextResponse.json({
      success: true,
      query,
      types: searchTypes,
      filters: appliedFilters,
      results: {},
      message: "Advanced search initiated"
    });
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}