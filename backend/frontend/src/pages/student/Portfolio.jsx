import { useState, useEffect } from "react";
import { events } from "../../data/events.js";
import { useAuth } from "../../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import SearchableSelect from "../../components/SearchableSelect";
import ContactModal from "../../components/ContactModal";

function Portfolio() {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [projects, setProjects] = useState([]);

  // Profile State
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  // New Project Form State
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "", image: "" });

  useEffect(() => {
    setRegisteredEvents(JSON.parse(localStorage.getItem("registeredEvents")) || []);
    setSavedEvents(JSON.parse(localStorage.getItem("savedEvents")) || []);
    setGallery(JSON.parse(localStorage.getItem("portfolioGallery")) || []);
    setProjects(JSON.parse(localStorage.getItem("portfolioProjects")) || []);

    const storedUser = user || {};
    const defaultUser = {
      fullName: storedUser.fullName || "John Doe",
      university: storedUser.university || "Your University",
      branch: storedUser.branch || "",
      studyYear: storedUser.studyYear || "Year 1",
      address: storedUser.address || "",
      bio: storedUser.bio || "Passionate software engineer and enthusiast.",
      socialLinks: storedUser.socialLinks || { linkedin: "", github: "", leetcode: "", unstop: "", other: "" }
    };
    
    setUserProfile(defaultUser);
    setEditForm(defaultUser);
  }, []);

  const saveProfile = (e) => {
    e.preventDefault();
    setUserProfile(editForm);
    localStorage.setItem("currentUser", JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleSocialChange = (key, value) => {
    setEditForm({
      ...editForm,
      socialLinks: { ...editForm.socialLinks, [key]: value }
    });
  };

  const registeredList = events.filter(e => registeredEvents.includes(e.id));

  // Analytics Helpers
  function getFrequencyMap(arr, key) {
    const map = {};
    arr.forEach(item => {
      const value = item[key];
      if (value) map[value] = (map[value] || 0) + 1;
    });
    return Object.entries(map).map(([k,v]) => ({ name: k, value: v }));
  }

  const categoryData = getFrequencyMap(registeredList, "category");
  const cityData = getFrequencyMap(registeredList, "city").map(item => ({ city: item.name, count: item.value }));

  const getTop = (arr) => arr.length > 0 ? arr.reduce((a, b) => a.value > b.value ? a : b).name : "N/A";
  const getTopCity = (arr) => arr.length > 0 ? arr.reduce((a, b) => a.count > b.count ? a : b).city : "N/A";

  const topCategory = getTop(categoryData);
  const topCity = getTopCity(cityData);

  function generateSummary(data) {
    return `You are an active ${data.studyYear} student from ${data.university} with strong participation in ${data.topCategory !== "N/A" ? data.topCategory : "various"} events. You have attended ${data.totalEvents} events, primarily in ${data.topCity !== "N/A" ? data.topCity : "multiple locations"}, showing consistent engagement in competitive and technical activities.`;
  }

  const aiSummary = generateSummary({
    studyYear: userProfile.studyYear,
    university: userProfile.university,
    topCategory,
    topCity,
    totalEvents: registeredEvents.length
  });

  const timelineEvents = [...registeredList].sort((a,b) => new Date(a.startDate || a.date) - new Date(b.startDate || b.date));

  // Colors for PieChart
  const COLORS = ['#9F7AEA', '#F6C1D9', '#38BDF8', '#34D399', '#FBBF24'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...gallery, reader.result];
        setGallery(updated);
        localStorage.setItem("portfolioGallery", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem("portfolioProjects", JSON.stringify(updated));
    setNewProject({ title: "", description: "", image: "" });
    setShowProjectForm(false);
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProject({ ...newProject, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen text-[#333333] dark:text-[#F5F5F5] pb-16 px-2">
      
      {/* 2. PROFILE HEADER */}
      <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 mx-auto max-w-7xl mt-6 relative hover:scale-[1.01] transition duration-200">
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-[#F08B51] dark:bg-[#BB8493] rounded-full flex items-center justify-center text-white text-3xl font-bold uppercase">
          {userProfile.fullName ? userProfile.fullName.substring(0,2) : "JD"}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{userProfile.fullName}</h1>
          <p className="text-sm opacity-80 mb-4 max-w-xl">
            {userProfile.bio}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
            <span className="px-3 py-1 bg-[#F08B51]/20 text-[#F08B51] rounded-full text-xs font-semibold">
              {registeredEvents.length} Events
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              0 Wins
            </span>
            <span className="px-3 py-1 bg-[#333333]/10 dark:bg-[#F5F5F5]/10 rounded-full text-xs font-semibold">
              {savedEvents.length} Saved
            </span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
            <button onClick={() => setIsEditing(true)} className="px-5 py-2 rounded-xl text-sm font-medium border border-[#333333]/20 hover:bg-[#333333]/5 dark:border-[#F5F5F5]/20 dark:hover:bg-[#F5F5F5]/5 transition">
              Edit Profile
            </button>
            <button onClick={() => setIsContactOpen(true)} className="px-5 py-2 rounded-xl text-sm font-bold bg-[#F08B51] text-white hover:bg-[#BB6653] dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0] transition">
              Message User
            </button>
          </div>
        </div>
      </div>
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} receiverEmail={userProfile.universityEmail || "sample@university.edu"} />

      <div className="max-w-7xl mx-auto space-y-12">

        {/* 3. SMART INSIGHTS & AI SUMMARY */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Smart Insights</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-[#DEE8CE] dark:bg-[#704264] shadow-sm hover:scale-105 transition duration-200">
              <h3 className="text-sm opacity-70 mb-1">Events Attended</h3>
              <p className="text-2xl font-bold">{registeredEvents.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#DEE8CE] dark:bg-[#704264] shadow-sm hover:scale-105 transition duration-200">
              <h3 className="text-sm opacity-70 mb-1">Saved Events</h3>
              <p className="text-2xl font-bold">{savedEvents.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#DEE8CE] dark:bg-[#704264] shadow-sm hover:scale-105 transition duration-200">
              <h3 className="text-sm opacity-70 mb-1">Top Category</h3>
              <p className="text-xl font-bold truncate">{topCategory}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#DEE8CE] dark:bg-[#704264] shadow-sm hover:scale-105 transition duration-200">
              <h3 className="text-sm opacity-70 mb-1">Top City</h3>
              <p className="text-xl font-bold truncate">{topCity}</p>
            </div>
          </div>

          <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl border-l-4 border-[#F08B51] dark:border-[#BB8493] shadow-sm mb-8 hover:scale-[1.01] transition duration-200">
            <h3 className="text-lg font-bold text-[#F08B51] dark:text-[#DBAFA0] mb-2 flex items-center gap-2">
              <span className="text-xl">✨</span> AI Summary
            </h3>
            <p className="text-[#333333] dark:text-[#F5F5F5] opacity-90 font-medium leading-relaxed">
              {aiSummary}
            </p>
          </div>
        </section>

        {/* 4. ANALYTICS (GRAPHS) */}
        {registeredList.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl shadow-sm hover:scale-[1.02] transition duration-200">
                <h3 className="text-lg font-bold mb-4 text-center">Category Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl shadow-sm hover:scale-[1.02] transition duration-200">
                <h3 className="text-lg font-bold mb-4 text-center">Location Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cityData}>
                      <XAxis dataKey="city" stroke="#8884d8" />
                      <YAxis />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="count" fill="#F08B51" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* TIMELINE */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Activity Timeline</h3>
          {timelineEvents.length > 0 ? (
            <div className="border-l-2 border-[#BB6653] dark:border-[#DBAFA0] pl-4 space-y-6 ml-2">
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative">
                  <div className="absolute w-3 h-3 bg-[#F08B51] dark:bg-[#BB8493] rounded-full -left-[23px] top-1.5"></div>
                  <h4 className="text-lg font-semibold">{event.title}</h4>
                  <p className="text-sm opacity-70">{event.startDate || event.date} • {event.university}</p>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-gray-500 dark:text-gray-400">No events added to timeline.</p>
          )}
        </section>

        {/* CREATIVE SHOWCASE - GALLERY */}
        <section>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Showcase Gallery</h2>
            <label className="cursor-pointer px-4 py-2 bg-[#F08B51] dark:bg-[#BB8493] text-white text-sm rounded-xl font-medium hover:opacity-90 transition shadow-sm">
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {gallery.length === 0 ? (
            <div className="p-8 text-center bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl border border-transparent opacity-70">
              No items added yet. Click upload to showcase your journey.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((img, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden shadow-sm aspect-video bg-[#333333]/10 dark:bg-[#F5F5F5]/10">
                  <img src={img} alt={`Gallery item ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-end justify-start p-4">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition duration-300 font-medium translate-y-2 group-hover:translate-y-0">
                      Showcase Item #{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CREATIVE SHOWCASE - PROJECTS */}
        <section>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button onClick={() => setShowProjectForm(!showProjectForm)} className="px-4 py-2 bg-[#F08B51] hover:bg-[#BB6653] dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0] text-white rounded-xl text-sm font-medium transition">
              + Add Project
            </button>
          </div>

          {showProjectForm && (
            <form onSubmit={handleProjectSubmit} className="mb-8 p-6 bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl shadow-sm border border-transparent space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} type="text" className="w-full p-2 border border-gray-300 dark:border-[#49243E] rounded-lg bg-white dark:bg-[#49243E] focus:ring-1 focus:ring-[#F08B51] outline-none transition" placeholder="Project title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full p-2 border border-gray-300 dark:border-[#49243E] rounded-lg bg-white dark:bg-[#49243E] focus:ring-1 focus:ring-[#F08B51] outline-none transition" rows="3" placeholder="What did you build?"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image (Optional)</label>
                <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="w-full text-sm opacity-70 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#F08B51]/20 file:text-[#F08B51] hover:file:bg-[#F08B51]/30 rounded-lg" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowProjectForm(false)} className="px-4 py-2 rounded-lg text-sm border border-transparent hover:border-[#333333]/20">Cancel</button>
                <button type="submit" className="px-8 py-2 rounded-lg text-sm font-semibold bg-[#F08B51] dark:bg-[#BB8493] text-white hover:opacity-90 shadow-sm">Save Project</button>
              </div>
            </form>
          )}

          {projects.length === 0 ? (
            <div className="p-8 text-center bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl opacity-70 border border-transparent">
              No projects added yet. Start adding your hackathon builds!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, i) => (
                <div key={i} className="bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl shadow-sm overflow-hidden hover:scale-105 transition duration-200">
                  {proj.image && (
                    <div className="h-44 w-full overflow-hidden bg-white/20 dark:bg-black/20">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                    <p className="opacity-80 text-sm leading-relaxed">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFF8E8] dark:bg-[#49243E] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input required value={editForm.fullName || ""} onChange={e => setEditForm({...editForm, fullName: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-white dark:bg-[#704264] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">University</label>
                  <input required value={editForm.university || ""} onChange={e => setEditForm({...editForm, university: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-white dark:bg-[#704264] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Branch</label>
                  <SearchableSelect
                    options={[
                      "Computer Science","Information Technology","AI & ML",
                      "Data Science","Electronics","Mechanical",
                      "Civil","Electrical","Biotechnology",
                      "Chemical","Aerospace"
                    ]}
                    value={editForm.branch || ""}
                    onChange={(val) => setEditForm({...editForm, branch: val})}
                    placeholder="Select or type branch"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Course</label>
                  <SearchableSelect
                    options={[
                      "BTech","MTech","BCA","MCA","BSc","MSc",
                      "MBA","BBA","BA","MA","PhD","Diploma"
                    ]}
                    value={editForm.course || ""}
                    onChange={(val) => setEditForm({...editForm, course: val})}
                    placeholder="Select or type course"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Study Year</label>
                  <SearchableSelect
                    options={["1","2","3","4","5","6"]}
                    value={editForm.studyYear || ""}
                    onChange={(val) => setEditForm({...editForm, studyYear: val})}
                    placeholder="Select year"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input value={editForm.address || ""} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-white dark:bg-[#704264] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea required value={editForm.bio || ""} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-white dark:bg-[#704264] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" rows="3"></textarea>
              </div>

              <h3 className="text-lg font-bold mt-6 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["linkedin", "github", "leetcode", "unstop", "other"].map(social => (
                  <div key={social}>
                    <label className="block text-sm font-medium mb-1 capitalize">{social}</label>
                    <input value={editForm.socialLinks?.[social] || ""} onChange={e => handleSocialChange(social, e.target.value)} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-white dark:bg-[#704264] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" placeholder={`https://${social}.com/...`} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#333333]/20 dark:border-transparent">
                <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-xl text-sm font-medium border border-[#333333]/30 dark:border-[#F5F5F5]/30 hover:bg-[#333333]/10 dark:hover:bg-[#F5F5F5]/10 transition">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl text-sm font-semibold bg-[#F08B51] text-white dark:bg-[#BB8493] hover:opacity-90 shadow-sm transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Portfolio;
