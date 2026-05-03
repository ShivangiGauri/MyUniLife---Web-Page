import { Link, useNavigate, NavLink } from "react-router-dom";
import { LogOut, Users, Shield, Building, LayoutDashboard, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function SuperAdminSidebar({ onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition font-bold ${
          isActive
            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
            : "hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-400"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-800 flex flex-col p-6 shadow-xl border-r border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">SuperControl</h1>
        <button 
          onClick={onClose}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navItem("/superadmin/dashboard", <LayoutDashboard size={20} />, "Dashboard")}
        {navItem("/superadmin/admins", <Shield size={20} />, "Admins")}
        {navItem("/superadmin/users", <Users size={20} />, "Users")}
        {navItem("/superadmin/universities", <Building size={20} />, "Universities")}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition mt-auto font-bold"
      >
        <LogOut size={20} /> Force Logout
      </button>
    </aside>
  );
}

export default SuperAdminSidebar;
