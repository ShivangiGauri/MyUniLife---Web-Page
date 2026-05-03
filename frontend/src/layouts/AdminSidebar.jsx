import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  AlertCircle, 
  History, 
  LogOut,
  X
} from "lucide-react";

function AdminSidebar({ onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-bold ${
          isActive
            ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20"
            : "text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--color-primary)]"
        }`
      }
    >
      {icon} <span>{label}</span>
    </NavLink>
  );

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-800 flex flex-col p-6 border-r border-slate-200 dark:border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-[var(--color-primary)]">UniAdmin</h1>
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Management</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] rounded-lg">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navItem("/admin/dashboard", <LayoutDashboard size={20} />, "Dashboard")}
        {navItem("/admin/users", <Users size={20} />, "Users")}
        {navItem("/admin/events", <Calendar size={20} />, "Events")}
        {navItem("/admin/analytics", <BarChart3 size={20} />, "Analytics")}
        {navItem("/admin/issues", <AlertCircle size={20} />, "Issues")}
        {navItem("/admin/logs", <History size={20} />, "Logs")}
      </nav>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-700 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 font-bold"
        >
          <LogOut size={20} /> Force Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
