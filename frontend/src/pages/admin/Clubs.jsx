import { useState, useEffect } from "react";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedClubs = JSON.parse(localStorage.getItem("admin_clubs")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    if (savedClubs.length === 0) {
      savedClubs.push({
        id: 1,
        name: "Tech Club",
        presidentId: 2,
        members: 15
      });
      savedClubs.push({
        id: 2,
        name: "Art Club",
        presidentId: null,
        members: 8
      });
      localStorage.setItem("admin_clubs", JSON.stringify(savedClubs));
    }

    setClubs(savedClubs);
    // user subset that can be president
    setUsers(savedUsers);
  }, []);

  const handleChangePresident = (clubId, newPresidentId) => {
    const updatedClubs = clubs.map(c => 
      c.id === clubId ? { ...c, presidentId: Number(newPresidentId) } : c
    );
    setClubs(updatedClubs);
    localStorage.setItem("admin_clubs", JSON.stringify(updatedClubs));
  };

  const getPresidentName = (presidentId) => {
    const user = users.find(u => u.id === presidentId);
    return user ? user.name : "No President Assigned";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Club Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage clubs and assign presidents.</p>
        </div>
      </div>

      <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#B3C8CF] dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Club Name</th>
                <th className="p-4 font-semibold">President</th>
                <th className="p-4 font-semibold">Members</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-gray-800 dark:text-gray-200">
              {clubs.map((club) => (
                <tr key={club.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{club.name}</td>
                  <td className="p-4">{getPresidentName(club.presidentId)}</td>
                  <td className="p-4">{club.members}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <select 
                      value={club.presidentId || ""} 
                      onChange={(e) => handleChangePresident(club.id, e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-[#89A8B2] focus:border-[#89A8B2] block p-2.5 max-w-[200px]"
                    >
                      <option value="">Assign President...</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {clubs.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No clubs found.
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
