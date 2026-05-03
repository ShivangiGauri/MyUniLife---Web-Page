import { useState, useEffect } from "react";
import { Users, Calendar, AlertCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import api from "../../api/api";

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-black ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}%
        </div>
      )}
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{value}</p>
  </div>
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    issues: 0,
    activeUsers: 0
  });

  const [chartData, setChartData] = useState([]);
  const [topClubs, setTopClubs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/admin/dashboard-stats");
      setStats(response.data.stats);
      setChartData(response.data.chartData);
      setTopClubs(response.data.topClubs);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Mock data for UI development
      setStats({ users: 1240, events: 45, issues: 12, activeUsers: 850 });
      setChartData([
        { name: 'Mon', users: 400, events: 24 },
        { name: 'Tue', users: 300, events: 13 },
        { name: 'Wed', users: 200, events: 98 },
        { name: 'Thu', users: 278, events: 39 },
        { name: 'Fri', users: 189, events: 48 },
        { name: 'Sat', users: 239, events: 38 },
        { name: 'Sun', users: 349, events: 43 },
      ]);
      setTopClubs([
        { name: "Tech Innovators", events: 12, participation: 450 },
        { name: "Eco Warriors", events: 8, participation: 320 },
        { name: "Cultural Hub", events: 15, participation: 280 }
      ]);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.users} icon={Users} trend="up" trendValue={12} color="bg-blue-500" />
        <StatCard title="Live Events" value={stats.events} icon={Calendar} trend="up" trendValue={5} color="bg-purple-500" />
        <StatCard title="Pending Issues" value={stats.issues} icon={AlertCircle} trend="down" trendValue={2} color="bg-amber-500" />
        <StatCard title="Active Now" value={stats.activeUsers} icon={TrendingUp} trend="up" trendValue={8} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Growth Overview</h3>
            <select className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-xs font-bold p-2 text-slate-500 focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="users" fill="var(--color-primary)" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Top Performing Clubs</h3>
          <div className="space-y-6">
            {topClubs.map((club, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-slate-500 group-hover:bg-[var(--bg-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-[var(--color-primary)] transition-colors">{club.name}</p>
                    <p className="text-xs text-slate-500">{club.events} Events this month</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 dark:text-white">{club.participation}</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Participants</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold hover:bg-[var(--bg-primary)] hover:text-[var(--color-primary)] transition-all">
            View All Performance Metrics
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
