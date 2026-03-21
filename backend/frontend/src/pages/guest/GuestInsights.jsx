import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { events as defaultEvents } from "../../data/events.js";
import { useAuth } from "../../context/AuthContext";

export default function GuestInsights() {
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("All Time");

  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);

    const storedEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;
    
    // Filter events based on university safely matching metadata formats dynamically
    let validEvents = storedEvents;
    if (user.university) {
       validEvents = storedEvents.filter(e => e.university === user.university);
    }
    setFilteredEvents(validEvents);
  }, []);

  const getDateFilteredEvents = () => {
    if (filter === "All Time") return filteredEvents;
    const now = new Date();
    const days = filter === "Last 7 Days" ? 7 : 30;
    return filteredEvents.filter(e => {
        const d = new Date(e.date || e.startDate);
        const diffTime = Math.abs(now - d);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
    });
  };

  const activeEvents = getDateFilteredEvents();

  // MOCK CALCULATIONS FOR INSIGHTS
  const calculateTotal = activeEvents.reduce((acc, ev) => acc + (ev.title?.length * 12 || 20), 0);
  const avgEvents = activeEvents.length > 0 ? (Math.random() * 2 + 1).toFixed(1) : 0;
  
  const categoryCount = {};
  activeEvents.forEach(e => {
      const cat = e.category || "Any";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  const topCategory = Object.keys(categoryCount).length > 0 ? Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b) : "N/A";
  
  const engagementRate = activeEvents.length > 0 ? Math.floor(Math.random() * 30 + 60) : 0;

  // DATA FOR CHARTS
  const pieData = Object.keys(categoryCount).map(key => ({ name: key, value: categoryCount[key] }));
  
  const lineData = activeEvents.slice(0, 7).map((e, i) => ({
      date: `Day ${i + 1}`,
      count: (e.title?.length || 5) * 8 + Math.floor(Math.random() * 20)
  }));

  const COLORS = ['#F875AA', '#DEF9C4', '#F4CE14', '#38BDF8', '#34D399'];
  const DARK_COLORS = ['#1F7D53', '#255F38', '#F4CE14', '#38BDF8', '#34D399'];
  const baseColor = document.documentElement.classList.contains('dark') ? '#1F7D53' : '#F875AA';

  // Mock Data for Lists natively projected mapping arrays
  const topStudents = [
    { name: "Rahul Sharma", count: 12 },
    { name: "Priya Patel", count: 9 },
    { name: "Amit Kumar", count: 7 }
  ];

  const branchStats = [
    { branch: "Computer Science", percent: 45 },
    { branch: "Information Technology", percent: 25 },
    { branch: "Electronics", percent: 15 },
    { branch: "Mechanical", percent: 10 },
    { branch: "Civil", percent: 5 }
  ];

  const yearStats = [
    { year: "1st Year", val: 30 },
    { year: "2nd Year", val: 40 },
    { year: "3rd Year", val: 20 },
    { year: "4th Year", val: 10 }
  ];

  const venueCount = {};
  activeEvents.forEach(e => {
      const v = e.venue || "Online";
      venueCount[v] = (venueCount[v] || 0) + 1;
  });
  const venueStats = Object.keys(venueCount).map(v => ({ venue: v, count: venueCount[v] })).sort((a,b)=> b.count - a.count).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FDEDED] dark:bg-[#18230F] text-gray-800 dark:text-gray-200 p-6 md:p-10 transition-colors duration-300 pb-20">
      
      {/* 3. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[#F875AA] dark:text-[#1F7D53]">Insights</h1>
          <p className="text-gray-600 dark:text-gray-400">Understand how students engage with events</p>
        </div>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
          className="px-4 py-2.5 bg-white dark:bg-[#27391C] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]">
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="All Time">All Time</option>
        </select>
      </div>

      {activeEvents.length === 0 ? (
        <div className="bg-[#FFF0AE] dark:bg-[#27391C] rounded-2xl shadow-sm p-16 text-center border border-transparent dark:border-gray-800">
           <div className="text-5xl mb-4">📊</div>
           <h2 className="text-2xl font-bold mb-2">No data available yet</h2>
           <p className="text-gray-600 dark:text-gray-400">Host some events to begin tracking metrics.</p>
        </div>
      ) : (
        <>
          {/* 5. OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C] border border-transparent dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Participants</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{calculateTotal}</p>
            </div>
            <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C] border border-transparent dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg Events/Student</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgEvents}</p>
            </div>
            <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C] border border-transparent dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Top Category</p>
              <p className="text-2xl overflow-hidden truncate font-bold text-[#F875AA] dark:text-[#1F7D53]">{topCategory}</p>
            </div>
            <div className="p-5 rounded-xl shadow-sm bg-[#FFF0AE] dark:bg-[#27391C] border border-transparent dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Engagement Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{engagementRate}%</p>
            </div>
          </div>

          {/* 6. CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Category Distribution</h2>
              <div className="w-full h-[300px] min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={document.documentElement.classList.contains('dark') ? DARK_COLORS[index % DARK_COLORS.length] : COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', background: document.documentElement.classList.contains('dark') ? '#1A1A22' : '#fff', color: document.documentElement.classList.contains('dark') ? '#fff' : '#000' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Participation Trend</h2>
              <div className="w-full h-[300px] min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                    <XAxis dataKey="date" tick={{fontSize: 12}} />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', background: document.documentElement.classList.contains('dark') ? '#1A1A22' : '#fff', color: document.documentElement.classList.contains('dark') ? '#fff' : '#000' }} />
                    <Line type="monotone" dataKey="count" stroke={baseColor} strokeWidth={3} dot={{r: 4, fill: baseColor}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* 7. TOP STUDENTS */}
            <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
              <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Top Students</h2>
              <div className="space-y-3">
                {topStudents.map((std, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${i===0 ? 'bg-[#DEF9C4] dark:bg-[#255F38]' : 'bg-white/50 dark:bg-black/20'}`}>
                    <div className="flex gap-3">
                      <span className={`font-bold ${i===0 ? 'text-[#F875AA] dark:text-[#DEF9C4]' : 'text-gray-500'}`}>#{i+1}</span>
                      <span className="font-semibold">{std.name}</span>
                    </div>
                    <span className="text-sm font-bold bg-white dark:bg-black px-2 py-1 rounded-md shadow-sm">{std.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. BRANCH STATS */}
            <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
              <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Branch Activity</h2>
              <div className="space-y-3">
                {branchStats.map((b, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{b.branch}</span>
                      <span className="text-[#F875AA] dark:text-[#1F7D53] font-bold">{b.percent}%</span>
                    </div>
                    <div className="w-full bg-white dark:bg-[#18230F] h-2 rounded-full overflow-hidden">
                      <div className="h-2 rounded-full bg-[#F875AA] dark:bg-[#1F7D53]" style={{ width: `${b.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. YEAR STATS & 10. VENUES */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
                <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Year Distribution</h2>
                <div className="grid grid-cols-2 gap-3">
                  {yearStats.map((y, i) => (
                    <div key={i} className="text-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase">{y.year}</p>
                      <p className="text-xl font-bold">{y.val}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
                <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Top Venues</h2>
                <div className="space-y-2">
                  {venueStats.length === 0 ? <p className="text-sm">No venues</p> : venueStats.map((v, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/50 dark:bg-black/20 p-2 rounded-lg">
                      <span className="text-sm font-medium">{v.venue}</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full font-bold">{v.count} events</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 11. AI INSIGHTS */}
          <div className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-[-10px] p-4 opacity-10 dark:opacity-5 text-[150px] leading-none pointer-events-none">🧠</div>
            <h2 className="text-xl font-bold mb-4 text-[#F875AA] dark:text-[#1F7D53] flex items-center gap-2">
              <span>💡</span> Smart Insights
            </h2>
            <ul className="space-y-3 relative z-10 w-4/5">
              <li className="flex items-start gap-3 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <span className="text-xl mt-0.5">🔥</span>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-white capitalize">{topCategory}</span> events have the highest engagement consistently across all demographics.
                </p>
              </li>
              <li className="flex items-start gap-3 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <span className="text-xl mt-0.5">📈</span>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Participation increased this month, especially among 2nd-year CS students.
                </p>
              </li>
              <li className="flex items-start gap-3 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <span className="text-xl mt-0.5">📍</span>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Physical venues drive <span className="font-bold text-[#F875AA] dark:text-[#1F7D53]">25% more interactions</span> compared to hybrid alternatives.
                </p>
              </li>
            </ul>
          </div>

        </>
      )}
    </div>
  );
}
