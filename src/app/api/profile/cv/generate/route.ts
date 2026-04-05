import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-session";

interface Education {
  id: number;
  institutionName: string;
  qualificationType: string;
  fieldOfStudy: string;
  yearOfGraduation: number;
  grade: string;
}

interface Employment {
  id: number;
  employmentStatus: string;
  currentEmployer: string;
  jobTitle: string;
  sector: string;
  workDuration: string;
}

interface Skill {
  id: number;
  skillName: string;
  category: string;
}

interface Certification {
  id: number;
  certificationName: string;
  issuingOrganization: string;
  dateObtained: string;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  ward: string;
  village: string;
  residentialAddress: string;
}

function generateCVHTML(
  profile: UserProfile,
  education: Education[],
  employment: Employment[],
  skills: Skill[],
  certifications: Certification[]
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CV - ${profile.fullName || "User"}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
    .name { font-size: 28px; font-weight: bold; }
    .contact { color: #666; margin-top: 10px; }
    h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px; }
    .section { margin-bottom: 20px; }
    .item { margin-bottom: 10px; }
    .label { font-weight: bold; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill-tag { background: #e0e0e0; padding: 5px 10px; border-radius: 3px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${profile.fullName || "N/A"}</div>
    <div class="contact">
      ${profile.email || ""} | ${profile.phone || ""}
    </div>
    <div class="contact">
      ${profile.residentialAddress || ""}, ${profile.lga || ""}, ${profile.stateOfOrigin || ""}
    </div>
  </div>

  <div class="section">
    <h2>Personal Information</h2>
    <div class="item"><span class="label">Gender:</span> ${profile.gender || "N/A"}</div>
    <div class="item"><span class="label">Date of Birth:</span> ${profile.dateOfBirth || "N/A"}</div>
    <div class="item"><span class="label">Marital Status:</span> ${profile.maritalStatus || "N/A"}</div>
    <div class="item"><span class="label">Nationality:</span> ${profile.nationality || "Nigerian"}</div>
    <div class="item"><span class="label">State of Origin:</span> ${profile.stateOfOrigin || "Jigawa"}</div>
    <div class="item"><span class="label">LGA:</span> ${profile.lga || "N/A"}</div>
    <div class="item"><span class="label">Ward:</span> ${profile.ward || "N/A"}</div>
  </div>

  ${education.length > 0 ? `
  <div class="section">
    <h2>Educational Background</h2>
    ${education.map(edu => `
    <div class="item">
      <span class="label">${edu.qualificationType} - ${edu.fieldOfStudy}</span><br>
      ${edu.institutionName} | Year: ${edu.yearOfGraduation} | Grade: ${edu.grade}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${employment.length > 0 ? `
  <div class="section">
    <h2>Work Experience</h2>
    ${employment.map(emp => `
    <div class="item">
      <span class="label">${emp.jobTitle || "Position"}</span> at ${emp.currentEmployer || "Company"}<br>
      ${emp.employmentStatus} | ${emp.sector} | ${emp.workDuration || ""}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${skills.length > 0 ? `
  <div class="section">
    <h2>Skills & Competencies</h2>
    <div class="skills-list">
      ${skills.map(skill => `<span class="skill-tag">${skill.skillName}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${certifications.length > 0 ? `
  <div class="section">
    <h2>Professional Certifications</h2>
    ${certifications.map(cert => `
    <div class="item">
      <span class="label">${cert.certificationName}</span><br>
      ${cert.issuingOrganization} | Date: ${cert.dateObtained}
    </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `.trim();
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "html";
  const userId = parseInt(searchParams.get("userId") || session.id.toString());

  const profile: UserProfile = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    gender: "Male",
    dateOfBirth: "1995-01-01",
    maritalStatus: "Single",
    nationality: "Nigerian",
    stateOfOrigin: "Jigawa",
    lga: "Dutse",
    ward: "Ward 1",
    village: "Village 1",
    residentialAddress: "123 Main St"
  };

  const education: Education[] = [];
  const employment: Employment[] = [];
  const skills: Skill[] = [];
  const certifications: Certification[] = [];

  if (format === "html") {
    const html = generateCVHTML(profile, education, employment, skills, certifications);
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="CV_${profile.fullName}.html"`
      }
    });
  }

  if (format === "pdf") {
    return NextResponse.json({
      success: true,
      message: "PDF generation would require a PDF library like puppeteer or @react-pdf/renderer",
      preview: generateCVHTML(profile, education, employment, skills, certifications)
    });
  }

  return NextResponse.json({
    profile,
    education,
    employment,
    skills,
    certifications
  });
}