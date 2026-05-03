import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { 
  Calendar, 
  Palette, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Bell, 
  ArrowRight,
  Shield,
  Zap,
  Globe
} from "lucide-react";

// --- Navbar ---
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardPath = (role) => {
    if (role === "student") return "/student/dashboard";
    if (role === "club") return "/club/dashboard";
    if (role === "admin") return "/admin/dashboard";
    if (role === "superadmin") return "/superadmin/dashboard";
    return "/guest/dashboard";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'h-16 backdrop-blur-2xl bg-white/90 border-b border-gray-200/50 shadow-sm py-0' : 'h-24 bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <span className="font-bold text-lg">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">MyUniLife</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">About</a>
          <a href="#stats" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Stats</a>
          {!user && (
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Login</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => navigate(getDashboardPath(user.role))}
              className="hidden sm:flex font-bold px-6 h-10 rounded-xl shadow-lg shadow-indigo-500/20"
            >
              Dashboard
            </Button>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => navigate("/signup")} 
              className="hidden sm:flex font-bold px-6 h-10 rounded-xl"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Hero ---
const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardPath = (role) => {
    if (role === "student") return "/student/dashboard";
    if (role === "club") return "/club/dashboard";
    if (role === "admin") return "/admin/dashboard";
    if (role === "superadmin") return "/superadmin/dashboard";
    return "/guest/dashboard";
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-violet-400/15 via-fuchsia-400/10 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-indigo-100 shadow-xl shadow-indigo-500/10 mb-12 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Next-Gen Campus Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-10">
          Build your journey.<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Express your art.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
          The all-in-one platform for students, clubs, and universities to manage events, build portfolios, and connect communities.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          {user ? (
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate(getDashboardPath(user.role))}
              className="px-10 h-16 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all group"
            >
              Back to Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate("/signup")} 
                className="px-10 h-16 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-all group"
              >
                Get Started for Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate("/login")} 
                className="px-10 h-16 text-lg font-bold rounded-2xl bg-white border border-slate-200 shadow-lg hover:bg-slate-50 transition-all"
              >
                I have an account
              </Button>
            </>
          )}
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mt-24 max-w-5xl mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl scale-105 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/50 shadow-2xl overflow-hidden transform hover:-rotate-1 transition-transform duration-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">M</div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Dashboard</p>
                  <p className="text-[10px] text-slate-500">Alex's Hub</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><Bell size={14} className="text-slate-500" /></div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500"></div>
              </div>
            </div>
            {/* Body */}
            <div className="flex">
              <div className="w-48 p-6 border-r border-slate-100 hidden md:block">
                <div className="space-y-3">
                  {['Overview', 'Events', 'Portfolio', 'Clubs', 'Settings'].map((item, i) => (
                    <div key={item} className={`h-8 rounded-lg px-3 flex items-center text-[10px] font-bold ${i === 0 ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'text-slate-400'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-8 space-y-8">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: 'Events', value: '12', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Views', value: '2.4k', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Clubs', value: '8', icon: Users, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                        <stat.icon size={16} className={stat.color} />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-lg font-black text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-48 bg-slate-50 rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold text-slate-900">Recent Activity</p>
                    <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map(j => (
                      <div key={j} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-100">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${j === 1 ? 'from-blue-400 to-cyan-500' : 'from-emerald-400 to-teal-500'}`}></div>
                        <div className="flex-1 text-left">
                          <div className="h-2 w-24 bg-slate-200 rounded-full mb-2"></div>
                          <div className="h-1.5 w-16 bg-slate-100 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Features ---
const Features = () => {
  const features = [
    { icon: Calendar, title: 'Event Management', description: 'Create and manage campus events effortlessly. Track RSVPs and engage your community.', color: 'from-indigo-600 to-purple-600' },
    { icon: Palette, title: 'Digital Portfolios', description: 'Showcase your work and achievements in stunning portfolios. Stand out from the crowd.', color: 'from-purple-600 to-violet-600' },
    { icon: LayoutDashboard, title: 'Smart Dashboards', description: 'Get insights at a glance with personalized dashboards. Track deadlines in real-time.', color: 'from-violet-600 to-fuchsia-600' },
    { icon: Users, title: 'Community & Clubs', description: 'Join clubs, connect with peers, and build lasting relationships in your campus.', color: 'from-fuchsia-600 to-pink-600' }
  ];

  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <Badge className="px-5 py-2 bg-indigo-50 text-indigo-600 font-bold uppercase tracking-widest text-[10px] mb-6">The Platform</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Everything you need to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">thrive</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">A complete platform designed for the modern student experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-[2.5rem]`}></div>
              <Card className="relative p-10 h-full bg-white border-slate-200 group-hover:-translate-y-3 group-hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">{f.description}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Stats ---
const Stats = () => {
  const stats = [
    { value: '50K+', label: 'Active Students', gradient: 'from-indigo-600 to-purple-600' },
    { value: '200+', label: 'Universities', gradient: 'from-purple-600 to-fuchsia-600' },
    { value: '1000+', label: 'Student Clubs', gradient: 'from-fuchsia-600 to-pink-600' },
    { value: '5M+', label: 'Events Created', gradient: 'from-pink-600 to-rose-600' },
  ];

  return (
    <section id="stats" className="relative py-40 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-24">Trusted by students worldwide</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500">
              <p className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent mb-4`}>{s.value}</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- About ---
const About = () => (
  <section id="about" className="py-40 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <Badge className="bg-indigo-50 text-indigo-600 px-5 py-2 font-bold uppercase tracking-widest text-[10px]">Our Mission</Badge>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">University life,<br /><span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">reimagined.</span></h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
            We bridge the gap between academic rigor and creative expression, providing students with the tools they need to build meaningful connections and professional portfolios.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            {[
              { icon: Zap, label: 'Instant Sync' },
              { icon: Shield, label: 'Secure Data' },
              { icon: Globe, label: 'Global Reach' },
              { icon: TrendingUp, label: 'Growth Tracking' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-700 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-[3rem]"></div>
          <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden border border-white shadow-2xl flex items-center justify-center p-12">
            <div className="w-full h-full rounded-[2rem] bg-white shadow-xl p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
                <div className="h-4 w-1/2 bg-slate-50 rounded-full"></div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 h-32 bg-indigo-50 rounded-2xl"></div>
                <div className="flex-1 h-32 bg-purple-50 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer ---
const Footer = () => (
  <footer className="py-20 bg-slate-50 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">M</div>
          <span className="font-black text-xl text-slate-900">MyUniLife</span>
        </div>
        <div className="flex gap-10">
          <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600">Privacy</a>
          <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600">Terms</a>
          <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600">Contact</a>
        </div>
        <p className="text-slate-400 text-sm font-bold">© {new Date().getFullYear()} MyUniLife. Build your future.</p>
      </div>
    </div>
  </footer>
);

export default function LandingPremium() {
  const { loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="antialiased selection:bg-indigo-100 selection:text-indigo-600 font-inter bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
