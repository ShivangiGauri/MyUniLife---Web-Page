import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Calendar, MapPin, Users, Edit3, Trash2, ExternalLink, X } from "lucide-react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

function ManageEvents() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", club: "", description: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/admin/events");
      setEvents(response.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/events", newEvent);
      if (response.status === 201 || response.status === 200) {
        alert("Event created successfully!");
        setIsModalOpen(false);
        setNewEvent({ title: "", date: "", location: "", club: "", description: "" });
        fetchEvents();
      }
    } catch (error) {
      alert("Failed to create event");
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

  const filteredEvents = (events || []).filter(e => 
    filter === "all" || e?.status === filter
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Events Management</h1>
          <p className="text-slate-500 font-bold">Create and manage university-wide events</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#285A48] text-white rounded-2xl font-bold shadow-lg shadow-[#285A48]/20 hover:scale-105 transition-all"
        >
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
                ? 'bg-[#285A48] text-white shadow-lg' 
                : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-[#E6F7F0] border border-slate-100 dark:border-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-20 text-center font-bold text-slate-400">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="col-span-full p-20 text-center font-bold text-slate-400">No events found</div>
        ) : filteredEvents.map((event) => (
          <div key={event.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                event?.status === 'upcoming' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {event?.status || "unknown"}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-[#285A48] hover:bg-[#E6F7F0] rounded-xl transition">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => deleteEvent(event.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-[#285A48] transition-colors">
              {event?.title}
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                <Calendar size={16} />
                <span>{event?.date ? new Date(event.date).toLocaleDateString() : "No Date"}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                <Users size={16} />
                <span>{event?.attendees || 0} Registered</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                <MapPin size={16} />
                <span>{event?.location || "University Campus"}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black">
                  {(event?.club || "?")[0]}
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{event?.club}</span>
              </div>
              <button className="flex items-center gap-2 text-[#285A48] text-xs font-black uppercase tracking-widest hover:underline">
                Details <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-3 bg-[#B0E4CC] text-[#285A48] rounded-2xl">
                <Plus size={24} />
              </div>
              New Campus Event
            </h2>

            <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Annual Hackathon 2026"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold focus:ring-4 focus:ring-[#B0E4CC] transition-all outline-none"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold focus:ring-4 focus:ring-[#B0E4CC] transition-all outline-none"
                  value={newEvent.date}
                  onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Organizing Club</label>
                <input 
                  type="text" 
                  required
                  placeholder="Tech Club"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold focus:ring-4 focus:ring-[#B0E4CC] transition-all outline-none"
                  value={newEvent.club}
                  onChange={e => setNewEvent({...newEvent, club: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="Main Auditorium / Zoom"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold focus:ring-4 focus:ring-[#B0E4CC] transition-all outline-none"
                  value={newEvent.location}
                  onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="What's this event about?"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold focus:ring-4 focus:ring-[#B0E4CC] transition-all outline-none resize-none"
                  value={newEvent.description}
                  onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                ></textarea>
              </div>
              
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 bg-[#285A48] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#285A48]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;
