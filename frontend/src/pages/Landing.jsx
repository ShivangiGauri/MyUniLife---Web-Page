import { Link, useNavigate } from "react-router-dom";
import landingBg from "../assets/landing-bg.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative text-white"
      style={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Navbar */}
      <nav className="relative px-10 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
            M
          </div>
          <span className="text-xl font-semibold">
            MyUniLife
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:opacity-80">
            Log in
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-accent font-semibold hover:opacity-90 transition"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-8">
          ✨ Your college story, beautifully tracked
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl">
          Own every moment of your{" "}
          <span className="text-accent">uni life</span>
        </h1>

        <p className="text-lg max-w-2xl mb-10 text-gray-200">
          Track hackathons, volunteering, events and more.
          Build your digital college portfolio without boring forms.
        </p>

        <div className="flex gap-6 flex-wrap">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 rounded-xl bg-accent font-semibold hover:opacity-90 transition"
          >
            Get started free →
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl border border-white/40 hover:bg-white/20 transition"
          >
            I have an account
          </button>
        </div>
      </section>
    </div>
  );
}
