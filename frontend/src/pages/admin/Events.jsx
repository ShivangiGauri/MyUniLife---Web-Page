import { useState, useEffect } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Handle Notification
    const event = events.find(e => e.id === id);
    if (event) {
      const creatorEmail = event.creatorEmail || "club@myunilife.com";
      const newNotification = {
        id: Date.now(),
        userEmail: creatorEmail,
        role: "club",
        title: newStatus === 'approved' ? "Event Approved" : "Event Rejected",
        message: `${event.title} has been ${newStatus}.`,
        time: new Date().toLocaleString(),
        read: false
      };
      const existingNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
      localStorage.setItem("notifications", JSON.stringify([...existingNotifs, newNotification]));
      window.dispatchEvent(new Event("notification-update"));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Moderation</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Review and approve club events.</p>
        </div>
      </div>

      <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#B3C8CF] dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Event</th>
                <th className="p-4 font-semibold">Creator</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-gray-800 dark:text-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{event.title}</td>
                  <td className="p-4">{event.creator}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    {event.status !== 'approved' && (
                      <button 
                        onClick={() => handleStatusChange(event.id, 'approved')}
                        className="bg-[#89A8B2] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#89A8B2]/90 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {event.status !== 'rejected' && (
                      <button 
                        onClick={() => handleStatusChange(event.id, 'rejected')}
                        className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
