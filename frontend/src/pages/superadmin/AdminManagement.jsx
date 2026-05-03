import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, UserPlus, Building, ShieldCheck, Lock } from "lucide-react";
import { getAllAdmins, createAdmin, deleteAdmin, getAllUniversities } from "../../services/superadminService";

function AdminManagement() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [form, setForm] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    universityId: "",
    passphrase: "" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Role Protection
    const role = localStorage.getItem("role");
    if (role !== "superadmin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const adminData = await getAllAdmins();
      if (adminData.success) setAdmins(adminData.admins || []);

      const uniData = await getAllUniversities();
      if (uniData.success) setUniversities(uniData.universities || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.universityId) {
      alert("Please select a university to assign this admin.");
      return;
    }

    try {
      setLoading(true);
      const data = await createAdmin(form);
      if (data.success) {
        alert("Admin provisioned successfully!");
        setForm({ fullName: "", email: "", password: "", universityId: "", passphrase: "" });
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to assign admin role.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("WARNING: Irrevocably destroy this Admin profile?")) return;
    try {
      await deleteAdmin(id);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white">Admin Provisioning</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Security Control Center</p>
      </div>
      
      <form onSubmit={handleCreate} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl border-b-8 border-indigo-600/20 dark:border-indigo-500/20">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center mb-8 gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
            <UserPlus size={24} />
          </div>
          Register New Admin Operator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <input type="text" placeholder="e.g. John Smith" value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})} className="p-4 rounded-2xl w-full bg-slate-50 dark:bg-slate-900 border-none font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Email</label>
            <input type="email" placeholder="admin@domain.com" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="p-4 rounded-2xl w-full bg-slate-50 dark:bg-slate-900 border-none font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assigned University</label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                value={form.universityId} 
                onChange={e=>setForm({...form, universityId: e.target.value})} 
                className="p-4 pl-12 rounded-2xl w-full bg-slate-50 dark:bg-slate-900 border-none font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none appearance-none"
                required
              >
                <option value="">Select University...</option>
                {(universities || []).map(uni => (
                  <option key={uni?.id} value={uni?.id}>{uni?.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Admin Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className="p-4 rounded-2xl w-full bg-slate-50 dark:bg-slate-900 border-none font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none" required minLength={6} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Security Passphrase (Optional)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="password" placeholder="System Passphrase" value={form.passphrase} onChange={e=>setForm({...form, passphrase: e.target.value})} className="p-4 pl-12 rounded-2xl w-full bg-slate-50 dark:bg-slate-900 border-none font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none" />
            </div>
          </div>
        </div>

        <button disabled={loading} className="bg-indigo-600 dark:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 transition-all w-full md:w-auto disabled:opacity-50">
          {loading ? "Processing..." : "Complete Provisioning"}
        </button>
      </form>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
        <div className="p-6 border-b border-slate-50 dark:border-slate-700">
          <h3 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" /> Active System Administrators
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <th className="p-6 font-black uppercase tracking-widest text-[10px] text-slate-400">Operator</th>
                <th className="p-6 font-black uppercase tracking-widest text-[10px] text-slate-400">Assigned Campus</th>
                <th className="p-6 font-black uppercase tracking-widest text-[10px] text-slate-400">Communication</th>
                <th className="p-6 font-black uppercase tracking-widest text-[10px] text-slate-400 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {(admins || []).map(admin => (
                <tr key={admin?.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-700/30 transition duration-200 group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-black text-indigo-600">
                        {(admin?.fullName || "?")[0].toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-white">{admin?.fullName}</span>
                    </div>
                  </td>
                  <td className="p-6 font-black text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-wider">{admin?.universityName || "N/A"}</td>
                  <td className="p-6 font-bold text-slate-500 dark:text-slate-400 text-sm">{admin?.email}</td>
                  <td className="p-6 text-right">
                    <button onClick={() => handleDelete(admin.id)} className="p-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {(!admins || admins.length === 0) && (
                <tr><td colSpan="4" className="p-10 text-center font-bold text-slate-400">No administrators found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminManagement;
