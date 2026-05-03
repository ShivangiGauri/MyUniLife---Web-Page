import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api, { API_BASE_URL } from "../api/api";

export default function ContactAdminModal({ onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || user;
    
    const userName = currentUser?.name || "Guest";
    const userRole = currentUser?.role || "guest";
    const userEmail = currentUser?.email || "guest@myunilife.com";

    setLoading(true);

    try {
      const response = await api.post(`${API_BASE_URL}/contact/send`, {
        name: userName,
        email: userEmail,
        role: userRole,
        subject,
        message
      });

      if (response.data.success) {
        // Fallback save to localStorage for Admin Support Panel rendering
        const messageData = {
          id: Date.now(),
          user: userName,
          role: userRole,
          subject,
          content: message,
          time: new Date().toISOString(),
          status: "pending"
        };
        const existing = JSON.parse(localStorage.getItem("messages")) || [];
        localStorage.setItem("messages", JSON.stringify([...existing, messageData]));

        const adminNotification = {
          id: Date.now() + 1,
          userEmail: "admin@myunilife.com",
          role: "admin",
          title: "New Support Request",
          message: `${userName} sent a new message: ${subject}`,
          time: new Date().toLocaleString(),
          read: false
        };
        const existingNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
        localStorage.setItem("notifications", JSON.stringify([...existingNotifs, adminNotification]));
        window.dispatchEvent(new Event("notification-update"));

        alert("Message sent successfully!");
        onClose();
      }
    } catch (err) {
      alert(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="w-[400px] bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl p-6 shadow-lg relative mx-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Send Message to Admin</h2>

        {/* To */}
        <input
          type="email"
          value="admin@myunilife.com"
          disabled
          className="w-full mb-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
        />

        {/* Subject */}
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={loading}
          className="w-full mb-3 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#222831] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#89A8B2]"
        />

        {/* Message */}
        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          className="w-full mb-3 p-2 rounded-lg border border-gray-300 dark:border-gray-600 h-24 bg-white dark:bg-[#222831] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#89A8B2]"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button 
            onClick={handleSend}
            disabled={loading || !subject.trim() || !message.trim()}
            className="bg-[#89A8B2] hover:bg-[#89A8B2]/90 transition text-white px-4 py-2 rounded-lg shadow-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
