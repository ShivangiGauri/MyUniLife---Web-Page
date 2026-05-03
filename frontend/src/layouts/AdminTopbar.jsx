import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, Settings, Mail, LogOut } from "lucide-react";
import NotificationBell from "../components/NotificationBell";

function AdminTopbar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const menuRef = useRef(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || JSON.parse(localStorage.getItem("currentUser"))?.role || "admin";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  function toggleTheme() {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shadow-sm sticky top-0 z-50 w-full">
      
      {/* Left side */}
      <div className="flex items-center gap-4 relative z-50">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer relative z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center bg-slate-50 dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-indigo-600 transition-all relative z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none ml-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 w-64"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="relative z-50 flex items-center gap-3">
        <NotificationBell />
        
        {/* Profile Avatar */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 shadow-inner flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition duration-200 relative z-50">
          A
        </div>

        {/* 3-dot menu */}
        <div className="relative z-50" ref={menuRef}>
          <button 
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition relative z-50 text-slate-600 dark:text-slate-300 font-bold cursor-pointer"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-2 top-full mt-2 w-52 max-w-[90vw] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 z-50 text-sm font-medium text-slate-700 dark:text-slate-200">
              
              <button 
                onClick={toggleTheme}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                Toggle Theme
              </button>

              <button 
                onClick={() => { navigate(role === "admin" ? "/admin/users" : `/${role}/portfolio`); setOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
              >
                <User size={18} />
                Profile
              </button>

              <button 
                onClick={() => { navigate(role === "admin" ? "/admin/settings" : `/${role}/settings`); setOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
              >
                <Settings size={18} />
                Settings
              </button>

              {role !== "admin" ? (
                <button 
                  onClick={() => { navigate(`/${role}/contact`); setOpen(false); }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
                >
                  <Mail size={18} />
                  Contact Admin
                </button>
              ) : (
                <button 
                  onClick={() => { navigate("/admin/support"); setOpen(false); }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
                >
                  <Mail size={18} />
                  View Support Inbox
                </button>
              )}

              <div className="my-1 border-t border-slate-200 dark:border-slate-700"></div>

              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition flex items-center gap-3 text-red-600 dark:text-red-400"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminTopbar;
