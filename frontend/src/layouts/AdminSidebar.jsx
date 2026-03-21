import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminSidebar({ onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass =
    "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const activeClass = "bg-[#89A8B2] text-white shadow-sm";
  const inactiveClass = "text-gray-700 dark:text-gray-300 hover:bg-[#89A8B2]/20";

  const navItem = (path, label) => (
    <NavLink
      to={path}
      onClick={onClose}
      end={path === "/admin"}
      className={({ isActive }) =>
        `${linkClass} ${isActive ? activeClass : inactiveClass}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <div className="w-full h-screen flex flex-col justify-between p-5 overflow-y-auto bg-[#B3C8CF] dark:bg-[#393E46] shadow-xl lg:shadow-none">
      
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-center mb-8 px-2 mt-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Panel</h2>
          <button onClick={onClose} className="lg:hidden text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-2">
          {navItem("/admin", "Dashboard")}
          {navItem("/admin/users", "Users")}
          {navItem("/admin/clubs", "Clubs")}
          {navItem("/admin/events", "Events")}
          {navItem("/admin/support", "Support")}
          {navItem("/admin/analytics", "Analytics")}
          {navItem("/admin/settings", "Settings")}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 border-t border-gray-300 dark:border-gray-600 mt-6">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default AdminSidebar;