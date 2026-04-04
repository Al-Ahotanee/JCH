import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/server-session";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export const dynamic = 'force-dynamic';

const lgaOptions = [
  "Auyo", "Babura", "Birnin Kudu", "Birniwa", "Buji", "Dankump", "Dutse", "Gagarawa",
  "Garki", "Gumel", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Madachi", "Kazaure",
  "Kiri Kasama", "Kiyawa", "Kuangara", "Maigatari", "Malam Madori", "Miga", "Ringim",
  "Roni", "Sanga", "Sule Tankarkar", "Taura", "Yankwashi"
].map(l => ({ value: l, label: l }));

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const maritalOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

export default async function ProfilePage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const userData: any[] = [];
  const userEducation: any[] = [];
  const userEmployment: any[] = [];
  const userSkills: any[] = [];
  const userCertifications: any[] = [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
      <p className="text-slate-600 mb-8">Manage your personal information and credentials</p>

      <div className="space-y-8">
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" name="fullName" defaultValue={userData[0]?.fullName ?? ""} />
            <Input label="Phone" name="phone" defaultValue={userData[0]?.phone ?? ""} />
            <Select label="Gender" name="gender" options={genderOptions} defaultValue={userData[0]?.gender ?? ""} />
            <Input label="Date of Birth" name="dateOfBirth" type="date" defaultValue={userData[0]?.dateOfBirth ?? ""} />
            <Select label="Marital Status" name="maritalStatus" options={maritalOptions} defaultValue={userData[0]?.maritalStatus ?? ""} />
            <Input label="Nationality" name="nationality" defaultValue={userData[0]?.nationality ?? "Nigerian"} />
            <Input label="State of Origin" name="stateOfOrigin" defaultValue={userData[0]?.stateOfOrigin ?? "Jigawa"} />
            <Select label="LGA" name="lga" options={lgaOptions} defaultValue={userData[0]?.lga ?? ""} />
            <Input label="Ward" name="ward" defaultValue={userData[0]?.ward ?? ""} />
            <Input label="Village/Community" name="village" defaultValue={userData[0]?.village ?? ""} />
            <Input label="Residential Address" name="residentialAddress" defaultValue={userData[0]?.residentialAddress ?? ""} />
            <Input label="NIN" name="nin" defaultValue={userData[0]?.nin ?? ""} />
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Educational Background</h2>
          {userEducation.length > 0 ? (
            <div className="space-y-3">
              {userEducation.map((edu: any) => (
                <div key={edu.id} className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium">{edu.institutionName}</p>
                  <p className="text-sm text-slate-600">{edu.qualificationType} - {edu.fieldOfStudy}</p>
                  <p className="text-sm text-slate-500">Graduated: {edu.yearOfGraduation} | Grade: {edu.grade}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No education records added yet.</p>
          )}
          <Button variant="outline" className="mt-4">Add Education</Button>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Employment Information</h2>
          {userEmployment.length > 0 ? (
            <div className="space-y-3">
              {userEmployment.map((emp: any) => (
                <div key={emp.id} className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium">{emp.jobTitle} at {emp.currentEmployer}</p>
                  <p className="text-sm text-slate-600">{emp.employmentStatus} | {emp.sector}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No employment records added yet.</p>
          )}
          <Button variant="outline" className="mt-4">Add Employment</Button>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Skills & Competencies</h2>
          {userSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {userSkills.map((skill: any) => (
                <span key={skill.id} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  {skill.skillName}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No skills added yet.</p>
          )}
          <Button variant="outline" className="mt-4">Add Skill</Button>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Professional Certifications</h2>
          {userCertifications.length > 0 ? (
            <div className="space-y-3">
              {userCertifications.map((cert: any) => (
                <div key={cert.id} className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium">{cert.certificationName}</p>
                  <p className="text-sm text-slate-600">{cert.issuingOrganization}</p>
                  <p className="text-sm text-slate-500">Obtained: {cert.dateObtained}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No certifications added yet.</p>
          )}
          <Button variant="outline" className="mt-4">Add Certification</Button>
        </section>

        <div className="flex justify-end">
          <Button>Save Profile</Button>
        </div>
      </div>
    </div>
  );
}