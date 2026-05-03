import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { events as defaultEvents } from "../../data/events.js";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Calendar, Users, BarChart3, Flame, Plus, ArrowRight } from "lucide-react";

export default function ClubDashboard() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [clubEvents, setClubEvents] = useState([]);

  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);

    const storedEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;
    let events = storedEvents;
    if (user.university) {
       events = storedEvents.filter(e => e.university === user.university);
    }
    setClubEvents(events.slice(0, 6)); 
  }, [authUser]);

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

  const primaryColor = "#4f46e5"; // indigo-600

  const StatCard = ({ title, value, icon: Icon }) => (
    <Card className="flex items-center gap-6 group">
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Club Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage and grow your events</p>
        </div>
        <Button onClick={() => navigate("/club/create-event")} className="flex items-center gap-2">
          <Plus size={20} /> Create Event
        </Button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Events Created" value={totalCount} icon={Calendar} />
        <StatCard title="Total Participants" value={totalParticipants} icon={Users} />
        <StatCard title="Avg Participation" value={avgPart} icon={BarChart3} />
        <StatCard title="Active Events" value={activeCount} icon={Flame} />
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-8">Event Performance</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', background: 'var(--tw-bg-opacity, #fff)' }}
                />
                <Bar dataKey="participants" fill={primaryColor} radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-8">Participation Growth</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="growth" stroke={primaryColor} strokeWidth={4} dot={{ r: 6, fill: primaryColor, strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TOP EVENT HIGHLIGHT */}
        <Card className="lg:col-span-4 p-8 flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 text-slate-900 dark:text-white">
            <h2 className="text-xl font-semibold">Top Event</h2>
            <span className="text-2xl">⭐</span>
          </div>
          
          {topEvent ? (
            <div className="flex flex-col flex-1 w-full">
              <Badge variant={topEvent.lifecycle === 'ongoing' ? 'success' : 'primary'} className="w-fit mx-auto mb-6">
                {topEvent.lifecycle || "Completed"}
              </Badge>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{topEvent.title}</h3>
              <p className="text-sm font-medium text-slate-500 flex items-center justify-center gap-2 mb-8">
                <Calendar size={16} /> {topEvent.date || topEvent.startDate || "Date TBA"}
              </p>
              
              <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mt-auto group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 transition-colors">
                <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-2">Total Participants</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">{getSimulatedParticipants(topEvent)}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium italic">No events available</div>
          )}
        </Card>

        {/* RECENT EVENTS LIST */}
        <Card className="lg:col-span-8 p-8">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Events</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/club/my-events")} className="flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Button>
          </div>
          
          <div className="space-y-4">
            {clubEvents.length === 0 ? (
               <div className="text-center py-12 text-slate-400 font-medium italic">No active events generated yet.</div>
            ) : clubEvents.slice(0, 4).map((event) => (
              <div key={event.id} onClick={() => navigate(`/club/edit-event/${event.id}`)} className="group p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-900/30 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer shadow-sm">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                  <div className="flex items-center gap-6 mt-1 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {event.date || event.startDate || "TBA"}</span>
                    <span className="flex items-center gap-1.5"><Users size={14} /> {getSimulatedParticipants(event)} Joined</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={
                    event.lifecycle === 'ongoing' ? 'success' : 
                    event.lifecycle === 'upcoming' ? 'primary' : 'default'
                  }>
                    {event.lifecycle || "Archive"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="hidden group-hover:inline-flex">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}