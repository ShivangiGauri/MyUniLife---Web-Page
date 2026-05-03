import { useEffect, useState } from "react";
import { Users, Shield, Building } from "lucide-react";
import { Card } from "../../components/ui/Card";

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, admins: 0, universities: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const h = { Authorization: `Bearer ${token}` };
        
        const u = await fetch("http://localhost:5000/api/v1/superadmin/users", { headers: h });
        const uData = await u.json();
        
        const a = await fetch("http://localhost:5000/api/v1/superadmin/admins", { headers: h });
        const aData = await a.json();
        
        const un = await fetch("http://localhost:5000/api/v1/superadmin/universities", { headers: h });
        const unData = await un.json();

        if (isMounted) {
          setStats({
            users: uData.users?.length || 0,
            admins: aData.admins?.length || 0,
            universities: unData.universities?.length || 0
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchStats();
    
    return () => { isMounted = false; };
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-xl font-semibold text-slate-500 animate-pulse">Loading Dashboard...</div>
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <Card className="flex items-center gap-6 group">
      <div className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>
        <Icon size={32} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-4xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Global platform analytics and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Total Users" value={stats.users} icon={Users} />
        <StatCard title="System Admins" value={stats.admins} icon={Shield} />
        <StatCard title="Universities" value={stats.universities} icon={Building} />
      </div>
    </div>
  );
}

export default Dashboard;
