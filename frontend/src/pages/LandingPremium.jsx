import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

// --- Simple SVG Icons (Replacing lucide-react) ---

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const IconTrending = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const IconZap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);

// --- Hooks ---

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

// --- Local Components ---

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'h-16 glass shadow-xl py-0' : 'h-24 bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="font-bold text-lg">M</span>
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">MyUniLife</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {["Features", "About", "Stats"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-bold text-slate-600 dark:text-slate-300 nav-link-hover hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 nav-link-hover hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Login
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="primary"
            size="sm"
            onClick={() => navigate("/signup")} 
            className="hidden sm:flex font-bold hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-300 px-6 h-10 rounded-xl"
          >
            Get Started
          </Button>
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform">
            <IconMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-screen bg-[radial-gradient(circle_at_50%_30%,rgba(79,70,229,0.08),transparent_60%)]"></div>
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass dark:glass-dark rounded-full shadow-sm mb-12 hover:scale-105 transition-all duration-500 cursor-default border border-indigo-500/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Next-Gen Platform v2.0</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-10">
          Build your journey.<br />
          <span className="text-gradient animate-glow">Express your art.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium opacity-90">
          The high-performance platform for students, clubs, and universities to organize, showcase, and connect.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="primary"
            size="lg"
            onClick={() => navigate("/signup")} 
            className="px-10 h-16 text-lg font-black shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95 transition-all duration-500 group w-full sm:w-auto rounded-2xl"
          >
            Get Started <IconArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => navigate("/login")} 
            className="px-10 h-16 text-lg font-black w-full sm:w-auto glass hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-500 border-none rounded-2xl"
          >
            Login to Account
          </Button>
        </div>

        {/* Dashboard Mockup with Floating Elements */}
        <div className="relative mt-24 max-w-5xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden transform group-hover:scale-[1.01] transition-transform duration-700">
            <div className="bg-slate-50 dark:bg-slate-950 rounded-[2rem] overflow-hidden aspect-[16/9] flex border border-slate-200/50 dark:border-slate-800/50">
              <div className="hidden md:flex w-56 border-r border-slate-200 dark:border-slate-800 flex-col p-6 space-y-4 bg-white/50 dark:bg-slate-900/50">
                <div className="h-6 w-24 bg-indigo-600 rounded-lg"></div>
                <div className="space-y-3 pt-4 text-left">
                  {["Dashboard", "Analytics", "Events", "Profile"].map((text, i) => (
                    <div key={i} className={`h-10 rounded-xl px-4 flex items-center gap-3 text-[10px] font-bold ${i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400'} `}>
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-slate-300'} `}></div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center px-4">
                    <div className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="h-10 w-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white">
                    <IconBell />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: "Growth", value: "+24%", icon: "📈" },
                    { label: "Users", value: "1.2k", icon: "👥" },
                    { label: "Active", value: "98", icon: "⚡" }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-left">
                      <div className="text-lg mb-2">{item.icon}</div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-left">
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="flex-1 h-32 bg-slate-50 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-indigo-500" style={{ height: `${20 + Math.random() * 60}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Status Card */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:block animate-float">
            <Card className="p-5 shadow-2xl glass-dark border-white/10 backdrop-blur-2xl rounded-2xl hover:scale-110 transition-transform duration-500 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <IconCheck />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Status</p>
                  <p className="text-sm font-bold text-white">System Active</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 delay-${index * 100} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <Card className="p-8 h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group rounded-[2rem]">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <Icon />
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          {description}
        </p>
      </Card>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: IconCalendar,
      title: 'Event Management',
      description: 'Create and coordinate world-class events. Track engagement and scale your community impact effortlessly.',
      color: 'from-indigo-600 to-indigo-400'
    },
    {
      icon: IconZap,
      title: 'Digital Portfolios',
      description: 'Build professional-grade portfolios in minutes. Showcase your creative journey with elegant layouts.',
      color: 'from-purple-600 to-purple-400'
    },
    {
      icon: IconTrending,
      title: 'Smart Dashboards',
      description: 'Data-driven insights to help you grow. Monitor your performance with beautiful, intuitive charts.',
      color: 'from-blue-600 to-blue-400'
    },
    {
      icon: IconUsers,
      title: 'Community Engine',
      description: 'Powerful tools to manage clubs and connect with peers. Forge deep connections that last a lifetime.',
      color: 'from-fuchsia-600 to-fuchsia-400'
    }
  ];

  return (
    <section id="features" className="py-32 relative bg-white dark:bg-slate-950 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <Badge className="px-5 py-2 glass dark:glass-dark text-indigo-600 dark:text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] border border-indigo-500/10">The Ecosystem</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Designed for <span className="text-gradient">high performance</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            A comprehensive suite of tools built for speed, elegance, and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => <FeatureCard key={i} {...f} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ label, value, color, suffix = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const numericValue = parseInt(value);
  const count = useCountUp(numericValue, 2500, 0, inView);
  
  return (
    <div ref={ref} className="group relative p-10 border border-white/5 rounded-[2.5rem] glass-dark hover:bg-white/[0.05] hover:scale-105 transition-all duration-500 overflow-hidden">
      <div className={`absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`}></div>
      <p className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent mb-4 tracking-tighter`}>
        {count}{value.replace(/[0-9]/g, '')}{suffix}
      </p>
      <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] opacity-80">{label}</p>
    </div>
  );
};

