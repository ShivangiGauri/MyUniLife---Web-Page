import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import ContactAdminModal from "../components/ContactAdminModal";
import NotificationBell from "../components/NotificationBell";

function ClubTopNav({ toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-[#F7CFD8] dark:bg-[#1A1A1D] border-b border-[#A6D6D6] dark:border-[#3B1C32]">
      {/* LEFT NAVIGATION */}
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar max-w-full">
        <button className="md:hidden flex-shrink-0 mr-2 text-2xl text-gray-800 dark:text-gray-200" onClick={toggleSidebar}>
          ☰
        </button>

        {["upcoming-all", "nearby", "ongoing", "completed", "archive"].map(tab => (
          <button
            key={tab}
            onClick={() => navigate(`/club/${tab}`)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-[#A6D6D6]/40 dark:hover:bg-[#6A1E55]/40 transition whitespace-nowrap capitalize font-medium"
          >
            {tab === "upcoming-all" ? "🌍 Upcoming" : tab === "nearby" ? "📍 Nearby" : tab === "ongoing" ? "⚡ Ongoing" : tab === "completed" ? "🏆 Completed" : "📚 Archive"}
          </button>
        ))}
      </div>

      {/* RIGHT MENU */}
      <div className="relative z-50 flex items-center gap-3" ref={menuRef}>
        <NotificationBell />
        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-[#8E7DBE]/30 dark:hover:bg-[#6A1E55]/30 flex items-center justify-center transition text-lg text-gray-800 dark:text-gray-200 cursor-pointer"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-2 top-full mt-2 w-52 max-w-[90vw] bg-[#E5E1DA] dark:bg-[#393E46] rounded-xl shadow-lg p-2 z-50 text-sm font-medium text-gray-700 dark:text-gray-200">
            <button 
              onClick={() => {
                const newTheme = theme === "light" ? "dark" : "light";
                setTheme(newTheme);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#89A8B2]/20 dark:hover:bg-[#948979]/20 transition flex items-center gap-3"
            >
              Toggle Theme
            </button>

            <button 
              onClick={() => { navigate("/club/portfolio"); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#89A8B2]/20 dark:hover:bg-[#948979]/20 transition flex items-center gap-3"
            >
              Profile
            </button>

            <button 
              onClick={() => { navigate("/club/settings"); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#89A8B2]/20 dark:hover:bg-[#948979]/20 transition flex items-center gap-3"
            >
              Settings
            </button>

            <button 
              onClick={() => { setIsContactOpen(true); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#89A8B2]/20 dark:hover:bg-[#948979]/20 transition flex items-center gap-3"
            >
              Contact Admin
            </button>

            <div className="my-1 border-t border-gray-300 dark:border-gray-600"></div>

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

export default ClubTopNav;
