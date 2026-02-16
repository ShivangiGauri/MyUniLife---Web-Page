import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between px-6 py-4
                    bg-white dark:bg-[#1E293B]
                    border-b border-[#E9E5E1] dark:border-slate-700
                    shadow-sm">

      <div className="text-lg font-medium">
        Dashboard
      </div>

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-4 py-2 rounded-xl text-sm font-medium
                   bg-[#F1EAFB] text-[#9F7AEA]
                   dark:bg-slate-700 dark:text-cyan-300
                   hover:shadow-md transition"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

    </div>
  );
}
