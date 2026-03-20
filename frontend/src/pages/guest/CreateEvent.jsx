import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { events as defaultEvents } from "../../data/events.js";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    city: "",
    university: "",
    maxParticipants: "",
    mode: "Offline",
    image: ""
  });

  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);
    if (user.university) {
      setForm(prev => ({ ...prev, university: user.university }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.venue) {
      setError("Please fill in all required fields (Title, Date, Venue).");
      return;
    }

    const savedEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;
    
    const newEvent = {
      ...form,
      id: Date.now().toString(),
      createdBy: "guest",
      lifecycle: new Date(form.date) > new Date() ? "upcoming" : "ongoing",
      startDate: form.date,
    };

    const updatedEvents = [...savedEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    setSuccess(true);
    setTimeout(() => {
      navigate("/guest");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDEDED] dark:bg-[#18230F] text-gray-800 dark:text-gray-200 p-6 md:p-10 transition-colors duration-300">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[#F875AA] dark:text-[#1F7D53]">Create Event</h1>
          <p className="text-gray-600 dark:text-gray-400">Host an event for your university students</p>
        </div>
        <button 
          onClick={() => navigate("/guest")} 
          className="px-5 py-2.5 bg-gray-200 dark:bg-[#27391C] text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#18230F] rounded-xl font-semibold shadow-sm transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT FORM */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="bg-[#FFF0AE] dark:bg-[#27391C] p-6 md:p-8 rounded-xl shadow-sm border border-transparent dark:border-gray-800 space-y-8">
            {error && <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium">{error}</div>}
            {success && <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium">Event created successfully! Redirecting...</div>}

            {/* A. Basic Info */}
            <section>
              <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Basic Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Event Title <span className="text-red-500">*</span></label>
                  <input name="title" value={form.title} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" placeholder="e.g. Annual Tech Symposium" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]">
                    <option value="">Select Category</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Competition">Competition</option>
                    <option value="Festival">Festival</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" placeholder="Event details..."></textarea>
                </div>
              </div>
            </section>

            {/* B. Date & Time */}
            <section>
              <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Date & Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date <span className="text-red-500">*</span></label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" />
                </div>
              </div>
            </section>

            {/* C. Location */}
            <section>
              <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Venue <span className="text-red-500">*</span></label>
                  <input name="venue" value={form.venue} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" placeholder="e.g. Main Auditorium" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input name="city" value={form.city} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" placeholder="Cityname" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">University (Auto-filled)</label>
                  <input name="university" value={form.university} disabled className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed dark:border-gray-700" />
                </div>
              </div>
            </section>

            {/* D & E. Additional & Media */}
            <section>
              <h2 className="text-lg font-bold mb-4 border-b border-orange-200 dark:border-gray-700 pb-2">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Max Participants</label>
                  <input type="number" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]" placeholder="100" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mode</label>
                  <select name="mode" value={form.mode} onChange={handleChange} className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#F875AA] dark:focus:outline-[#1F7D53]">
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Event Cover Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-dashed rounded-lg bg-white dark:bg-[#1A1A22] dark:border-gray-600" />
                </div>
              </div>
            </section>

            <div className="pt-4 flex justify-end">
              <button disabled={success} type="submit" className="px-8 py-3 bg-[#F875AA] dark:bg-[#1F7D53] text-white rounded-xl font-bold tracking-wide shadow-sm hover:opacity-90 transition disabled:opacity-50">
                Create Event
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-[#FFF0AE] dark:bg-[#27391C] p-6 rounded-xl shadow-sm border border-transparent dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Live Preview</h2>
            
            <div className="bg-white dark:bg-[#18230F] rounded-2xl overflow-hidden shadow-sm border border-transparent dark:border-gray-700">
              {form.image ? (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-40 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 font-medium">No Image Uploaded</span>
                </div>
              )}
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-[#F875AA]/10 dark:bg-[#1F7D53]/20 text-[#F875AA] dark:text-[#1F7D53] rounded-md uppercase tracking-wider">
                    {form.category || "CATEGORY"}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{form.mode}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                  {form.title || "Untitled Event"}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {form.description || "Add a description to see it here..."}
                </p>
                
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{form.date || "TBD"} {form.startTime && `• ${form.startTime}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{form.venue || "Venue"} {form.city && `, ${form.city}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎓</span>
                    <span>{form.university || "University"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
