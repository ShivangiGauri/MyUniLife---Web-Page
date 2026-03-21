import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleBlockUser = (id) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: user.status === "blocked" ? "active" : "blocked" } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage users, roles, and platform access.</p>
        </div>
      </div>

      <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#B3C8CF] dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-gray-800 dark:text-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-[#89A8B2] focus:border-[#89A8B2] block w-full p-2.5"
                    >
                      <option value="student">Student</option>
                      <option value="club">Club</option>
                      <option value="admin">Admin</option>
                      <option value="guest">Guest</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleBlockUser(user.id)}
                      className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${user.status === 'blocked' ? 'bg-[#89A8B2] text-white hover:bg-[#89A8B2]/90' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    >
                      {user.status === 'blocked' ? 'Unblock' : 'Block User'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
