import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItem = (path, label) => {
    // Exact match for dashboard, startswith for subpages but avoid triggering for just /guest when on another page
    const isActive = path === "/guest" ? location.pathname === "/guest" || location.pathname === "/guest/dashboard" : location.pathname.startsWith(path);
    const activeClass = "bg-[#F875AA] text-white";
    const inactiveClass = "text-gray-800 dark:text-gray-200 hover:bg-[#F875AA]/20 transition-colors";

    return (
      <Link
        to={path}
        onClick={onClose}
        className={`block px-4 py-3 rounded-lg text-sm font-medium ${isActive ? activeClass : inactiveClass}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between p-6 overflow-y-auto">
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#F875AA] dark:text-[#1F7D53]">Guest Panel</h2>
        </div>
        <nav className="space-y-2">
          {navItem("/guest", "Dashboard")}
          {navItem("/guest/events", "Events")}
          {navItem("/guest/insights", "Insights")}
        </nav>
      </div>
      <div className="pt-6 border-t dark:border-gray-700 mt-6">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-[#F875AA]/20 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default GuestSidebar;