import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ClubSidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItem = (path, label) => {
    const isActive = location.pathname === path || (path !== "/club" && location.pathname.startsWith(path));
    const activeClass = "bg-[#8E7DBE] dark:bg-[#6A1E55] text-white";
    const inactiveClass = "text-gray-800 dark:text-gray-200 hover:bg-[#8E7DBE]/20 dark:hover:bg-[#6A1E55]/20 transition-colors";

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
          <h2 className="text-2xl font-bold text-[#8E7DBE] dark:text-[#A64D79]">Club Panel</h2>
        </div>
        <nav className="space-y-2">
          {navItem("/club", "Dashboard")}
          {navItem("/club/create-event", "Create Event")}
          {navItem("/club/my-events", "My Events")}
          {navItem("/club/manage-events", "Manage Events")}
          {navItem("/club/saved", "Saved Events")}
          {navItem("/club/registered", "Registered Events")}
          {navItem("/club/portfolio", "Portfolio")}
        </nav>
      </div>
      <div className="pt-6 border-t border-[#A6D6D6] dark:border-[#3B1C32] mt-6">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-[#8E7DBE]/20 dark:hover:bg-[#6A1E55]/20 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ClubSidebar;