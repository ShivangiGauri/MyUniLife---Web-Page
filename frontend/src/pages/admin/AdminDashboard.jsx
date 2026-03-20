// src/pages/admin/AdminDashboard.jsx

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Events</h2>
          <p className="text-3xl mt-2">24</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Active Clubs</h2>
          <p className="text-3xl mt-2">12</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Participants</h2>
          <p className="text-3xl mt-2">340</p>
        </div>
      </div>
    </div>
  );
}