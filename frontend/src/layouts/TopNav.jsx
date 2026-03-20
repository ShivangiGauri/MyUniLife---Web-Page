import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

function TopNav({ toggleSidebar }) {
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-6 py-4 flex items-center justify-between
                    bg-[#FFF8E8] dark:bg-[#49243E]
                    border-b border-[#DEE8CE] dark:border-[#704264]">

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
                     bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] font-medium
                     hover:bg-[#F08B51]/30 dark:hover:bg-[#DBAFA0]/30
                     transition whitespace-nowrap">
          🌍 Upcoming
        </button>

        <button
          onClick={() => navigate("/student/nearby")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] font-medium
                     hover:bg-[#F08B51]/30 dark:hover:bg-[#DBAFA0]/30
                     transition whitespace-nowrap">
          📍 Nearby
        </button>

        <button
          onClick={() => navigate("/student/ongoing")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] font-medium
                     hover:bg-[#F08B51]/30 dark:hover:bg-[#DBAFA0]/30
                     transition whitespace-nowrap">
          ⚡ Ongoing
        </button>

        <button
          onClick={() => navigate("/student/completed")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] font-medium
                     hover:bg-[#F08B51]/30 dark:hover:bg-[#DBAFA0]/30
                     transition whitespace-nowrap">
          🏆 Completed
        </button>

        <button
          onClick={() => navigate("/student/archive")}
          className="flex-shrink-0 px-4 py-2 rounded-xl
                     bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] font-medium
                     hover:bg-[#F08B51]/30 dark:hover:bg-[#DBAFA0]/30
                     transition whitespace-nowrap">
          📚 Archive
        </button>

      </div>

      {/* RIGHT MENU */}
      <div className="relative" ref={menuRef}>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-xl
                     hover:bg-[#F08B51]/20 dark:hover:bg-[#DBAFA0]/20
                     flex items-center justify-center text-[#333333] dark:text-[#F5F5F5]
                     transition text-lg"
        >
          ⋮
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-3 w-60
                       bg-[#DEE8CE] dark:bg-[#704264]
                       rounded-2xl
                       shadow-xl
                       p-4 space-y-3 z-50 text-[#333333] dark:text-[#F5F5F5]"
          >

            <button
              onClick={() => navigate("/student/portfolio")}
              className="block w-full text-left px-3 py-2 rounded-xl hover:bg-[#F08B51]/20 dark:hover:bg-[#DBAFA0]/20 transition"
            >
              👤 Profile
            </button>

            <button
              onClick={() => navigate("/student/settings")}
              className="block w-full text-left px-3 py-2 rounded-xl hover:bg-[#F08B51]/20 dark:hover:bg-[#DBAFA0]/20 transition"
            >
              ⚙ Settings
            </button>

            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              className="block w-full text-left px-3 py-2 rounded-xl hover:bg-[#F08B51]/20 dark:hover:bg-[#DBAFA0]/20 transition"
            >
              🌓 Toggle Theme
            </button>

            <div className="border-t border-[#F08B51]/30 dark:border-[#DBAFA0]/30 pt-3">

              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-xl
                           text-red-500 hover:bg-red-50
                           dark:hover:bg-red-900/30 transition"
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

export default TopNav;