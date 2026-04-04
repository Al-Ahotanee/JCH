import { redirect } from "next/navigation";
import { getSession } from "@/lib/server-session";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} currentPath="/dashboard" />
      <main className="flex-1 bg-slate-50 p-8">
        {children}
      </main>
    </div>
  );
}