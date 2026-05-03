import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { getAllUsers } from "../../services/superadminService";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        if (data.success) setUsers(data.users);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = filter === "all" ? users : users.filter(u => u.role === filter);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#D0E8F2] dark:bg-[#1B1A55] p-6 rounded-3xl shadow-md border border-[#79A3B1]/30 dark:border-[#535C91]/50">
        <h1 className="text-3xl font-black text-[#456268] dark:text-[#FCF8EC]">Global Telemetry</h1>
        <div className="flex items-center gap-3 bg-white dark:bg-[#070F2B] p-2 rounded-xl shadow-inner pr-4">
          <div className="bg-[#79A3B1] dark:bg-[#535C91] p-3 rounded-lg text-white"><Filter size={20}/></div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent font-black tracking-wider uppercase focus:outline-none text-[#456268] dark:text-[#FCF8EC] w-full"
          >
            <option value="all">Unfiltered View</option>
            <option value="student">Students</option>
            <option value="club">Clubs</option>
            <option value="admin">Administrators</option>
            <option value="guest">Guests</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#1B1A55] rounded-3xl shadow-2xl overflow-hidden border border-[#79A3B1]/20 dark:border-[#535C91]/30">
        <table className="w-full text-left">
          <thead className="bg-[#79A3B1] dark:bg-[#070F2B] text-white">
            <tr>
              <th className="p-5 font-bold uppercase tracking-wider text-sm">Identity</th>
              <th className="p-5 font-bold uppercase tracking-wider text-sm">Routing Address</th>
              <th className="p-5 font-bold uppercase tracking-wider text-sm">Authority</th>
              <th className="p-5 font-bold uppercase tracking-wider text-sm">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D0E8F2] dark:divide-[#535C91]/30">
            {filteredUsers.map(u => (
              <tr key={u._id} className="hover:bg-[#FCF8EC] dark:hover:bg-[#070F2B]/50 transition duration-200">
                <td className="p-5 font-black text-[#456268] dark:text-[#D0E8F2]">{u.fullName}</td>
                <td className="p-5 font-medium text-[#79A3B1] dark:text-[#9290C3] tracking-wide">{u.email}</td>
                <td className="p-5">
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-[#D0E8F2] text-[#456268] dark:bg-[#535C91]/50 dark:text-[#D0E8F2]'}`}>{u.role}</span>
                </td>
                <td className="p-5 font-bold opacity-60 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-10 text-center uppercase tracking-widest font-black opacity-40">No signal detected in routing layer.</div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
