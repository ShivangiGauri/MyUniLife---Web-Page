import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Rocket, Target, Users, ArrowRight } from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 md:px-16 py-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
        >
          MyUniLife
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
          <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            About
          </a>
          <a href="#provide" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Features
          </a>
          <Link to="/login" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Login
          </Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase">
          <Rocket size={14} /> Your digital creative space
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1]">
          Build your journey.
          <br />
          Express your <span className="text-indigo-600 dark:text-indigo-400">art.</span>
        </h1>

        <p className="mt-8 text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          A refined platform for students, creators, clubs and institutions to
          manage events, showcase achievements and grow their presence.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button size="lg" className="px-10 h-14 text-lg">
              Get Started for Free
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="secondary" size="lg" className="px-10 h-14 text-lg">
              I have an account
            </Button>
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-16 bg-white dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
            About MyUniLife
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            MyUniLife is a digital ecosystem designed to unify the university experience. We bridge the gap between students, clubs, and administration through a seamless, modern interface.
          </p>
        </div>
      </section>

      {/* WHAT WE PROVIDE */}
      <section id="provide" className="py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to manage your university life in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Event Management", 
                desc: "Create, manage and track university and club events effortlessly.", 
                icon: Target,
                color: "indigo"
              },
              { 
                title: "Digital Portfolios", 
                desc: "Showcase achievements and build your academic identity.", 
                icon: Users,
                color: "indigo"
              },
              { 
                title: "Smart Dashboards", 
                desc: "Personalized experiences for students, admins, and clubs.", 
                icon: Rocket,
                color: "indigo"
              }
            ].map((feature, i) => (
              <Card key={i} className="p-8 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-500">
        <div className="mb-4 font-bold text-slate-900 dark:text-white">MyUniLife</div>
        <p className="text-sm">© {new Date().getFullYear()} MyUniLife. Built for the future of education.</p>
      </footer>

    </div>
  );
}

export default Landing;
;