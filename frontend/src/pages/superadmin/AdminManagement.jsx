import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Trash2, UserPlus } from "lucide-react";

function AdminManagement() {
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const fetchAdmins = async () => {
    const res = await fetch("http://localhost:5000/api/v1/superadmin/admins", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.success) setAdmins(data.admins);
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/superadmin/create-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ fullName: "", email: "", password: "" });
      fetchAdmins();
    } else {
      alert("Failed to assign admin role.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("WARNING: Irrevocably destroy this Admin profile?")) return;
    await fetch(`http://localhost:5000/api/v1/superadmin/delete-admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchAdmins();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black text-[#456268] dark:text-[#FCF8EC]">Admin Management</h1>
      
      <form onSubmit={handleCreate} className="bg-[#D0E8F2] dark:bg-[#1B1A55] p-8 rounded-3xl shadow-xl max-w-4xl border-2 border-[#79A3B1]/20 dark:border-[#535C91]">
        <h2 className="text-2xl font-black text-[#456268] dark:text-[#FCF8EC] flex items-center mb-6 gap-3">
          <UserPlus /> Provision New Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <input type="text" placeholder="Admin Legal Name" value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})} className="p-4 rounded-xl w-full bg-white dark:bg-[#070F2B] font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#79A3B1]" required />
          <input type="email" placeholder="Secure Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="p-4 rounded-xl w-full bg-white dark:bg-[#070F2B] font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#79A3B1]" required />
          <input type="password" placeholder="Passphrase" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className="p-4 rounded-xl w-full bg-white dark:bg-[#070F2B] font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#79A3B1]" required minLength={6} />
        </div>
        <button className="bg-[#456268] dark:bg-[#535C91] text-white px-8 py-4 rounded-xl font-black text-lg hover:brightness-110 transition shadow-lg w-full md:w-auto">Confirm Assignment</button>
      </form>

      <div className="bg-white dark:bg-[#1B1A55] rounded-3xl shadow-2xl overflow-hidden border border-[#D0E8F2] dark:border-[#535C91]">
        <table className="w-full text-left">
          <thead className="bg-[#79A3B1] dark:bg-[#070F2B] text-white">
            <tr>
              <th className="p-5 font-bold uppercase tracking-wider text-sm">Operator Name</th>
              <th className="p-5 font-bold uppercase tracking-wider text-sm">Security Comm</th>
              <th className="p-5 font-bold uppercase tracking-wider text-sm text-center">Terminal Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D0E8F2] dark:divide-[#535C91]/30">
            {admins.map(admin => (
              <tr key={admin._id} className="hover:bg-[#FCF8EC] dark:hover:bg-[#070F2B]/50 transition duration-200">
                <td className="p-5 font-black text-[#456268] dark:text-[#D0E8F2]">{admin.fullName}</td>
                <td className="p-5 font-semibold text-[#79A3B1] dark:text-[#9290C3]">{admin.email}</td>
                <td className="p-5 text-center">
                  <button onClick={() => handleDelete(admin._id)} className="p-3 bg-red-100/50 text-red-600 hover:bg-red-500 hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white rounded-xl transition shadow-sm font-bold flex items-center gap-2 mx-auto">
                    <Trash2 size={18} /> Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManagement;
