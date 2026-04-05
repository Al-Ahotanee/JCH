import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

function convertToCSV(data: Record<string, any>[]): string {
  if (data.length === 0) return "";
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];
  
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      const escaped = String(value ?? "").replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  
  return csvRows.join("\n");
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdmin(session) && session.role !== "citizen_db_admin" && session.role !== "lga_officer") {
    return NextResponse.json({ error: "Only admins can export data" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { data, format = "csv", filename = "export" } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: "Data array is required" }, { status: 400 });
    }

    let content: string;
    let contentType: string;
    let extension: string;

    switch (format.toLowerCase()) {
      case "csv":
        content = convertToCSV(data);
        contentType = "text/csv";
        extension = "csv";
        break;
      
      case "json":
        content = JSON.stringify(data, null, 2);
        contentType = "application/json";
        extension = "json";
        break;
      
      case "excel":
        content = convertToCSV(data);
        contentType = "application/vnd.ms-excel";
        extension = "xls";
        break;
      
      default:
        content = convertToCSV(data);
        contentType = "text/csv";
        extension = "csv";
    }

    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}.${extension}"`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}