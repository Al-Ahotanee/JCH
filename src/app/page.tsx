import Link from "next/link";
import { getSession } from "@/lib/server-session";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faBriefcase, 
  faChalkboardUser, 
  faBook, 
  faChartBar, 
  faBell,
  faArrowRight,
  faCheckCircle,
  faUsers,
  faBuilding,
  faStar,
  faSearch,
  faGraduationCap,
  faHandshake,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faGlobe,
  faArrowTrendUp
} from "@fortawesome/free-solid-svg-icons";

export default async function LandingPage() {
  const user = await getSession();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faGlobe} className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold">J-Connect</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors font-medium">
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              Get Started
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 mb-10">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="font-medium">Jigawa State Human Capital Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Empowering{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Jigawa&apos;s Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The complete ecosystem for career development, mentorship, jobs, and learning - 
            connecting students, professionals, and employers across all 27 LGAs.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3"
            >
              Create Free Account
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUser} />
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
            {[
              { value: "27", label: "LGAs Covered", icon: faMapMarkerAlt },
              { value: "50K+", label: "Citizens Registered", icon: faUsers },
              { value: "500+", label: "Active Jobs", icon: faBriefcase },
              { value: "100+", label: "Expert Mentors", icon: faStar },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={stat.icon} className="text-emerald-400 text-xl" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Everything You Need to Succeed</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A complete platform designed to accelerate your career and connect you with opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: faUser,
                title: "Smart Profile",
                description: "Comprehensive profile with education, skills, certifications, and auto-generated CV.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: faBriefcase,
                title: "Job Directory",
                description: "Access external and internal job postings with smart matching and notifications.",
                gradient: "from-emerald-500 to-green-500"
              },
              {
                icon: faChalkboardUser,
                title: "Mentorship",
                description: "Connect with experienced Trailblazers for career guidance and skill development.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: faBook,
                title: "E-Learning",
                description: "Enroll in courses, track progress, earn certificates with QR verification.",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                icon: faChartBar,
                title: "Advanced Reports",
                description: "Filter-based analytics by LGA, qualification, skills, employment status.",
                gradient: "from-red-500 to-pink-500"
              },
              {
                icon: faBell,
                title: "Smart Notifications",
                description: "Stay updated with job alerts, mentor messages, interview requests, and more.",
                gradient: "from-indigo-500 to-blue-500"
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-8 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">How J-Connect Works</h2>
            <p className="text-xl text-slate-400">Your journey to success starts in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and build your comprehensive profile with education, skills, and work experience.",
                icon: faUser
              },
              {
                step: "02",
                title: "Connect & Learn",
                description: "Find mentors, browse jobs, enroll in courses, and build your professional network.",
                icon: faHandshake
              },
              {
                step: "03",
                title: "Launch Your Career",
                description: "Apply to jobs, attend interviews, earn certificates, and accelerate your journey.",
                icon: faArrowTrendUp
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-9xl font-bold text-white/[0.03] absolute -top-6 -left-4">{item.step}</div>
                <div className="relative z-10 p-8 bg-slate-800/30 rounded-2xl border border-white/5">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                    <FontAwesomeIcon icon={item.icon} className="text-emerald-400 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-white/10">
                      <FontAwesomeIcon icon={faArrowRight} className="text-emerald-500" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Built for Everyone</h2>
            <p className="text-xl text-slate-400">Whether you&apos;re a student, employer, or administrator</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Students", icon: faGraduationCap, desc: "Build skills and find opportunities" },
              { title: "Job Seekers", icon: faSearch, desc: "Access exclusive job listings" },
              { title: "Employers", icon: faBuilding, desc: "Post jobs and find talent" },
              { title: "Mentors", icon: faStar, desc: "Guide the next generation" },
            ].map((role, i) => (
              <div key={i} className="p-8 bg-slate-900 border border-white/10 rounded-2xl text-center hover:border-emerald-500/30 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FontAwesomeIcon icon={role.icon} className="text-emerald-400 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
                <p className="text-slate-400">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Future?</h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of Jigawa residents already building their careers on J-Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3"
            >
              Get Started Free
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUser} />
              Sign In to Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faGlobe} className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold">J-Connect</span>
            </div>
            <p className="text-slate-400">
              &copy; 2024 J-Connect. Jigawa State Human Capital Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faPhone} className="text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}