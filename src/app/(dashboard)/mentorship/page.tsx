import { getSession } from "@/lib/server-session";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

const mentorCategories = [
  { name: "Academics", icon: "🎓", description: "Professors and researchers" },
  { name: "Civil Servants", icon: "🏛️", description: "Government employees" },
  { name: "Business Owners", icon: "💼", description: "Entrepreneurs and CEOs" },
  { name: "ICT Experts", icon: "💻", description: "Tech professionals" },
  { name: "Medical Professionals", icon: "⚕️", description: "Doctors and health workers" },
  { name: "Engineers", icon: "🔧", description: "Engineering professionals" },
  { name: "Diaspora", icon: "🌍", description: "Professionals abroad" },
];

export default async function MentorshipPage() {
  const user = await getSession();
  if (!user) return null;

  const approvedMentors: any[] = [];
  const myMentor: any[] = [];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Mentorship (Trailblazer)</h1>
        <p className="text-slate-600">Connect with experienced professionals in Jigawa State</p>
      </div>

      {myMentor.length > 0 ? (
        <Card variant="elevated" className="mb-8">
          <CardTitle>Your Assigned Mentor</CardTitle>
          <CardContent>
            <p className="text-slate-600">You have an active mentorship relationship.</p>
            <Button className="mt-4">View Sessions</Button>
          </CardContent>
        </Card>
      ) : (
        <Card variant="bordered" className="mb-8">
          <CardContent className="text-center py-6">
            <p className="text-slate-600">No mentor assigned yet.</p>
            <Button className="mt-4">Request a Mentor</Button>
          </CardContent>
        </Card>
      )}

      <h2 className="text-xl font-semibold text-slate-900 mb-4">Browse Mentors by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {mentorCategories.map((cat) => (
          <Card key={cat.name} variant="bordered" className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="text-center py-4">
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="font-medium text-slate-900 mt-2">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Mentors</h2>
      <div className="grid gap-4">
        {approvedMentors.length > 0 ? (
          approvedMentors.map((mentor: any) => (
            <Card key={mentor.id} variant="bordered">
              <CardContent className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-slate-900">{mentor.fullName ?? "Mentor"}</h3>
                  <p className="text-sm text-slate-600">{mentor.category}</p>
                  <p className="text-sm text-slate-500 mt-1">{mentor.bio}</p>
                  {mentor.expertise && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mentor.expertise.split(",").map((exp: string) => (
                        <span key={exp} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">
                          {exp.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button size="sm">Request</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card variant="bordered">
            <CardContent className="text-center py-8">
              <p className="text-slate-500">No approved mentors available yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}