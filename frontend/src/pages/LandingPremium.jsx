import React, { useState, useEffect, useRef } from "react";
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
  Globe,
  Menu
} from "lucide-react";

// --- Custom Hooks ---

const useInView = (options) => {
  const [ref, setRef] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options?.triggerOnce) observer.unobserve(ref);
      }
    }, options);

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isInView];
};

const useCountUp = (end, duration = 2000, start = 0, isInView = false) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isInView]);

  return count;
};

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'h-16 bg-white/70 backdrop-blur-md shadow-xl py-0' : 'h-24 bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
            <span className="font-bold text-lg">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">MyUniLife</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {["Features", "About", "Stats"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="relative text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          {!user && (
            <Link 
              to="/login" 
              className="relative text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => navigate(getDashboardPath(user.role))}
              className="hidden sm:flex font-bold px-6 h-10 rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Dashboard
            </Button>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => navigate("/signup")} 
              className="hidden sm:flex font-bold px-6 h-10 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Started
            </Button>
          )}
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Hero ---
const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setRef, isInView] = useInView({ triggerOnce: true });

  const getDashboardPath = (role) => {
    if (role === "student") return "/student/dashboard";
    if (role === "club") return "/club/dashboard";
    if (role === "admin") return "/admin/dashboard";
    if (role === "superadmin") return "/superadmin/dashboard";
    return "/guest/dashboard";
  };

  return (
    <section ref={setRef} className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-violet-400/15 via-fuchsia-400/10 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className={`relative max-w-7xl mx-auto px-6 text-center z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-indigo-100 shadow-xl shadow-indigo-500/10 mb-12 animate-bounce-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Next-Gen Campus Platform v2.0</span>
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-10">
          Build your journey.<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">Express your art.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium opacity-90">
          The all-in-one platform for students, clubs, and universities to manage events, build portfolios, and connect communities.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          {user ? (
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate(getDashboardPath(user.role))}
              className="px-12 h-18 text-lg font-bold rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 group"
            >
              Back to Dashboard <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          ) : (
            <>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate("/signup")} 
                className="px-10 h-16 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                Get Started for Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate("/login")} 
                className="px-10 h-16 text-lg font-bold rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg hover:bg-white hover:scale-105 transition-all duration-300"
              >
                I have an account
              </Button>
            </>
          )}
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mt-24 max-w-5xl mx-auto group perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl scale-110 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/50 shadow-[0_32px_64px_-16px_rgba(79,70,229,0.2)] overflow-hidden transform group-hover:scale-[1.02] group-hover:-rotate-1 transition-all duration-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/40">M</div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Dashboard</p>
                  <p className="text-[10px] text-slate-500">Alex's Hub</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"><Bell size={14} className="text-slate-500" /></div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 shadow-md"></div>
              </div>
            </div>
            {/* Body */}
            <div className="flex">
              <div className="w-48 p-6 border-r border-slate-100 hidden md:block bg-slate-50/30">
                <div className="space-y-3">
                  {['Overview', 'Events', 'Portfolio', 'Clubs', 'Settings'].map((item, i) => (
                    <div key={item} className={`h-8 rounded-lg px-3 flex items-center text-[10px] font-bold cursor-pointer transition-all ${i === 0 ? 'bg-white text-indigo-600 shadow-md border border-indigo-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
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
                    <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-left hover:shadow-md transition-shadow">
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3 shadow-inner`}>
                        <stat.icon size={16} className={stat.color} />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-lg font-black text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-48 bg-slate-50/50 rounded-2xl border border-slate-100 p-6 shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full"></div>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <p className="text-xs font-bold text-slate-900">Recent Activity</p>
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                  </div>
                  <div className="space-y-3 relative z-10">
                    {[1, 2].map(j => (
                      <div key={j} className="flex items-center gap-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm hover:translate-x-1 transition-transform">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${j === 1 ? 'from-blue-400 to-cyan-500 shadow-blue-200' : 'from-emerald-400 to-teal-500 shadow-emerald-200'} shadow-lg flex-shrink-0`}></div>
                        <div className="flex-1 text-left">
                          <div className="h-2 w-24 bg-slate-200 rounded-full mb-2"></div>
                          <div className="h-1.5 w-16 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="w-8 h-1.5 bg-slate-100 rounded-full"></div>
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
  const [setRef, isInView] = useInView({ triggerOnce: true });
  
  const features = [
    { icon: Calendar, title: 'Event Management', description: 'Create and manage campus events effortlessly. Track RSVPs and engage your community.', color: 'from-indigo-600 via-indigo-500 to-purple-600' },
    { icon: Palette, title: 'Digital Portfolios', description: 'Showcase your work and achievements in stunning portfolios. Stand out from the crowd.', color: 'from-purple-600 via-purple-500 to-violet-600' },
    { icon: LayoutDashboard, title: 'Smart Dashboards', description: 'Get insights at a glance with personalized dashboards. Track deadlines in real-time.', color: 'from-violet-600 via-violet-500 to-fuchsia-600' },
    { icon: Users, title: 'Community & Clubs', description: 'Join clubs, connect with peers, and build lasting relationships in your campus.', color: 'from-fuchsia-600 via-fuchsia-500 to-pink-600' }
  ];

  return (
    <section id="features" ref={setRef} className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/30 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-24 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="px-5 py-2 bg-indigo-50 text-indigo-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-6 rounded-full border border-indigo-100">The Core Platform</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Everything you need to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">thrive</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">A complete platform designed for the modern student experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`group relative transition-all duration-700 delay-[${i * 100}ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 rounded-[2.5rem]`}></div>
              <Card className="relative p-10 h-full bg-white border-slate-200 shadow-lg group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col items-start border-b-4 border-b-transparent group-hover:border-b-indigo-500/20">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors tracking-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm mb-6">{f.description}</p>
                
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Learn More <ArrowRight size={14} />
                </div>

                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${f.color} opacity-[0.03] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`}></div>
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
  const [setRef, isInView] = useInView({ triggerOnce: true });
  
  const stats = [
    { value: 50000, label: 'Active Students', suffix: '+', gradient: 'from-indigo-400 via-indigo-500 to-purple-600' },
    { value: 200, label: 'Universities', suffix: '+', gradient: 'from-purple-400 via-purple-500 to-fuchsia-600' },
    { value: 1000, label: 'Student Clubs', suffix: '+', gradient: 'from-fuchsia-400 via-fuchsia-500 to-pink-600' },
    { value: 5000000, label: 'Events Created', suffix: '+', gradient: 'from-pink-400 via-pink-500 to-rose-600' },
  ];

  return (
    <section id="stats" ref={setRef} className="relative py-40 bg-slate-950 overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className={`mb-24 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">Trusted by students worldwide</h2>
          <p className="text-slate-400 font-medium text-lg">Scale your impact with a global community.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} isInView={isInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, isInView, index }) => {
  const count = useCountUp(stat.value, 2500, 0, isInView);
  
  const formatValue = (val) => {
    if (val >= 1000000) return (val / 1000000).toFixed(0) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(0) + 'K';
    return val;
  };

  return (
    <div 
      className={`group relative transition-all duration-1000 ease-out ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-[2.5rem]`}></div>
      <div className="relative p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] transition-all duration-500 overflow-hidden">
        {/* Glow corner */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
        
        <p className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4 tracking-tighter`}>
          {formatValue(count)}{stat.suffix}
        </p>
        <p className="text-slate-300 font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</p>
        
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
      </div>
    </div>
  );
};

// --- About ---
const About = () => {
  const [setRef, isInView] = useInView({ triggerOnce: true });

  return (
    <section id="about" ref={setRef} className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <Badge className="bg-indigo-50 text-indigo-600 px-5 py-2 font-bold uppercase tracking-[0.3em] text-[10px] rounded-full border border-indigo-100">Our Core Mission</Badge>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              University life, <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">reimagined.</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              We bridge the gap between <span className="text-indigo-600 font-bold underline decoration-indigo-200 decoration-4 underline-offset-4">academic rigor</span> and creative expression, providing students with the tools to build <span className="text-purple-600 font-bold underline decoration-purple-200 decoration-4 underline-offset-4">global connections</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: Zap, label: 'Instant Network Sync', desc: 'Real-time updates across campus.' },
                { icon: Shield, label: 'Secure Data Vault', desc: 'Your data is encrypted and private.' },
                { icon: Globe, label: 'Global Reach', desc: 'Connect with peers worldwide.' },
                { icon: TrendingUp, label: 'Growth Insights', desc: 'Analytics to track your success.' }
              ].map((item, i) => (
                <div key={i} className="group flex flex-col gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm tracking-tight">{item.label}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-[80px] rounded-[3rem]"></div>
            <div className="relative aspect-square rounded-[3.5rem] bg-gradient-to-br from-indigo-100 to-purple-50 overflow-hidden border-4 border-white shadow-[0_40px_80px_-15px_rgba(79,70,229,0.3)] flex items-center justify-center p-12 group hover:scale-[1.02] transition-transform duration-700">
              <div className="w-full h-full rounded-[2.5rem] bg-white shadow-2xl p-10 flex flex-col justify-between overflow-hidden relative">
                {/* Decorative dots */}
                <div className="absolute top-0 right-0 p-4 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-100"></div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-50"></div>
                    <div className="space-y-2 py-2">
                      <div className="h-2.5 w-32 bg-slate-100 rounded-full"></div>
                      <div className="h-2 w-20 bg-slate-50 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-slate-50"></div>
                  <div className="space-y-3">
                    <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                    <div className="h-3 w-5/6 bg-slate-50 rounded-full"></div>
                    <div className="h-3 w-4/6 bg-slate-50 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1 h-36 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-3xl border border-indigo-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-indigo-600"><Zap size={24} /></div>
                  </div>
                  <div className="flex-1 h-36 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl border border-purple-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 delay-100">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-600"><TrendingUp size={24} /></div>
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

// --- Footer ---
const Footer = () => (
  <footer className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/30">M</div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">MyUniLife</span>
          </div>
          <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
            The all-in-one ecosystem for the next generation of students and universities to build, connect, and grow.
          </p>
        </div>
        <div>
          <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-6">Product</h4>
          <ul className="space-y-4">
            {["Features", "Events", "Portfolio", "Security"].map(link => (
              <li key={link}><a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-6">Company</h4>
          <ul className="space-y-4">
            {["About Us", "Privacy Policy", "Terms of Service", "Contact Support"].map(link => (
              <li key={link}><a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">© {new Date().getFullYear()} MyUniLife Inc. • Made for students.</p>
        <div className="flex gap-6">
          {["Twitter", "LinkedIn", "Instagram"].map(social => (
            <a key={social} href="#" className="text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">{social}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPremium() {
  const { loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased selection:bg-indigo-100 selection:text-indigo-600 font-inter bg-slate-50 text-slate-900">
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Features />
        <About />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
