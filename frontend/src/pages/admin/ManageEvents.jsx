import { useState, useEffect } from "react";
import { Search, Plus, Filter, Calendar, MapPin, Users, Edit3, Trash2, ExternalLink } from "lucide-react";
import api from "../../api/api";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/admin/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Mock data
      setEvents([
        { id: 1, title: "Hackathon 2026", club: "Tech Innovators", date: "2026-06-15", attendees: 120, status: "upcoming", type: "academic" },
        { id: 2, title: "Summer Music Fest", club: "Cultural Hub", date: "2026-07-20", attendees: 450, status: "upcoming", type: "social" },
        { id: 3, title: "Career Fair", club: "Admin", date: "2026-05-10", attendees: 300, status: "completed", type: "career" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/admin/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Events Management</h1>
          <p className="text-slate-500 font-bold">Create and manage university-wide events</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:scale-105 transition-all">
          <Plus size={20} />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {['all', 'upcoming', 'completed', 'cancelled'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              filter === tab 
                ? 'bg-[var(--color-primary)] text-white shadow-lg' 
                : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-[var(--bg-surface)] border border-slate-100 dark:border-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-20 text-center font-bold text-slate-400">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="col-span-full p-20 text-center font-bold text-slate-400">No events found</div>
        ) : events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                event.status === 'upcoming' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {event.status}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-[var(--color-primary)] hover:bg-[var(--bg-surface)] rounded-xl transition">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => deleteEvent(event.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {event.title}
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                <Users size={16} />
                <span>{event.attendees} Registered Participants</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                <MapPin size={16} />
                <span>Main Auditorium</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black">
                  {event.club[0]}
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{event.club}</span>
              </div>
              <button className="flex items-center gap-2 text-[var(--color-primary)] text-xs font-black uppercase tracking-widest hover:underline">
                Details <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageEvents;
