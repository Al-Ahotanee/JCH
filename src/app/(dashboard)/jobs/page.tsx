import { getSession } from "@/lib/server-session";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  const user = await getSession();
  if (!user) return null;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Directory</h1>
          <p className="text-slate-600">Find opportunities that match your skills</p>
        </div>
        {user.role === "recruiter" && (
          <Button>Post a Job</Button>
        )}
      </div>

      <Card variant="bordered">
        <CardContent className="text-center py-12">
          <p className="text-slate-500">No jobs available at the moment.</p>
          <p className="text-sm text-slate-400 mt-2">Check back later for new opportunities.</p>
        </CardContent>
      </Card>
    </div>
  );
}