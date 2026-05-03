import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import api, { API_BASE_URL } from "../api/api";

function Signup() {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    universityEmail: "",
    personalEmail: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await api.post(`${API_BASE_URL}/auth/register`, { ...form, role });
      const data = res.data;
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        login(data.token, data.user);
        
        let targetRole = data.user.role;
        if (targetRole === "student") navigate("/student/dashboard");
        else if (targetRole === "club") navigate("/club/dashboard");
        else if (targetRole === "admin") navigate("/admin/dashboard");
        else if (targetRole === "superadmin") navigate("/superadmin/dashboard");
        else navigate("/guest/dashboard");
      }
    } catch (err) {
      setErrorMsg(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center px-4 relative">
      <Link to="/" className="absolute top-8 left-8 text-indigo-600 dark:text-indigo-400 font-bold text-2xl tracking-tight">
        MyUniLife
      </Link>

      {!role ? (
        <div className="w-full max-w-2xl text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Join the community</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Choose how you want to experience MyUniLife</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["student", "club", "guest"].map((r) => (
              <Card 
                key={r}
                onClick={() => setRole(r)}
                className="group cursor-pointer p-8 flex flex-col items-center gap-4 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all active:scale-95"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-3xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                  {r === "student" ? "🎓" : r === "club" ? "🏢" : "👋"}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{r}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Register as</p>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-slate-500 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      ) : (
        <Card className="w-full max-w-md p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Joining as a <span className="text-indigo-600 dark:text-indigo-400 font-bold capitalize">{role}</span></p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-6">
            {errorMsg && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
                <p className="text-red-600 dark:text-red-400 font-semibold text-sm">{errorMsg}</p>
              </div>
            )}

            <Input
              label="Full Name"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />

            {(role === "student" || role === "club") && (
              <Input
                label="University Email"
                type="email"
                placeholder="john@university.edu"
                value={form.universityEmail}
                onChange={(e) => setForm({ ...form, universityEmail: e.target.value })}
                required
              />
            )}

            <Input
              label="Personal Email"
              type="email"
              placeholder="john.doe@gmail.com"
              value={form.personalEmail}
              onChange={(e) => setForm({ ...form, personalEmail: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />

            <Button 
              type="submit" 
              className="w-full"
              isLoading={loading}
            >
              Create Account
            </Button>

            <p className="text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setRole("")} 
                className="text-slate-500"
              >
                Change role
              </Button>
            </p>
          </form>
        </Card>
      )}
    </div>
  );
}

export default Signup;