const Stats = () => {
  const navigate = useNavigate();
  const stats = [
    { label: "Active Students", value: "50000", suffix: "+", color: "from-indigo-400 to-indigo-600" },
    { label: "Universities", value: "200", suffix: "+", color: "from-purple-400 to-purple-600" },
    { label: "Student Clubs", value: "1000", suffix: "+", color: "from-blue-400 to-blue-600" },
    { label: "Events Created", value: "5000000", suffix: "+", color: "from-fuchsia-400 to-fuchsia-600" },
  ];

  return (
    <section id="stats" className="py-40 relative bg-slate-900 dark:bg-black overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.1] bg-[size:50px_50px] bg-[linear-gradient(to_right,#312e81_1px,transparent_1px),linear-gradient(to_bottom,#312e81_1px,transparent_1px)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-24 tracking-tighter">Trusted by millions of students</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((s, i) => <StatItem key={i} {...s} />)}
        </div>

        <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            variant="primary"
            size="lg"
            onClick={() => navigate("/signup")}
            className="px-14 h-20 text-xl font-black rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
          >
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-40 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div 
          ref={ref}
          className={`bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 md:p-24 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-60"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <Badge className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-5 py-2 font-black uppercase text-[10px] tracking-[0.3em] rounded-full">Our Core Mission</Badge>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter">
                University life, <br /><span className="text-gradient">reimagined.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                We bridge the gap between academic rigor and creative expression. MyUniLife is the OS for your university journey.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  { icon: IconShield, text: "Data Privacy", color: "bg-emerald-500/10 text-emerald-600" },
                  { icon: IconGlobe, text: "Global Network", color: "bg-blue-500/10 text-blue-600" },
                  { icon: IconZap, text: "Ultra Fast", color: "bg-amber-500/10 text-amber-600" }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 px-5 py-2.5 ${item.color} rounded-2xl font-black text-xs tracking-tight border border-current opacity-80 hover:opacity-100 transition-opacity`}>
                    <item.icon /> {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Real-time", label: "Instant Sync", icon: "⚡", color: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white" },
                { title: "Secure", label: "Data Safety", icon: "🔒", color: "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-white" },
                { title: "Scale", label: "Global Reach", icon: "📈", color: "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-white" },
                { title: "Cloud", label: "Always On", icon: "☁️", color: "bg-gradient-to-br from-purple-500 to-purple-600 text-white" }
              ].map((item, i) => (
                <div key={i} className={`p-10 rounded-2xl shadow-md flex flex-col justify-between aspect-square hover:scale-105 transition-all duration-500 cursor-default group border border-slate-200/50 dark:border-slate-800/50 ${item.color}`}>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-black mb-2 opacity-60`}>{item.title}</p>
                    <p className="text-xl font-black leading-tight tracking-tight">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-12 transition-transform">
              M
            </div>
            <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">MyUniLife</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Building the future of student experiences.</p>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-10">
            {["Product", "Features", "Security", "Contact"].map(item => (
              <a key={item} href="#" className="text-sm font-black text-slate-500 hover:text-indigo-600 transition-all nav-link-hover">{item}</a>
            ))}
          </div>
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase opacity-60">
            © {new Date().getFullYear()} MyUniLife Inc.
          </p>
        </div>

        <div className="flex gap-6">
          {["Privacy", "Terms"].map(item => (
            <a key={item} href="#" className="text-xs font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPremium() {
  return (
    <div className="antialiased scroll-smooth selection:bg-indigo-100 selection:text-indigo-600 font-inter">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Features />
        <About />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
