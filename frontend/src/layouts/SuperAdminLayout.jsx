import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SuperAdminSidebar from "./SuperAdminSidebar";

function SuperAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme} min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex transition-colors duration-300 relative overflow-x-hidden`}>
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SuperAdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <header className="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-slate-600 dark:text-slate-300"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white truncate">
              Master Database
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 md:p-3 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:scale-110 transition shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-indigo-600" />}
            </button>
          </div>
        </header>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default SuperAdminLayout;
