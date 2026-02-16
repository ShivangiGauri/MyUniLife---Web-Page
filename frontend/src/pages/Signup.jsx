import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          universityEmail: email,
          personalEmail: email,
          studyYear: "Year 1",
          role: "Student",
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >

      <div className="
        backdrop-blur-xl
        bg-white/20
        border border-white/30
        p-12
        rounded-3xl
        shadow-2xl
        w-full max-w-md
        text-white
      ">

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <span className="text-xl font-semibold">
            MyUniLife
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Join MyUniLife 🎓
        </h2>

        <p className="text-center text-white/80 mb-6">
          Start building your college portfolio today
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl px-4 py-3 bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="University email"
            className="w-full rounded-xl px-4 py-3 bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="At least 6 characters"
            className="w-full rounded-xl px-4 py-3 bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Create account
          </button>

        </form>

        <p className="text-center text-sm mt-6 text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-medium">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
