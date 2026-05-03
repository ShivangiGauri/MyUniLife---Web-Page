import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, Moon, Sun, Bell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className={`flex min-h-screen bg-[var(--bg-primary)]/20 dark:bg-slate-900 transition-colors duration-300`}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl font-black text-[var(--text-primary)] dark:text-white truncate">
                {user?.universityName || "University Dashboard"}
              </h2>
              <p className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest hidden sm:block">
                Administrative Control Panel
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] rounded-full transition relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 sm:p-3 rounded-full bg-[var(--bg-surface)] dark:bg-slate-700 border border-[var(--bg-primary)] dark:border-slate-600 hover:scale-110 transition shadow-sm"
            >
              {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-[var(--color-primary)]" />}
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-[var(--text-primary)] dark:text-white">{user?.name}</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)]">ADMIN</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white font-black shadow-lg shadow-[var(--color-primary)]/20">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[var(--bg-surface)]/30">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
