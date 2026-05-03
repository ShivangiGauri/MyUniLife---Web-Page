import { useState, useEffect } from "react";
import { Search, UserPlus, MoreVertical, Edit2, Trash2, ShieldCheck, User } from "lucide-react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback/Mock
      setUsers([
        { id: 1, name: "John Doe", email: "john@test.edu", role: "student", status: "active" },
        { id: 2, name: "Coding Club", email: "coding@test.edu", role: "club", status: "active" },
        { id: 3, name: "Jane Smith", email: "jane@test.edu", role: "student", status: "inactive" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "student" ? "club" : "student";
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      alert("Failed to change role");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 font-bold">Managing members of {currentUser?.universityName}</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:scale-105 transition-all">
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="flex-1 sm:w-40 py-3 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)]">
              <option>All Roles</option>
              <option>Students</option>
              <option>Clubs</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <tr><td colSpan="4" className="p-10 text-center font-bold text-slate-400">Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="4" className="p-10 text-center font-bold text-slate-400">No users found</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center text-[var(--color-primary)] font-black">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'club' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleRole(user.id, user.role)}
                        title={`Promote to ${user.role === 'student' ? 'Club' : 'Student'}`}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      >
                        <ShieldCheck size={18} />
                      </button>
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <p className="text-sm text-slate-500 font-bold">Showing {filteredUsers.length} of {users.length} users</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold disabled:opacity-50">Previous</button>
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
