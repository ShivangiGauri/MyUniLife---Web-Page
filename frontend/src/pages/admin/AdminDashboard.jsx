import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalEvents: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];
    
    // Add some mock data if empty for demo purposes
    if (users.length === 0) {
      users.push({ id: 1, name: "Admin User", email: "admin@myunilife.com", role: "admin", status: "active" });
      users.push({ id: 2, name: "John Doe", email: "john@student.edu", role: "student", status: "active" });
      users.push({ id: 3, name: "Tech Club", email: "tech@club.edu", role: "club", status: "blocked" });
      localStorage.setItem("users", JSON.stringify(users));
    }

    if (events.length === 0) {
      events.push({ id: 1, title: "Hackathon 2026", creator: "Tech Club", status: "pending" });
      events.push({ id: 2, title: "Art Exhibition", creator: "Art Club", status: "approved" });
      localStorage.setItem("events", JSON.stringify(events));
    }

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status !== "blocked").length;
    const totalEvents = events.length;
    const pendingEvents = events.filter(e => e.status === "pending").length;

    setStats({
      totalUsers,
      activeUsers,
      totalEvents,
      pendingRequests: pendingEvents
    });
  }, []);

  const Card = ({ title, value, icon }) => (
    <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl p-6 shadow-sm hover:scale-105 transition duration-200 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      </div>
      <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl text-[#89A8B2]">
        {icon}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Platform statistics and pending actions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <Card 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <Card 
          title="Total Events" 
          value={stats.totalEvents} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <Card 
          title="Pending Requests" 
          value={stats.pendingRequests} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}