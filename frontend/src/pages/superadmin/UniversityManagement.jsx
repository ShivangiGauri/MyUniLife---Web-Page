import { useEffect, useState } from "react";
import { Building, Trash2 } from "lucide-react";
import { getAllUniversities, createUniversity, deleteUniversity } from "../../services/superadminService";

function UniversityManagement() {
  const [univs, setUnivs] = useState([]);
  const [form, setForm] = useState({ name: "", domain: "", location: "" });
  const [loading, setLoading] = useState(false);

  const fetchUnivs = async () => {
    try {
      const data = await getAllUniversities();
      if (data.success) setUnivs(data.universities);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => { fetchUnivs(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUniversity(form);
      setForm({ name: "", domain: "", location: "" });
      fetchUnivs();
    } catch (err) {
      alert(err.message || "Failed to map university network.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("WARNING: Destroy university cluster structure?")) return;
    try {
      await deleteUniversity(id);
      fetchUnivs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black text-[#456268] dark:text-[#FCF8EC]">University Topology</h1>
      
      <form onSubmit={handleCreate} className="bg-[#D0E8F2] dark:bg-[#1B1A55] p-8 rounded-3xl shadow-xl max-w-4xl border-2 border-[#79A3B1]/20 dark:border-[#535C91]">
        <h2 className="text-2xl font-black text-[#456268] dark:text-[#FCF8EC] flex items-center mb-6 gap-3">
          <Building /> Attach Institution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <input type="text" placeholder="Moniker (e.g. MIT)" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="p-4 rounded-xl w-full bg-white dark:bg-[#070F2B] font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#79A3B1]" required />
          <input type="text" placeholder="Global Domain (.edu)" value={form.domain} onChange={e=>setForm({...form, domain: e.target.value})} className="p-4 rounded-xl w-full bg-white dark:bg-[#070F2B] font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#79A3B1]" />
          <input type="text" placeholder="Primary Location" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} className="p-4 rounded-xl w-full bg-white dark:bg-[#070F2B] font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#79A3B1]" />
        </div>
        <button className="bg-[#456268] dark:bg-[#535C91] text-white px-8 py-4 rounded-xl font-black text-lg hover:brightness-110 transition shadow-lg w-full md:w-auto">Map Network</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {univs.map(u => (
          <div key={u._id} className="bg-white dark:bg-[#1B1A55] p-8 rounded-3xl shadow-2xl border border-[#D0E8F2] dark:border-[#535C91] flex flex-col justify-between group hover:-translate-y-2 transition duration-300">
            <div>
              <h3 className="font-black text-2xl mb-1 text-[#456268] dark:text-[#FCF8EC] group-hover:text-[#79A3B1] transition">{u.name}</h3>
              <p className="text-sm font-bold opacity-70 tracking-widest uppercase mb-1">{u.domain || "N/A"}</p>
              <p className="font-medium opacity-80">{u.location || "Undisclosed Campus"}</p>
            </div>
            <button onClick={() => handleDelete(u._id)} className="mt-8 flex items-center justify-center gap-2 w-full p-3 bg-red-50 text-red-600 dark:bg-[#070F2B] dark:text-red-400 font-bold rounded-xl hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition shadow-sm">
              <Trash2 size={18} /> Dismantle Network
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UniversityManagement;
