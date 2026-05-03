import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      login(data.token, data.user);
      
      const role = data.user.role;
      if (role === "student") navigate("/student/dashboard");
      else if (role === "club") navigate("/club/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else if (role === "superadmin") navigate("/superadmin/dashboard");
      else navigate("/guest/dashboard");

    } catch (err) {
      setErrorMsg(err.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center px-4 relative">
      <Link to="/" className="absolute top-8 left-8 text-indigo-600 dark:text-indigo-400 font-bold text-2xl tracking-tight">
        MyUniLife
      </Link>

      <Card className="w-full max-w-md p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
              <p className="text-red-600 dark:text-red-400 font-semibold text-sm">{errorMsg}</p>
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button 
            type="submit"
            className="w-full"
            isLoading={loading}
          >
            Sign in
          </Button>

          <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
            Don't have an account? <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Create an account</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;