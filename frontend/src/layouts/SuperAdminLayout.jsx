import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Users, Shield, Building, LayoutDashboard, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function SuperAdminLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`app ${theme} min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex transition-colors duration-300`}>
      <aside className="w-64 bg-white dark:bg-slate-800 flex flex-col p-6 shadow-xl border-r border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-black mb-10 text-slate-900 dark:text-white">SuperControl</h1>
        <nav className="flex-1 space-y-4">
          <Link to="/superadmin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/superadmin/admins" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-bold">
            <Shield size={20} /> Admins
          </Link>
          <Link to="/superadmin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-bold">
            <Users size={20} /> Users
          </Link>
          <Link to="/superadmin/universities" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-bold">
            <Building size={20} /> Universities
          </Link>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition mt-auto font-bold">
          <LogOut size={20} /> Force Logout
        </button>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Master Database</h2>
          <button onClick={toggleTheme} className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:scale-110 transition shadow-md">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SuperAdminLayout;
