import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-kala-bg text-kala-dark flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 md:px-16 py-6">

        <Link
          to="/"
          className="text-2xl font-bold tracking-widest text-kala-gold"
        >
          MyUniLife
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a href="#about" className="hover:text-kala-byzantium transition">
            About
          </a>
          <a href="#provide" className="hover:text-kala-byzantium transition">
            What We Provide
          </a>
          <Link to="/login" className="hover:text-kala-byzantium transition">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-kala-gold text-black px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Signup
          </Link>
        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6">

        <div className="mb-6 text-kala-byzantium text-sm tracking-wide uppercase">
          Your digital creative space
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          Build your journey.
          <br />
          Express your <span className="text-kala-gold">art.</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          A refined platform for students, creators, clubs and institutions to
          manage events, showcase achievements and grow their presence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <Link
            to="/signup"
            className="bg-kala-gold text-black px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border-2 border-kala-byzantium text-kala-byzantium px-8 py-3 rounded-xl font-semibold hover:bg-kala-byzantium hover:text-white transition"
          >
            I have an account
          </Link>
        </div>

      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-24 px-6 md:px-16 bg-white text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-kala-byzantium mb-6">
          About MyUniLife
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          MyUniLife is a digital platform designed to manage events, showcase student achievements, and connect students, clubs, and institutions.
        </p>
      </section>

      {/* WHAT WE PROVIDE */}
      <section
        id="provide"
        className="py-24 px-6 md:px-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-kala-byzantium mb-12">
          What We Provide
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 border rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-kala-gold">
              Event Management
            </h3>
            <p className="text-gray-600">
              Create, manage and track university and club events effortlessly.
            </p>
          </div>

          <div className="p-8 border rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-kala-gold">
              Digital Portfolios
            </h3>
            <p className="text-gray-600">
              Showcase achievements and build your academic identity.
            </p>
          </div>

          <div className="p-8 border rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-kala-gold">
              Role-Based Dashboards
            </h3>
            <p className="text-gray-600">
              Personalized dashboards for students, admins, clubs and guests.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyUniLife. All rights reserved.
      </footer>

    </div>
  );
}

export default Landing;