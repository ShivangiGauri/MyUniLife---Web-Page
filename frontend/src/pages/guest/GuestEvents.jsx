import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "../../context/AuthContext";

export default function GuestEvents() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);

    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    
    // Safely format case check
    const guestEvents = allEvents.filter(e => 
      e.createdBy?.toLowerCase() === "guest" && 
      e.university === user.university
    );
    
    setEvents(guestEvents);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event? This cannot be undone.")) {
      const allEvents = JSON.parse(localStorage.getItem("events")) || [];
      const updatedAll = allEvents.filter(e => e.id !== id);
      localStorage.setItem("events", JSON.stringify(updatedAll));
      setEvents(events.filter(e => e.id !== id));
    }
  };

  // Mock deterministic participants based on ID length or values since single local DB
  const getParticipantsCount = (event) => {
     let hash = 0;
     const str = (event.title || "") + (event.id || "");
     for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
     }
     return Math.abs(hash % 160); // Generates between 0 and 159 consistently per event
  };

  const getEngagementInfo = (count) => {
    if (count > 100) return { label: "High", color: "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" };
    if (count >= 30) return { label: "Medium", color: "text-amber-700 bg-amber-100 dark:bg-amber-900/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800" };
    return { label: "Low", color: "text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-400 border border-red-200 dark:border-red-800" };
  };

  return (
    <div className="min-h-screen bg-[#FDEDED] dark:bg-[#18230F] text-gray-800 dark:text-gray-200 p-6 md:p-10 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[#F875AA] dark:text-[#1F7D53]">Guest Events</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and analyze your hosted events</p>
        </div>
        <button 
          onClick={() => navigate("/guest/create-event")}
          className="px-5 py-2.5 bg-[#F875AA] dark:bg-[#1F7D53] text-white rounded-xl font-semibold shadow-sm hover:opacity-90 transition">
          + Create Event
        </button>
      </div>

      {/* EMPTY STATE OR GRID */}
      {events.length === 0 ? (
        <div className="bg-[#FFF0AE] dark:bg-[#27391C] rounded-2xl shadow-sm border border-transparent dark:border-gray-800 flex items-center justify-center p-16">
          <div className="text-center">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2">No events created yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start hosting and tracking engagement dynamically!</p>
            <button 
              onClick={() => navigate("/guest/create-event")}
              className="px-6 py-3 bg-[#F875AA] dark:bg-[#1F7D53] text-white rounded-xl font-semibold shadow-sm hover:opacity-90 transition">
              Create Your First Event
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => {
            const count = getParticipantsCount(event);
            const engagement = getEngagementInfo(count);

            return (
              <div key={event.id} className="bg-[#FFF0AE] dark:bg-[#27391C] rounded-xl shadow-sm p-6 border border-transparent dark:border-gray-800 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold leading-tight">{event.title || "Untitled"}</h3>
                    <span className="px-2 py-1 bg-white/50 dark:bg-black/20 text-xs font-bold rounded-lg uppercase tracking-wide">
                      {event.category || "Any"}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
                    <p>📅 {event.date || event.startDate || "TBD"} {event.startTime && `• ${event.startTime}`}</p>
                    <p>📍 {event.venue || "Venue"} {event.city && `, ${event.city}`}</p>
                    <p>🎓 {event.university || "University"}</p>
                  </div>
                  
                  <div className="border-t border-orange-200 dark:border-gray-700 my-4"></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Participants</p>
                      <p className="text-2xl font-black">{count}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Engagement</p>
                      <span className={`px-3 py-1 text-sm font-bold rounded-full ${engagement.color}`}>
                        {engagement.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-orange-200 dark:border-gray-700 my-4"></div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  <button 
                    onClick={() => setSelectedEvent({ ...event, count, engagement })}
                    className="flex-1 py-2 bg-[#F875AA] dark:bg-[#1F7D53] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition">
                    View Analytics
                  </button>
                  <button 
                    onClick={() => navigate(`/guest/edit-event/${event.id}`)}
                    className="px-4 py-2 bg-white dark:bg-[#18230F] text-gray-800 dark:text-gray-200 text-sm font-semibold border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ANALYTICS MODAL */}
      {selectedEvent && <EventAnalyticsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

function EventAnalyticsModal({ event, onClose }) {
  // Generate deterministic mock line chart data mimicking registrations over time
  const generateLineData = (baseCount) => {
    const data = [];
    let current = Math.floor(baseCount * 0.1);
    for (let i = 1; i <= 7; i++) {
       current += Math.floor(Math.random() * (baseCount * 0.2));
       if (i === 7) current = baseCount; // ensure it reaches total
       data.push({ date: `Day ${i}`, registrations: current });
    }
    return data;
  };

  const lineData = generateLineData(event.count);
  
  // Custom mock category demographics for Pie chart based on event
  const pieData = [
    { name: "Students", value: Math.floor(event.count * 0.7) },
    { name: "Professionals", value: Math.floor(event.count * 0.2) },
    { name: "Faculty", value: event.count - Math.floor(event.count * 0.7) - Math.floor(event.count * 0.2) }
  ];
  
  const COLORS = ['#F875AA', '#DEF9C4', '#F4CE14'];
  const DARK_COLORS = ['#1F7D53', '#255F38', '#F4CE14'];
  const baseColor = document.documentElement.classList.contains('dark') ? '#1F7D53' : '#F875AA';

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#FDEDED] dark:bg-[#18230F] rounded-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 border dark:border-gray-800">
        
        <div className="flex justify-between items-start mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{event.title} Analytics</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-gray-600 dark:text-gray-400">Total Participants: {event.count}</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${event.engagement.color}`}>{event.engagement.label} Engagement</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition text-2xl leading-none">&times;</button>
        </div>

        <div className="space-y-8">
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#F875AA] dark:text-[#1F7D53]">Registrations Over Time</h3>
            <div className="w-full h-[300px] min-h-[300px] bg-[#FFF0AE] dark:bg-[#27391C] p-4 rounded-xl border border-transparent dark:border-gray-700">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{fontSize: 12}} />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="registrations" stroke={baseColor} strokeWidth={3} dot={{r: 4, fill: baseColor}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#F875AA] dark:text-[#1F7D53]">Attendee Demographics</h3>
            <div className="w-full h-[300px] min-h-[300px] bg-[#FFF0AE] dark:bg-[#27391C] p-4 rounded-xl border border-transparent dark:border-gray-700">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={document.documentElement.classList.contains('dark') ? DARK_COLORS[index % DARK_COLORS.length] : COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-5 rounded-xl border border-transparent dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 border-b border-orange-200 dark:border-gray-600 pb-2">AI Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span>{event.engagement.label === "High" ? "High engagement compared to other events in the same category." : "Consider adjusting marketing to boost engagement before the event date."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span>Peak registrations occurred mid-week forming a strong upward trend.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span>The student segment accounts for the massive majority of the attendee demographic.</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-[#F875AA] dark:bg-[#1F7D53] text-white rounded-lg font-semibold hover:opacity-90 transition">
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
