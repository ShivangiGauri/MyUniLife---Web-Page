import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { events } from "../../data/events.js";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function GuestDashboard() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);
    
    // Filter events based on university, fallback to all events if missing
    if (user.university) {
       setFilteredEvents(events.filter(e => e.university === user.university));
    } else {
       setFilteredEvents(events);
    }
  }, []);

  // Stats Calculations
  const guestEvents = filteredEvents.filter(e => e.createdBy === "guest" || e.createdBy === "Guest");
  const upcomingGuest = guestEvents.filter(e => e.lifecycle === "upcoming" || new Date(e.startDate || e.date) > new Date()).length;
  
  // Mocking student engagement counts
  const studentsEngaged = filteredEvents.length > 0 ? filteredEvents.length * 12 : 0;
  const avgParticipation = filteredEvents.length > 0 ? Math.floor(studentsEngaged / filteredEvents.length) : 0;

  // Chart Data
  const getFrequencyMap = (arr, key) => {
    const map = {};
    arr.forEach(item => {
      const val = item[key];
      if (val) map[val] = (map[val] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const categoryData = getFrequencyMap(filteredEvents, "category");
  
  // Participation Bar Chart Data (Mocking counts per event dynamically)
  const participationData = filteredEvents.slice(0, 6).map(e => ({
    name: e.title.substring(0, 10) + "..",
    value: Math.floor(Math.random() * 50) + 15
  }));

  const COLORS = ['#F875AA', '#DEF9C4', '#F4CE14', '#38BDF8', '#34D399', '#9F7AEA'];

  // Mock Leaderboard
  const leaderboard = [
    { name: "Rahul Sharma", count: 12 },
    { name: "Priya Patel", count: 9 },
    { name: "Amit Kumar", count: 7 },
    { name: "Neha Singh", count: 5 }
  ];

  // Mock Activity Feed
  const activityFeed = [
    "Shivangi registered for Web3 Hackathon",
    "Rahul completed React Workshop",
    "Aarav saved AI Seminar",
    "Priya joined competitive programming"
  ];

  return (
    <div className="min-h-screen bg-[#FDEDED] dark:bg-[#18230F] text-gray-800 dark:text-gray-200 p-6 md:p-10 transition-colors duration-300">
      
      {/* 3. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[#F875AA] dark:text-[#1F7D53]">Guest Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your university ecosystem</p>
        </div>
        <button 
          onClick={() => navigate("/guest/create-event")}
          className="px-5 py-2.5 bg-[#F875AA] dark:bg-[#1F7D53] text-white rounded-xl font-semibold shadow-sm hover:opacity-90 transition">
          + Create Event
        </button>
      </div>

      {/* 5. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C]">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Events Created</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{guestEvents.length}</p>
        </div>
        <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C]">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Students Engaged</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentsEngaged}</p>
        </div>
        <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C]">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg Participation</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgParticipation}</p>
        </div>
        <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C]">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upcoming Hosted</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{upcomingGuest}</p>
        </div>
      </div>

      {/* 9. RESPONSIVENESS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* 6. PERFORMANCE SECTION (CHARTS) */}
        <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Category Distribution</h2>
          {categoryData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No data available</p>
          ) : (
            <div style={{ width: "100%", height: "288px" }}>
              <ResponsiveContainer width="100%" height={288}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Participation Analytics</h2>
          {participationData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No data available</p>
          ) : (
            <div style={{ width: "100%", height: "288px" }}>
              <ResponsiveContainer width="100%" height={288}>
                <BarChart data={participationData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-15} textAnchor="end" />
                  <YAxis />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#F875AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 7. TOP STUDENTS */}
        <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Top Students</h2>
          <div className="space-y-3">
            {leaderboard.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No data available</p>
            ) : (
              leaderboard.map((student, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-xl transition ${idx === 0 ? 'bg-[#DEF9C4] dark:bg-[#255F38] shadow-sm' : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`font-bold text-lg ${idx === 0 ? 'text-[#F875AA] dark:text-[#DEF9C4]' : 'text-gray-500 dark:text-gray-400'}`}>#{idx + 1}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{student.name}</span>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-lg shadow-sm ${idx === 0 ? 'bg-white dark:bg-black text-gray-800 dark:text-gray-200' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'}`}>
                    {student.count} Events
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 8. ACTIVITY FEED */}
        <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
          <div className="border-l-2 border-[#F875AA] dark:border-[#1F7D53] pl-4 space-y-6 ml-2">
            {activityFeed.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No data available</p>
            ) : (
              activityFeed.map((feed, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute w-3 h-3 bg-[#F875AA] dark:bg-[#1F7D53] rounded-full -left-[23px] top-1.5 shadow-sm"></div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{feed}</p>
                  <p className="text-xs text-gray-400 mt-1">{idx + 1} hr ago</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
