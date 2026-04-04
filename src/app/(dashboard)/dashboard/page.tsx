import { getSession } from "@/lib/server-session";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent } from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) return null;

  const stats = [
    { label: "Total Citizens", value: "0", color: "bg-blue-500" },
    { label: "Active Jobs", value: "0", color: "bg-emerald-500" },
    { label: "Courses", value: "0", color: "bg-purple-500" },
    { label: "Mentors", value: "0", color: "bg-amber-500" },
  ];

  const quickLinks = [
    { label: "Complete Your Profile", href: "/dashboard/profile", description: "Add your education, skills, and work experience" },
    { label: "Browse Jobs", href: "/dashboard/jobs", description: "Find opportunities that match your skills" },
    { label: "Find a Mentor", href: "/dashboard/mentorship", description: "Connect with experienced professionals" },
    { label: "Learn New Skills", href: "/dashboard/courses", description: "Enroll in courses to boost your career" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome, {user.fullName ?? "User"}!</h1>
      <p className="text-slate-600 mb-8">Your hub for career development in Jigawa State</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4`} />
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <h3 className="font-semibold text-slate-900 mb-1">{link.label}</h3>
            <p className="text-sm text-slate-600">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}