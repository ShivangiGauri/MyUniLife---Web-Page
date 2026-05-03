import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ContactAdminModal from "../components/ContactAdminModal";
import NotificationBell from "../components/NotificationBell";

function TopNav({ toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-6 py-4 flex items-center justify-between
                    bg-white dark:bg-slate-800
                    border-b border-slate-200 dark:border-slate-700">

      {/* LEFT NAVIGATION */}
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar max-w-full">

        <button 
          className="md:hidden flex-shrink-0 mr-2 text-2xl" 
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <button
          onClick={() => navigate("/student/upcoming-all")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium
                     hover:bg-slate-200 dark:hover:bg-slate-600
                     transition whitespace-nowrap">
          🌍 Upcoming
        </button>

        <button
          onClick={() => navigate("/student/nearby")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium
                     hover:bg-slate-200 dark:hover:bg-slate-600
                     transition whitespace-nowrap">
          📍 Nearby
        </button>

        <button
          onClick={() => navigate("/student/ongoing")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium
                     hover:bg-slate-200 dark:hover:bg-slate-600
                     transition whitespace-nowrap">
          ⚡ Ongoing
        </button>

        <button
          onClick={() => navigate("/student/completed")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium
                     hover:bg-slate-200 dark:hover:bg-slate-600
                     transition whitespace-nowrap">
          🏆 Completed
        </button>

        <button
          onClick={() => navigate("/student/archive")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium
                     hover:bg-slate-200 dark:hover:bg-slate-600
                     transition whitespace-nowrap">
          📚 Archive
        </button>

      </div>

      {/* RIGHT MENU */}
      <div className="relative z-50 flex items-center gap-3" ref={menuRef}>
        <NotificationBell />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition relative z-50 text-slate-900 dark:text-slate-100 font-bold cursor-pointer"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-2 top-full mt-2 w-52 max-w-[90vw] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 z-50 text-sm font-medium text-slate-700 dark:text-slate-200">
              
            <button 
              onClick={() => {
                toggleTheme();
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
            >
              Toggle Theme
            </button>

            <button 
              onClick={() => { navigate("/student/portfolio"); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
            >
              Profile
            </button>

            <button 
              onClick={() => { navigate("/student/settings"); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
            >
              Settings
            </button>

            <button 
              onClick={() => { setIsContactOpen(true); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
            >
              Contact Admin
            </button>

            <div className="my-1 border-t border-slate-200 dark:border-slate-700"></div>

            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition flex items-center gap-3 text-red-600 dark:text-red-400"
            >
              Logout
            </button>
          </div>
        )}

      </div>

      {isContactOpen && (
        <ContactAdminModal onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}

export default TopNav;
