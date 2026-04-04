import { redirect } from "next/navigation";
import { getSession, isSuperAdmin } from "@/lib/server-session";
import { roleLabels } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const user = await getSession();
  if (!user) redirect("/login");
  if (!isSuperAdmin(user)) redirect("/dashboard");

  const allUsers: any[] = [];
  const roleCounts: any[] = [];

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
      <p className="text-slate-600 mb-8">Manage all registered users and their roles</p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {roleCounts.map((rc: any) => (
          <Card key={rc.role} variant="bordered">
            <CardContent className="text-center py-4">
              <p className="text-2xl font-bold text-slate-900">{rc.count}</p>
              <p className="text-xs text-slate-600">{roleLabels[rc.role as keyof typeof roleLabels] || rc.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card variant="bordered">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>
            <Button size="sm">Add User</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u: any) => (
                  <tr key={u.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm">{u.id}</td>
                    <td className="py-3 px-4 text-sm font-medium">{u.fullName ?? "-"}</td>
                    <td className="py-3 px-4 text-sm">{u.email}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs">
                        {roleLabels[u.role as keyof typeof roleLabels] || u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {u.isApproved ? (
                        <span className="text-emerald-600">Approved</span>
                      ) : (
                        <span className="text-amber-600">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-500">
                      {u.createdAt?.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="ghost">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}