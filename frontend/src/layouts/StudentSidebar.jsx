import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StudentSidebar({ onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass =
    "block px-4 py-2 rounded-lg text-sm font-medium transition-colors";

  const activeClass = "bg-[#F08B51] text-white dark:bg-[#BB8493] dark:text-white";
  const inactiveClass = "text-[#333333] dark:text-[#F5F5F5] hover:bg-[#F08B51]/20 dark:hover:bg-[#DBAFA0]/20";

  const navItem = (path, label) => (
    <NavLink
      to={path}
      onClick={onClose}
      className={({ isActive }) =>
        `${linkClass} ${isActive ? activeClass : inactiveClass}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <div className="w-full min-h-screen flex flex-col justify-between p-6 overflow-y-auto">

      {/* Top Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">MyUniLife</h2>
        </div>

        <nav className="space-y-2">
          {navItem("/student/overview", "Dashboard")}
          {navItem("/student/activities", "Activities")}
          {navItem("/student/portfolio", "Portfolio")}
          {navItem("/student/registered", "Registered Events")}
          {navItem("/student/saved", "Saved Events")}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 border-t dark:border-gray-700 mt-6">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default StudentSidebar;