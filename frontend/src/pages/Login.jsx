import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [suggestedRole, setSuggestedRole] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select your role first.");
      return;
    }

    setErrorMsg("");
    setSuggestedRole(null);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    if (!foundUser) {
      setErrorMsg("Invalid email or password");
      return;
    }

    login(foundUser);
    navigate(`/${foundUser.role}`);
  };

  return (
    <div className="min-h-screen bg-kala-bg flex flex-col items-center justify-center px-4">

      <Link to="/" className="absolute top-6 left-8 text-kala-gold font-bold text-xl">
        MyUniLife
      </Link>

      {!role ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Who are you? 😉
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {["student", "admin", "club", "guest"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="border-2 border-kala-byzantium px-8 py-6 rounded-xl hover:bg-kala-byzantium hover:text-white transition"
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-kala-gold mb-6 text-center">
            Login as {role}
          </h2>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-center flex flex-col items-center">
              <p className="text-red-700 dark:text-red-400 font-bold text-sm">
                {errorMsg}
              </p>
            </div>
          )}

          <input
            type="email"
            placeholder="University Email"
            className="w-full border p-3 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-kala-gold py-3 rounded-lg font-semibold">
            Login
          </button>

          <p className="text-center mt-4">
            <button
              type="button"
              onClick={() => setRole("")}
              className="text-kala-byzantium underline"
            >
              Change role
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;