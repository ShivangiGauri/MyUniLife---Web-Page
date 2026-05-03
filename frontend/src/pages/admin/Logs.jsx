import { useState, useEffect } from "react";
import { History, ShieldAlert, User, Clock, CheckCircle2, AlertTriangle, Search, Filter } from "lucide-react";
import api from "../../api/api";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [suspicious, setSuspicious] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/admin/logs");
      setLogs(response.data.logs);
      setSuspicious(response.data.suspicious);
    } catch (error) {
      console.error("Error fetching logs:", error);
      // Mock data
      setLogs([
        { id: 1, action: "User Role Changed", performedBy: "Admin", target: "John Doe", timestamp: "2026-05-03T16:20:00Z", type: "update" },
        { id: 2, action: "New Event Created", performedBy: "Coding Club", target: "Hackathon", timestamp: "2026-05-03T15:45:00Z", type: "create" },
        { id: 3, action: "Issue Resolved", performedBy: "Admin", target: "Login Issues", timestamp: "2026-05-03T14:10:00Z", type: "success" },
      ]);
      setSuspicious([
        { id: 101, reason: "Multiple Rapid Logins", user: "User_442", attempts: 15, timestamp: "2026-05-03T16:55:00Z", severity: "high" },
        { id: 102, reason: "Abnormal Action Frequency", user: "Club_Tech", action: "Bulk Event Update", timestamp: "2026-05-03T13:30:00Z", severity: "medium" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Audit Logs & Monitoring</h1>
          <p className="text-slate-500 font-bold">Track every action and monitor system health</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <History className="text-[var(--color-primary)]" size={24} /> Activity Stream
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter logs..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>

            <div className="space-y-6">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      log.type === 'create' ? 'bg-emerald-50 text-emerald-600' :
                      log.type === 'update' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {log.type === 'create' ? <CheckCircle2 size={18} /> : <History size={18} />}
                    </div>
                    <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-700 mt-2 group-last:hidden"></div>
                  </div>
                  <div className="flex-1 pb-6 group-last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-black text-slate-900 dark:text-white">{log.action}</p>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      Performed by <span className="text-[var(--color-primary)] font-bold">{log.performedBy}</span> on <span className="font-bold text-slate-700 dark:text-slate-300">{log.target}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold hover:bg-[var(--bg-primary)] hover:text-[var(--color-primary)] transition-all">
              Load More History
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/20">
            <h3 className="text-xl font-black text-rose-600 mb-6 flex items-center gap-2">
              <ShieldAlert size={24} /> Suspicious Activity
            </h3>
            <div className="space-y-4">
              {suspicious.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-rose-100 dark:border-slate-700 relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-1 h-full ${item.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      item.severity === 'high' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {item.severity} Alert
                    </span>
                    <button className="text-slate-300 hover:text-slate-500 transition"><AlertTriangle size={16} /></button>
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{item.reason}</h4>
                  <p className="text-xs text-slate-500 font-bold">User: {item.user}</p>
                  <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1 font-bold">
                    <Clock size={10} /> {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 p-4 rounded-2xl bg-rose-600 text-white font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition shadow-lg shadow-rose-200 dark:shadow-none">
              Run System Check
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6">Log Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Auto-archive after 30 days", active: true },
                { label: "Detailed performance logs", active: false },
                { label: "Webhook notifications", active: true },
              ].map((setting, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{setting.label}</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${setting.active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${setting.active ? 'left-5.5' : 'left-0.5'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logs;
