"use client";

import { SessionUser } from "@/lib/server-session";
import { roleLabels } from "@/lib/types";

interface SidebarProps {
  user: SessionUser;
  currentPath: string;
}

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: "home", roles: ["super_admin", "citizen_db_admin", "mentorship_admin", "recruitment_admin", "cbt_admin", "learning_admin", "lga_officer", "ward_officer", "recruiter", "instructor", "mentor", "user"] },
  { href: "/dashboard/profile", label: "My Profile", icon: "user", roles: ["super_admin", "citizen_db_admin", "mentorship_admin", "recruitment_admin", "cbt_admin", "learning_admin", "lga_officer", "ward_officer", "recruiter", "instructor", "mentor", "user"] },
  { href: "/dashboard/jobs", label: "Jobs", icon: "briefcase", roles: ["super_admin", "citizen_db_admin", "mentorship_admin", "recruitment_admin", "cbt_admin", "learning_admin", "lga_officer", "ward_officer", "recruiter", "instructor", "mentor", "user"] },
  { href: "/dashboard/mentorship", label: "Mentorship", icon: "users", roles: ["super_admin", "citizen_db_admin", "mentorship_admin", "recruitment_admin", "cbt_admin", "learning_admin", "lga_officer", "ward_officer", "recruiter", "instructor", "mentor", "user"] },
  { href: "/dashboard/courses", label: "E-Learning", icon: "book", roles: ["super_admin", "citizen_db_admin", "mentorship_admin", "recruitment_admin", "cbt_admin", "learning_admin", "lga_officer", "ward_officer", "recruiter", "instructor", "mentor", "user"] },
  { href: "/dashboard/admin/users", label: "User Management", icon: "settings", roles: ["super_admin", "citizen_db_admin"] },
  { href: "/dashboard/admin/reports", label: "Reports", icon: "chart", roles: ["super_admin", "citizen_db_admin", "mentorship_admin", "recruitment_admin", "lga_officer"] },
  { href: "/dashboard/admin/audit-logs", label: "Audit Logs", icon: "clipboard", roles: ["super_admin", "citizen_db_admin"] },
  { href: "/dashboard/admin/jobs", label: "Job Management", icon: "briefcase", roles: ["super_admin", "recruitment_admin"] },
  { href: "/dashboard/admin/mentors", label: "Mentor Management", icon: "users", roles: ["super_admin", "mentorship_admin"] },
  { href: "/dashboard/admin/courses", label: "Course Management", icon: "book", roles: ["super_admin", "learning_admin"] },
];

const icons: Record<string, React.ReactNode> = {
  home: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  briefcase: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  users: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  book: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  settings: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  clipboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
};

export function Sidebar({ user, currentPath }: SidebarProps) {
  const userMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-emerald-400">J-Connect</h1>
        <p className="text-xs text-slate-400 mt-1">Human Capital Platform</p>
      </div>
      
      <nav className="space-y-1">
        {userMenuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPath === item.href
                ? "bg-emerald-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {icons[item.icon]}
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 p-4 bg-slate-800 rounded-lg">
        <p className="text-xs text-slate-400">Logged in as</p>
        <p className="font-medium text-white">{user.fullName || "User"}</p>
        <p className="text-xs text-emerald-400">{roleLabels[user.role]}</p>
      </div>
    </aside>
  );
}