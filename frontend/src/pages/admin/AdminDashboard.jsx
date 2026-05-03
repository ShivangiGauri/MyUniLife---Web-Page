import { useState, useEffect } from "react";
import { Card } from "../../components/ui/Card";
import { Users, UserCheck, Calendar, Clock } from "lucide-react";

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

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="flex items-center justify-between group">
      <div>
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
      </div>
      <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>
        <Icon size={24} />
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Platform statistics and pending actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={Users}
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={UserCheck}
        />
        <StatCard 
          title="Total Events" 
          value={stats.totalEvents} 
          icon={Calendar}
        />
        <StatCard 
          title="Pending Requests" 
          value={stats.pendingRequests} 
          icon={Clock}
        />
      </div>
    </div>
  );
}
