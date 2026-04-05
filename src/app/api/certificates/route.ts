import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";
import QRCode from "qrcode";

function generateCertificateNumber(courseId: number, userId: number): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const courseCode = courseId.toString(36).toUpperCase();
  const userCode = userId.toString(36).toUpperCase();
  return "JCONN-" + courseCode + "-" + userCode + "-" + timestamp;
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { courseId, courseTitle, userName } = body;

    if (!courseId || !courseTitle || !userName) {
      return NextResponse.json({ error: "Course ID, title, and user name are required" }, { status: 400 });
    }

    const certificateNumber = generateCertificateNumber(courseId, session.id);
    const issuedAt = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const verificationUrl = "https://j-connect.gov.ng/verify/" + certificateNumber;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 150,
      margin: 1,
      color: { dark: "#1a5f2a", light: "#ffffff" }
    });

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificate - ${certificateNumber}</title>
  <style>
    @page { size: landscape; margin: 0; }
    body {
      font-family: 'Georgia', serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #1a5f2a 0%, #2d8b3f 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .certificate {
      width: 90vw;
      max-width: 1100px;
      min-height: 600px;
      background: white;
      border: 8px solid #d4af37;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
      position: relative;
    }
    .header { margin-bottom: 20px; }
    .logo { font-size: 32px; font-weight: bold; color: #1a5f2a; margin-bottom: 5px; }
    .tagline { color: #666; font-size: 14px; font-style: italic; }
    .title { font-size: 48px; color: #d4af37; margin: 30px 0; text-transform: uppercase; letter-spacing: 8px; font-weight: bold; }
    .recipient { font-size: 36px; color: #333; margin: 20px 0; font-weight: bold; }
    .course-label { font-size: 18px; color: #666; margin-top: 30px; }
    .course-name { font-size: 28px; color: #1a5f2a; margin: 10px 0 30px; font-weight: bold; }
    .date { font-size: 14px; color: #999; margin-top: 40px; }
    .footer { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; }
    .signature { text-align: center; width: 200px; }
    .sig-line { border-bottom: 1px solid #333; margin-bottom: 10px; padding-bottom: 5px; }
    .qr-section { position: absolute; top: 20px; right: 20px; }
    .qr-code { width: 80px; height: 80px; }
    .cert-number { font-size: 10px; color: #999; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="logo">J-Connect</div>
      <div class="tagline">Jigawa State Human Capital Platform</div>
    </div>
    <div class="title">Certificate of Completion</div>
    <div class="recipient">${userName}</div>
    <div class="course-label">has successfully completed</div>
    <div class="course-name">${courseTitle}</div>
    <div class="date">Issued on ${issuedAt}</div>
    <div class="footer">
      <div class="signature"><div class="sig-line"></div><div>Program Director</div></div>
      <div class="signature"><div class="sig-line"></div><div>Platform Administrator</div></div>
    </div>
    <div class="qr-section">
      <img src="${qrCodeDataUrl}" alt="QR Code" class="qr-code" />
      <div class="cert-number">${certificateNumber}</div>
    </div>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": "attachment; filename=Certificate_" + certificateNumber + ".html"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate certificate" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const certificateNumber = searchParams.get("certNo");

  if (!certificateNumber) {
    return NextResponse.json({ error: "Certificate number is required" }, { status: 400 });
  }

  const isValid = certificateNumber.startsWith("JCONN-");
  
  return NextResponse.json({
    valid: isValid,
    certificateNumber,
    verifiedAt: new Date().toISOString(),
    message: isValid ? "Certificate is valid" : "Certificate not found"
  });
}