import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdmin(session) && session.role !== "citizen_db_admin" && session.role !== "lga_officer") {
    return NextResponse.json({ error: "Only admins can bulk upload users" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const lga = formData.get("lga") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const allowedTypes = ["text/csv", "application/vnd.ms-excel", "text/plain"];
    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!allowedTypes.includes(file.type) && !hasValidExtension) {
      return NextResponse.json({ error: "Only CSV and Excel files are allowed" }, { status: 400 });
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 50MB limit" }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split("\n").filter(line => line.trim());
    
    if (lines.length < 2) {
      return NextResponse.json({ error: "File must contain headers and at least one record" }, { status: 400 });
    }

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
    const requiredFields = ["email", "full_name"];
    const missingFields = requiredFields.filter(f => !headers.includes(f));
    
    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 });
    }

    const records = [];
    const errors = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim());
      const record: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        record[header] = values[index] || "";
      });

      if (!record.email || !record.full_name) {
        errors.push({ row: i + 1, error: "Missing email or full_name" });
        continue;
      }

      if (lga) record.lga = lga;
      if (!record.state_of_origin) record.state_of_origin = "Jigawa";
      if (!record.nationality) record.nationality = "Nigerian";
      if (!record.role) record.role = "user";

      records.push(record);
    }

    return NextResponse.json({
      success: true,
      message: `Parsed ${records.length} records from file`,
      totalRecords: records.length,
      errors: errors.length > 0 ? errors : null,
      preview: records.slice(0, 5)
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}