import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function TopNav() {
  const navigate = useNavigate();
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
    navigate("/");
  };

  const navStyle =
    "px-4 py-2 rounded-xl transition text-sm font-medium";

  const activeStyle =
    "bg-[#F1EAFB] dark:bg-slate-700";

  return (
    <div className="px-6 py-4 flex items-center justify-between
                    bg-white dark:bg-[#1E293B]
                    border-b border-[#E9E5E1] dark:border-slate-700">

      {/* Left Navigation */}
<div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">

  <button
    onClick={() => navigate("/dashboard/upcoming-all")}
    className="flex-shrink-0 px-4 py-2 rounded-xl
               hover:bg-[#F7F2FA] dark:hover:bg-slate-700
               transition whitespace-nowrap">
    🌍 Upcoming
  </button>

  <button
    onClick={() => navigate("/dashboard/nearby")}
    className="flex-shrink-0 px-4 py-2 rounded-xl
               hover:bg-[#F7F2FA] dark:hover:bg-slate-700
               transition whitespace-nowrap">
    📍 Nearby
  </button>

  <button
    onClick={() => navigate("/dashboard/ongoing")}
    className="flex-shrink-0 px-4 py-2 rounded-xl
               hover:bg-[#F7F2FA] dark:hover:bg-slate-700
               transition whitespace-nowrap">
    ⚡ Ongoing
  </button>

  <button
    onClick={() => navigate("/dashboard/completed")}
    className="flex-shrink-0 px-4 py-2 rounded-xl
               hover:bg-[#F7F2FA] dark:hover:bg-slate-700
               transition whitespace-nowrap">
    🏆 Completed
  </button>

  <button
    onClick={() => navigate("/dashboard/archive")}
    className="flex-shrink-0 px-4 py-2 rounded-xl
               hover:bg-[#F7F2FA] dark:hover:bg-slate-700
               transition whitespace-nowrap">
    📚 Archive
  </button>

</div>


      {/* RIGHT 3-DOT MENU */}
      <div className="relative" ref={menuRef}>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-xl
                     hover:bg-[#F1EAFB] dark:hover:bg-slate-700
                     flex items-center justify-center
                     transition text-lg"
        >
          ⋮
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-3 w-60
                       bg-white dark:bg-[#1E293B]
                       rounded-2xl
                       shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                       dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                       p-4 space-y-3 z-50"
          >

            <button
              onClick={() => navigate("/dashboard/profile")}
              className="block w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F2FA] dark:hover:bg-slate-700 transition"
            >
              👤 Profile
            </button>

            <button
              onClick={() => navigate("/dashboard/settings")}
              className="block w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F2FA] dark:hover:bg-slate-700 transition"
            >
              ⚙ Settings
            </button>

            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              className="block w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F2FA] dark:hover:bg-slate-700 transition"
            >
              🌓 Toggle Theme
            </button>

            <div className="border-t border-[#E9E5E1] dark:border-slate-700 pt-3">

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
