import { useState, useRef, useEffect, useMemo } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const menuRef = useRef(null);
  const { user } = useAuth();

  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || user || {};
  }, [user]);
  
  const loadNotifications = () => {
    const allNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
    
    // Admin sees all notifications directed to role "admin"
    // Other users see notifications directed to their specific email
    const userNotifs = allNotifs.filter(n => {
      if (currentUser.role === "admin" && n.role === "admin") return true;
      if (n.userEmail === currentUser.email && currentUser.email) return true;
      return false;
    });

    // Sort newest first
    userNotifs.sort((a, b) => b.id - a.id);
    setNotifications(userNotifs);
  };

  useEffect(() => {
    loadNotifications();

    // Listen for storage changes if notifications update from another tab/component
    window.addEventListener("storage", loadNotifications);
    // Also listen to a custom event for same-tab updates
    window.addEventListener("notification-update", loadNotifications);
    
    return () => {
      window.removeEventListener("storage", loadNotifications);
      window.removeEventListener("notification-update", loadNotifications);
    };
  }, [currentUser.email, currentUser.role]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    const allNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
    const updated = allNotifs.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem("notifications", JSON.stringify(updated));
    
    window.dispatchEvent(new Event("notification-update"));
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    const allNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
    const updated = allNotifs.map(n => {
      if (currentUser.role === "admin" && n.role === "admin") return { ...n, read: true };
      if (n.userEmail === currentUser.email) return { ...n, read: true };
      return n;
    });
    localStorage.setItem("notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("notification-update"));
    loadNotifications();
  };

  const handleClearAll = () => {
    const allNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
    const remaining = allNotifs.filter(n => {
      if (currentUser.role === "admin" && n.role === "admin") return false;
      if (n.userEmail === currentUser.email) return false;
      return true;
    });
    localStorage.setItem("notifications", JSON.stringify(remaining));
    window.dispatchEvent(new Event("notification-update"));
    loadNotifications();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative z-50 flex items-center" ref={menuRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-[#89A8B2]/20 dark:hover:bg-[#948979]/20 transition text-gray-600 dark:text-gray-300 cursor-pointer"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute 0 right-0 top-0 translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-[10px] font-bold px-[5px] py-[2px] rounded-full leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 max-w-[90vw] bg-[#E5E1DA] dark:bg-[#393E46] rounded-xl shadow-lg p-3 z-50 max-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-3 px-1 border-b border-gray-300 dark:border-gray-600 pb-2">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Notifications</h3>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-[#89A8B2] hover:underline"
                >
                  Mark all read
                </button>
                <button 
                  onClick={handleClearAll}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="overflow-y-auto flex-1 no-scrollbar space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center text-sm opacity-50 py-4 text-gray-700 dark:text-gray-300">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleMarkAsRead(n.id)}
                  className={`p-3 rounded-lg cursor-pointer transition border border-transparent ${
                    !n.read 
                      ? "bg-[#89A8B2]/20 dark:bg-[#948979]/20 border-[#89A8B2]/30" 
                      : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1 leading-tight">{n.title}</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 opacity-90 mb-2 leading-snug">{n.message}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 opacity-70 font-medium">{n.time}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
