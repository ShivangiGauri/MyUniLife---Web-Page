import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";

  return (
    <aside className="hidden md:flex w-72 p-6 flex-col justify-between
                      bg-white dark:bg-[#1E293B]
                      shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                      dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-2xl 
                          bg-gradient-to-br from-[#9F7AEA] to-[#F6C1D9]
                          flex items-center justify-center 
                          text-white font-bold shadow-sm">
            M
          </div>
          <h1 className="text-xl font-semibold tracking-wide">
            MyUniLife
          </h1>
        </div>

        <nav className="space-y-2 text-sm">

          {/* Overview */}
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#F1EAFB] text-[#9F7AEA] dark:bg-[#334155] dark:text-cyan-300"
                  : "hover:bg-[#F7F2FA] dark:hover:bg-[#334155]"
              }`
            }
          >
            📊 Overview
          </NavLink>

          {/* Activities */}
          <NavLink
            to="/dashboard/activities"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#F1EAFB] text-[#9F7AEA] dark:bg-[#334155] dark:text-cyan-300"
                  : "hover:bg-[#F7F2FA] dark:hover:bg-[#334155]"
              }`
            }
          >
            🗓 Activities
          </NavLink>

          {/* Saved Events */}
          <NavLink
            to="/dashboard/saved"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#F1EAFB] text-[#9F7AEA] dark:bg-[#334155] dark:text-cyan-300"
                  : "hover:bg-[#F7F2FA] dark:hover:bg-[#334155]"
              }`
            }
          >
            💾 Saved Events
          </NavLink>

          {/* Registered Events */}
          <NavLink
            to="/dashboard/registered"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#F1EAFB] text-[#9F7AEA] dark:bg-[#334155] dark:text-cyan-300"
                  : "hover:bg-[#F7F2FA] dark:hover:bg-[#334155]"
              }`
            }
          >
            📝 Registered Events
          </NavLink>

          {/* Portfolio */}
          <NavLink
            to="/dashboard/portfolio"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#F1EAFB] text-[#9F7AEA] dark:bg-[#334155] dark:text-cyan-300"
                  : "hover:bg-[#F7F2FA] dark:hover:bg-[#334155]"
              }`
            }
          >
            📁 Portfolio
          </NavLink>

          {/* All University Events */}
          <NavLink
            to="/dashboard/uni-all"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#F1EAFB] text-[#9F7AEA] dark:bg-[#334155] dark:text-cyan-300"
                  : "hover:bg-[#F7F2FA] dark:hover:bg-[#334155]"
              }`
            }
          >
            📂 All Uni Events
          </NavLink>

        </nav>
      </div>

    </aside>
  );
}
