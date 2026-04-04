import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/server-session";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

export const dynamic = 'force-dynamic';

const lgaOptions = [
  "Auyo", "Babura", "Birnin Kudu", "Birniwa", "Buji", "Dankump", "Dutse", "Gagarawa",
  "Garki", "Gumel", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Madachi", "Kazaure",
  "Kiri Kasama", "Kiyawa", "Kuangara", "Maigatari", "Malam Madori", "Miga", "Ringim",
  "Roni", "Sanga", "Sule Tankarkar", "Taura", "Yankwashi"
].map(l => ({ value: l, label: l }));

const qualificationOptions = [
  { value: "SSCE", label: "SSCE" },
  { value: "NCE", label: "NCE" },
  { value: "ND", label: "ND" },
  { value: "HND", label: "HND" },
  { value: "B.Sc", label: "B.Sc" },
  { value: "PGD", label: "PGD" },
  { value: "M.Sc", label: "M.Sc" },
  { value: "PhD", label: "PhD" },
];

const employmentStatusOptions = [
  { value: "unemployed", label: "Unemployed" },
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-Employed" },
  { value: "retired", label: "Retired" },
];

export default async function ReportsPage() {
  const user = await getSession();
  if (!user) redirect("/login");
  if (!isAdmin(user)) redirect("/dashboard");

  const usersByGender = [
    { gender: "male", count: 0 },
    { gender: "female", count: 0 },
  ];

  const usersByRole = [
    { role: "user", count: 0 },
    { role: "recruiter", count: 0 },
    { role: "mentor", count: 0 },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
      <p className="text-slate-600 mb-8">Generate insights on human capital in Jigawa State</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card variant="bordered">
          <CardContent className="text-center py-6">
            <p className="text-4xl font-bold text-emerald-600">0</p>
            <p className="text-slate-600">Total Citizens</p>
          </CardContent>
        </Card>
        <Card variant="bordered">
          <CardContent className="text-center py-6">
            <p className="text-4xl font-bold text-blue-600">27</p>
            <p className="text-slate-600">LGAs Covered</p>
          </CardContent>
        </Card>
        <Card variant="bordered">
          <CardContent className="text-center py-6">
            <p className="text-4xl font-bold text-purple-600">12</p>
            <p className="text-slate-600">User Roles</p>
          </CardContent>
        </Card>
        <Card variant="bordered">
          <CardContent className="text-center py-6">
            <p className="text-4xl font-bold text-amber-600">9</p>
            <p className="text-slate-600">Qualification Types</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Users by Gender</CardTitle>
          </CardHeader>
          <CardContent>
            {usersByGender.length > 0 ? (
              <div className="space-y-3">
                {usersByGender.map((g: any) => (
                  <div key={g.gender} className="flex justify-between items-center">
                    <span className="text-slate-700 capitalize">{g.gender ?? "Not specified"}</span>
                    <span className="font-semibold">{g.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No data available</p>
            )}
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            {usersByRole.length > 0 ? (
              <div className="space-y-3">
                {usersByRole.map((r: any) => (
                  <div key={r.role} className="flex justify-between items-center">
                    <span className="text-slate-700 capitalize">{r.role}</span>
                    <span className="font-semibold">{r.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select label="Filter by LGA" name="lga" options={lgaOptions} />
            <Select label="Qualification Level" name="qualification" options={qualificationOptions} />
            <Select label="Employment Status" name="employmentStatus" options={employmentStatusOptions} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Generate Report</Button>
            <Button variant="outline">Export CSV</Button>
            <Button variant="outline">Export PDF</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}