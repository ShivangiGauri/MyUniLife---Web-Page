import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          universityEmail: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
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

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <h1 className="text-lg font-semibold">
            MyUniLife
          </h1>
        </div>

        <h2 className="text-3xl font-semibold text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-white/80 mb-8">
          Continue building your college journey
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm mb-2 font-medium">
              University email
            </label>
            <input
              type="email"
              placeholder="you@uni.edu"
              className="
                w-full
                rounded-xl
                px-4 py-3
                bg-white/30
                placeholder-white/70
                focus:outline-none
                focus:ring-2
                focus:ring-accent
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="
                w-full
                rounded-xl
                px-4 py-3
                bg-white/30
                placeholder-white/70
                focus:outline-none
                focus:ring-2
                focus:ring-accent
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-8 text-white/80">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-accent font-medium">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
