import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function GuestTopNav({ toggleSidebar }) {
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
    <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-[#FDEDED] dark:bg-[#18230F]">
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar max-w-full">
        <button className="md:hidden flex-shrink-0 mr-2 text-2xl text-gray-800 dark:text-gray-200" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-xl hover:bg-[#F875AA]/20 flex items-center justify-center transition text-lg text-gray-800 dark:text-gray-200"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-60 bg-[#FFF0AE] dark:bg-[#27391C] rounded-2xl shadow-xl p-4 space-y-3 z-50">
            <button onClick={() => navigate("/guest")} className="block w-full text-left px-3 py-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-[#F875AA]/20 transition font-medium">
              🏠 Dashboard
            </button>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="block w-full text-left px-3 py-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-[#F875AA]/20 transition font-medium">
              🌓 Toggle Theme
            </button>
            <div className="border-t border-[#F875AA]/30 pt-3 mt-2">
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-xl text-red-500 hover:bg-[#F875AA]/20 transition font-medium">
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuestTopNav;
