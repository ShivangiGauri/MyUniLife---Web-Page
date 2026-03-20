import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { events as defaultEvents } from "../../data/events.js";

export default function ClubDashboard() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [clubEvents, setClubEvents] = useState([]);

  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);

    const storedEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;
    
    // Fallback if no specific "club" metadata exists, just simulate ownership locally
    // For a real app, it would be e.createdBy === "club", but for now mock club events:
    let events = storedEvents;
    if (user.university) {
       events = storedEvents.filter(e => e.university === user.university);
    }
    
    // We represent a small slice of mock club events for visual UI completeness
    setClubEvents(events.slice(0, 6)); 
  }, []);

  // Hash deterministic generator for generic metric simulations 
  const getSimulatedParticipants = (event) => {
     let hash = 0;
     const str = (event.title || "") + (event.id || "");
     for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
     return Math.abs(hash % 120) + 10;
  };

  const activeCount = clubEvents.filter(e => e.lifecycle === "ongoing" || e.lifecycle === "upcoming").length;
  const totalCount = clubEvents.length;
  const totalParticipants = clubEvents.reduce((acc, e) => acc + getSimulatedParticipants(e), 0);
  const avgPart = totalCount > 0 ? Math.floor(totalParticipants / totalCount) : 0;

  // Mock Performance Data
  const barData = clubEvents.map(e => ({
     name: e.title?.substring(0, 10) + "...",
     participants: getSimulatedParticipants(e)
  }));

  const lineData = [
     { month: 'Jan', growth: 10 },
     { month: 'Feb', growth: 25 },
     { month: 'Mar', growth: 45 },
     { month: 'Apr', growth: 30 },
     { month: 'May', growth: 80 },
     { month: 'Jun', growth: 120 }
  ];

  const topEvent = clubEvents.length > 0 ? [...clubEvents].sort((a,b) => getSimulatedParticipants(b) - getSimulatedParticipants(a))[0] : null;

  const baseColor = document.documentElement.classList.contains('dark') ? '#A64D79' : '#8E7DBE';
  const secondaryColor = document.documentElement.classList.contains('dark') ? '#6A1E55' : '#A6D6D6';

  return (
    <div className="min-h-screen p-6 md:p-10 text-gray-800 dark:text-gray-200">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold mb-1 text-[#8E7DBE] dark:text-[#A64D79]">Club Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Manage and grow your events</p>
        </div>
        <button 
          onClick={() => navigate("/club/create-event")}
          className="px-6 py-3 bg-[#8E7DBE] dark:bg-[#6A1E55] text-white rounded-xl font-bold shadow-sm hover:opacity-90 hover:scale-105 transition-all duration-300">
          + Create Event
        </button>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#A6D6D6]/40 dark:bg-[#6A1E55]/40 rounded-xl text-2xl">📅</div>
            <div>
              <p className="text-sm font-semibold opacity-80 mb-1">Events Created</p>
              <p className="text-3xl font-black text-[#8E7DBE] dark:text-[#A64D79]">{totalCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#A6D6D6]/40 dark:bg-[#6A1E55]/40 rounded-xl text-2xl">👥</div>
            <div>
              <p className="text-sm font-semibold opacity-80 mb-1">Total Participants</p>
              <p className="text-3xl font-black text-[#8E7DBE] dark:text-[#A64D79]">{totalParticipants || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#A6D6D6]/40 dark:bg-[#6A1E55]/40 rounded-xl text-2xl">📊</div>
            <div>
              <p className="text-sm font-semibold opacity-80 mb-1">Avg Participation</p>
              <p className="text-3xl font-black text-[#8E7DBE] dark:text-[#A64D79]">{avgPart || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#A6D6D6]/40 dark:bg-[#6A1E55]/40 rounded-xl text-2xl">🔥</div>
            <div>
              <p className="text-sm font-semibold opacity-80 mb-1">Active Events</p>
              <p className="text-3xl font-black text-[#8E7DBE] dark:text-[#A64D79]">{activeCount || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 md:p-8 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Event Performance</h2>
          <div className="w-full h-[300px] min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', background: document.documentElement.classList.contains('dark') ? '#1A1A1D' : '#fff', color: document.documentElement.classList.contains('dark') ? '#fff' : '#000', shadow: 'sm' }} />
                <Bar dataKey="participants" fill={baseColor} radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 md:p-8 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Participation Growth</h2>
          <div className="w-full h-[300px] min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={document.documentElement.classList.contains('dark') ? "#6A1E55" : "#A6D6D6"} opacity={0.3} />
                <XAxis dataKey="month" tick={{fontSize: 12}} />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: document.documentElement.classList.contains('dark') ? '#1A1A1D' : '#fff', color: document.documentElement.classList.contains('dark') ? '#fff' : '#000' }} />
                <Line type="smooth" dataKey="growth" stroke={baseColor} strokeWidth={4} dot={{r: 5, fill: secondaryColor, strokeWidth: 2, stroke: baseColor}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* 4. TOP EVENT HIGHLIGHT */}
        <div className="lg:col-span-4 flex flex-col h-full bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 rounded-2xl shadow-sm border border-white/40 dark:border-white/5 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center gap-2 mb-6 border-b border-[#A6D6D6]/50 dark:border-[#6A1E55]/50 pb-3">
            <span className="text-2xl">⭐</span>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Top Event Highlight</h2>
          </div>
          
          {topEvent ? (
            <div className="flex flex-col flex-1 justify-center items-center text-center p-4">
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm ${topEvent.lifecycle === 'ongoing' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-[#A6D6D6] dark:bg-[#6A1E55] text-gray-800 dark:text-gray-200'}`}>
                {topEvent.lifecycle || "Completed"}
              </span>
              <h3 className="text-2xl font-black mb-3 text-[#8E7DBE] dark:text-[#A64D79] leading-tight">{topEvent.title}</h3>
              <p className="text-sm font-semibold opacity-70 mb-6 flex items-center gap-2">
                <span>📅</span> {topEvent.date || topEvent.startDate || "Date TBA"}
              </p>
              
              <div className="w-full bg-white/50 dark:bg-[#1A1A1D]/50 p-4 rounded-xl border border-white/50 dark:border-[#6A1E55]/20 mt-auto">
                <p className="text-xs uppercase font-bold tracking-wider opacity-60 mb-1">Participants Engaged</p>
                <p className="text-4xl font-black">{getSimulatedParticipants(topEvent)}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center opacity-50 font-medium">No events found</div>
          )}
        </div>

        {/* 5. RECENT EVENTS LIST */}
        <div className="lg:col-span-8 bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 rounded-2xl shadow-sm border border-white/40 dark:border-white/5">
          <div className="flex justify-between items-center mb-6 border-b border-[#A6D6D6]/50 dark:border-[#6A1E55]/50 pb-3">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Events</h2>
            <button onClick={() => navigate("/club/my-events")} className="text-sm font-bold text-[#8E7DBE] dark:text-[#A64D79] hover:opacity-70 transition">View All →</button>
          </div>
          
          <div className="space-y-4">
            {clubEvents.length === 0 ? (
               <p className="text-center py-8 opacity-60 font-medium">No active events generated yet.</p>
            ) : clubEvents.slice(0, 4).map((event) => {
              const participants = getSimulatedParticipants(event);
              const statusColor = event.lifecycle === 'ongoing' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' 
                                : event.lifecycle === 'upcoming' ? 'bg-[#A6D6D6] text-gray-800 dark:bg-[#6A1E55]/60 dark:text-gray-200'
                                : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
              
              return (
                <div key={event.id} className="group bg-white/40 dark:bg-[#1A1A1D]/40 hover:bg-white/80 dark:hover:bg-[#1A1A1D]/80 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-transparent hover:border-white/60 dark:hover:border-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-1">
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white group-hover:text-[#8E7DBE] dark:group-hover:text-[#A64D79] transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold opacity-70">
                      <span>📅 {event.date || event.startDate || "TBA"}</span>
                      <span>👥 {participants} Particip.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${statusColor}`}>
                      {event.lifecycle || "Archive"}
                    </span>
                    <div className="flex gap-2">
                       <button onClick={(e) => { e.stopPropagation(); navigate(`/club/edit-event/${event.id}`); }} className="px-3 py-1.5 bg-[#8E7DBE]/20 text-[#8E7DBE] dark:bg-[#A64D79]/20 dark:text-[#A64D79] hover:bg-[#8E7DBE] hover:text-white dark:hover:bg-[#A64D79] dark:hover:text-white text-sm font-bold rounded-lg transition-colors">Edit</button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}