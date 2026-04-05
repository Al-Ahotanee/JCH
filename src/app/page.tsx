import Link from "next/link";
import { getSession } from "@/lib/server-session";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await getSession();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">J</span>
            </div>
            <span className="text-2xl font-bold">J-Connect</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Jigawa State Human Capital Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Empowering{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Jigawa&apos;s Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto">
            The complete ecosystem for career development, mentorship, jobs, and learning - 
            connecting students, professionals, and employers across all 27 LGAs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Create Free Account
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-lg transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "27", label: "LGAs Covered" },
              { value: "50K+", label: "Citizens Registered" },
              { value: "500+", label: "Active Jobs" },
              { value: "100+", label: "Expert Mentors" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A complete platform designed to accelerate your career and connect you with opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👤",
                title: "Smart Profile",
                description: "Comprehensive profile with education, skills, certifications, and auto-generated CV.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "💼",
                title: "Job Directory",
                description: "Access external and internal job postings with smart matching and notifications.",
                color: "from-emerald-500 to-green-500"
              },
              {
                icon: "🎯",
                title: "Mentorship",
                description: "Connect with experienced Trailblazers for career guidance and skill development.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "📚",
                title: "E-Learning",
                description: "Enroll in courses, track progress, earn certificates with QR verification.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: "📊",
                title: "Advanced Reports",
                description: "Filter-based analytics by LGA, qualification, skills, employment status.",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: "🔔",
                title: "Smart Notifications",
                description: "Stay updated with job alerts, mentor messages, interview requests, and more.",
                color: "from-indigo-500 to-blue-500"
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-6 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all hover:transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How J-Connect Works</h2>
            <p className="text-xl text-slate-400">Your journey to success starts in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and build your comprehensive profile with education, skills, and work experience."
              },
              {
                step: "02",
                title: "Connect & Learn",
                description: "Find mentors, browse jobs, enroll in courses, and build your professional network."
              },
              {
                step: "03",
                title: "Launch Your Career",
                description: "Apply to jobs, attend interviews, earn certificates, and accelerate your journey."
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-white/5 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative z-10 p-8">
                  <h3 className="text-2xl font-bold mb-3 text-emerald-400">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Everyone</h2>
            <p className="text-xl text-slate-400">Whether you&apos;re a student, employer, or administrator</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Students", icon: "🎓", desc: "Build skills and find opportunities" },
              { title: "Job Seekers", icon: "🔍", desc: "Access exclusive job listings" },
              { title: "Employers", icon: "🏢", desc: "Post jobs and find talent" },
              { title: "Mentors", icon: "🌟", desc: "Guide the next generation" },
            ].map((role, i) => (
              <div key={i} className="p-6 bg-slate-900 border border-white/10 rounded-2xl text-center hover:border-emerald-500/30 transition-all">
                <div className="text-4xl mb-4">{role.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                <p className="text-slate-400 text-sm">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of Jigawa residents already building their careers on J-Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Get Started Free
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-lg transition-all"
            >
              Sign In to Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">J</span>
              </div>
              <span className="text-lg font-bold">J-Connect</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 J-Connect. Jigawa State Human Capital Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}