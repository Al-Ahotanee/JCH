"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const actionLabels: Record<string, string> = {
  LOGIN: "Login",
  LOGOUT: "Logout",
  PROFILE_UPDATE: "Profile Update",
  JOB_APPLY: "Job Application",
  COURSE_ENROLL: "Course Enrollment",
  MENTOR_REQUEST: "Mentor Request",
  USER_CREATE: "User Created",
  USER_UPDATE: "User Updated",
  USER_DELETE: "User Deleted",
  JOB_POST: "Job Posted",
  JOB_EDIT: "Job Edited",
  COURSE_CREATE: "Course Created",
  CERTIFICATE_ISSUE: "Certificate Issued",
};

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "",
    entityType: "",
    userId: "",
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.action) params.set("action", filters.action);
    if (filters.entityType) params.set("entityType", filters.entityType);
    if (filters.userId) params.set("userId", filters.userId);

    try {
      const res = await fetch(`/api/audit-logs?${params}`);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchLogs();
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-slate-600">Track all system activities and user actions</p>
      </div>

      <Card variant="bordered" className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Action Type</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={filters.action}
                onChange={(e) => handleFilterChange("action", e.target.value)}
              >
                <option value="">All Actions</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                <option value="PROFILE_UPDATE">Profile Update</option>
                <option value="JOB_APPLY">Job Apply</option>
                <option value="COURSE_ENROLL">Course Enroll</option>
                <option value="MENTOR_REQUEST">Mentor Request</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Entity Type</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={filters.entityType}
                onChange={(e) => handleFilterChange("entityType", e.target.value)}
              >
                <option value="">All Types</option>
                <option value="auth">Authentication</option>
                <option value="profile">Profile</option>
                <option value="job">Jobs</option>
                <option value="course">Courses</option>
                <option value="mentorship">Mentorship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">User ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter User ID"
                value={filters.userId}
                onChange={(e) => handleFilterChange("userId", e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No audit logs found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Details</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">{log.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">{log.userId}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {actionLabels[log.action] || log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{log.entityType}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{log.details}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}