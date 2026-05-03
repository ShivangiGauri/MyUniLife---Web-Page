import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar } from "lucide-react";
import api from "../../api/api";

function Analytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    userGrowth: [],
    eventParticipation: [],
    activeVsInactive: []
  });

  useEffect(() => {
    // Role Protection
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }
    fetchAnalytics();
  }, [navigate]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/admin/analytics");
      setData(response.data || { userGrowth: [], eventParticipation: [], activeVsInactive: [] });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Fallback/Mock
      setData({
        userGrowth: [
          { month: 'Jan', students: 400, clubs: 24 },
          { month: 'Feb', students: 520, clubs: 28 },
          { month: 'Mar', students: 680, clubs: 35 },
          { month: 'Apr', students: 850, clubs: 42 },
          { month: 'May', students: 1100, clubs: 50 },
        ],
        eventParticipation: [
          { name: 'Hackathon', participants: 450 },
          { name: 'Sports Day', participants: 600 },
          { name: 'Career Fair', participants: 300 },
          { name: 'Music Fest', participants: 800 },
          { name: 'Art Expo', participants: 200 },
        ],
        activeVsInactive: [
          { name: 'Active', value: 850, color: '#285A48' },
          { name: 'Inactive', value: 250, color: '#cbd5e1' },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Performance Analytics</h1>
          <p className="text-slate-500 font-bold">In-depth insights into university engagement</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
            <Calendar size={18} />
            <span>Custom Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#285A48] text-white rounded-xl font-bold shadow-lg shadow-[#285A48]/20 hover:scale-105 transition">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">User Growth Trend</h3>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.userGrowth || []}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#285A48" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#285A48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="students" stroke="#285A48" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
                <Area type="monotone" dataKey="clubs" stroke="#408A71" strokeWidth={4} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Active vs Inactive</h3>
          <div style={{ width: "100%", height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.activeVsInactive || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(data.activeVsInactive || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color || '#cbd5e1'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            {(data.activeVsInactive || []).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item?.color}}></div>
                  <span className="text-sm font-bold text-slate-500">{item?.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white">{item?.value} Users</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Event Participation</h3>
          <div style={{ width: "100%", height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.eventParticipation || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} width={100} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="participants" fill="#285A48" radius={[0, 6, 6, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
