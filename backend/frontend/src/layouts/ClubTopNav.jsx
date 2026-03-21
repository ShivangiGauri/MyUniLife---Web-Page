import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function ClubTopNav({ toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-xl hover:bg-[#8E7DBE]/30 dark:hover:bg-[#6A1E55]/30 flex items-center justify-center transition text-lg text-gray-800 dark:text-gray-200"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-60 bg-[#F4F8D3] dark:bg-[#3B1C32] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 space-y-3 z-50">
            <button
              onClick={() => navigate("/club/portfolio")}
              className="block w-full text-left px-3 py-2 rounded-xl text-gray-800 dark:text-gray-200 font-medium hover:bg-[#A6D6D6]/50 dark:hover:bg-[#6A1E55]/40 transition"
            >
              👤 Profile
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="block w-full text-left px-3 py-2 rounded-xl text-gray-800 dark:text-gray-200 font-medium hover:bg-[#A6D6D6]/50 dark:hover:bg-[#6A1E55]/40 transition"
            >
              🌓 Toggle Theme
            </button>
            <div className="border-t border-[#A6D6D6] dark:border-[#6A1E55] pt-3 mt-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-xl text-red-500 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubTopNav;
