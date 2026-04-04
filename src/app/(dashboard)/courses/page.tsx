import { getSession } from "@/lib/server-session";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const user = await getSession();
  if (!user) return null;

  const allCourses: any[] = [];
  const myEnrollments: any[] = [];

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">E-Learning Platform</h1>
          <p className="text-slate-600">Learn new skills and earn certifications</p>
        </div>
        {user.role === "instructor" && (
          <Button>Create Course</Button>
        )}
      </div>

      {myEnrollments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">My Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myEnrollments.map((enrollment: any) => (
              <Card key={enrollment.id} variant="bordered">
                <CardContent>
                  <p className="font-medium">Course #{enrollment.courseId}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.length > 0 ? (
          allCourses.map((course: any) => (
            <Card key={course.id} variant="bordered" className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <span className="text-4xl text-white">📚</span>
              </div>
              <CardContent>
                <CardTitle className="mb-2">{course.title}</CardTitle>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">{course.description}</p>
                <Button className="w-full" size="sm">Enroll Now</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card variant="bordered" className="col-span-full">
            <CardContent className="text-center py-12">
              <p className="text-slate-500">No courses available yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}