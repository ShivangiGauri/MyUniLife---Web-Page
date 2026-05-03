import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { events as defaultEvents } from "../../data/events.js";
import { useAuth } from "../../context/AuthContext";

export default function CreateClubEvent() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    mode: "Offline",
    category: "",
    maxParticipants: "",
    registrationDeadline: "",
    image: ""
  });

  useEffect(() => {
    const user = authUser || {};
    setCurrentUser(user);
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
      setError("Please fill in required fields (Title, Date, Venue).");
      return;
    }

    const savedEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;
    
    const newEvent = {
      ...form,
      id: Date.now().toString(),
      createdBy: "club",
      university: currentUser.university || "",
      lifecycle: new Date(form.date) > new Date() ? "upcoming" : "ongoing",
      startDate: form.date,
      startTime: form.time
    };

    const updatedEvents = [...savedEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    setSuccess(true);
    setTimeout(() => {
      navigate("/club");
    }, 1500);
  };

  const inputClass = "w-full p-3 bg-white dark:bg-[#1A1A1D] border border-gray-300 dark:border-[#6A1E55] rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E7DBE] dark:focus:ring-[#A64D79] transition-all shadow-sm";
  const labelClass = "block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wide";
  const sectionClass = "bg-[#F4F8D3] dark:bg-[#3B1C32] p-6 md:p-8 rounded-2xl shadow-sm border border-white/60 dark:border-white/5 space-y-6";
  const sectionTitleClass = "text-xl font-black mb-4 pb-2 border-b border-[#A6D6D6]/50 dark:border-[#6A1E55]/50 text-[#8E7DBE] dark:text-[#A64D79]";

  return (
    <div className="min-h-screen p-6 md:p-10 flex justify-center text-gray-800 dark:text-gray-200">
      
      <div className="w-full max-w-3xl space-y-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 text-[#8E7DBE] dark:text-[#A64D79]">Create New Event</h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Launch your next massive club experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {error && <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl font-semibold text-center">{error}</div>}
          {success && <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl font-semibold text-center">Event successfully published! Redirecting...</div>}

          {/* 1. BASIC INFO */}
          <div className={sectionClass}>
            <h2 className={sectionTitleClass}>1. Basic Info</h2>
            <div>
              <label className={labelClass}>Event Title <span className="text-red-500">*</span></label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="e.g. Annual Tech Symposium" />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" className={inputClass} placeholder="Outline the main attractions..."></textarea>
            </div>
          </div>

          {/* 2. EVENT DETAILS */}
          <div className={sectionClass}>
             <h2 className={sectionTitleClass}>2. Event Details</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Date <span className="text-red-500">*</span></label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Time</label>
                  <input type="time" name="time" value={form.time} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Venue <span className="text-red-500">*</span></label>
                  <input type="text" name="venue" value={form.venue} onChange={handleChange} className={inputClass} placeholder="e.g. Main Auditorium" />
                </div>
                <div>
                  <label className={labelClass}>Mode</label>
                  <select name="mode" value={form.mode} onChange={handleChange} className={inputClass}>
                    <option value="Offline">Offline (In-Person)</option>
                    <option value="Online">Online (Virtual)</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
             </div>
          </div>

          {/* 3. ADVANCED SETTINGS */}
          <div className={sectionClass}>
             <h2 className={sectionTitleClass}>3. Advanced Settings</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                    <option value="">Select Category</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Competition">Competition</option>
                    <option value="Festival">Festival</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Max Participants</label>
                  <input type="number" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} className={inputClass} placeholder="e.g. 150" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Registration Deadline</label>
                  <input type="date" name="registrationDeadline" value={form.registrationDeadline} onChange={handleChange} className={inputClass} />
                </div>
             </div>
          </div>

          {/* 4. MEDIA */}
          <div className={sectionClass}>
             <h2 className={sectionTitleClass}>4. Media</h2>
             <div>
               <label className={labelClass}>Upload Banner Image</label>
               <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-[#6A1E55] rounded-xl bg-white dark:bg-[#1A1A1D]" />
             </div>
             
             {form.image && (
               <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-white/40 dark:border-white/5">
                 <img src={form.image} alt="Banner Preview" className="w-full h-48 object-cover" />
               </div>
             )}
          </div>

          <div className="pt-4 pb-12">
            <button 
              disabled={success}
              type="submit" 
              className="w-full py-4 text-center bg-[#8E7DBE] dark:bg-[#6A1E55] text-white rounded-xl font-black text-lg tracking-wider hover:opacity-90 hover:scale-[1.01] transition-all duration-300 shadow-md disabled:opacity-50">
              Create Event
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
