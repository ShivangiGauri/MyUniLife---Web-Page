import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import api from "../../api/api";

function Logs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [suspicious, setSuspicious] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Role Protection
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }
    fetchLogs();
  }, [navigate]);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/admin/logs");
      setLogs(response.data.logs || []);
      setSuspicious(response.data.suspicious || []);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
      setSuspicious([]);
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
                <History className="text-[#285A48]" size={24} /> Activity Stream
              </h3>
            </div>

            <div className="space-y-6">
              {(logs || []).map((log) => (
                <div key={log.id} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-700 mt-2 group-last:hidden"></div>
                  </div>
                  <div className="flex-1 pb-6 group-last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-black text-slate-900 dark:text-white">{log?.action}</p>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {log?.timestamp ? new Date(log.timestamp).toLocaleTimeString() : "Recent"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      Performed by <span className="text-[#285A48] font-bold">{log?.performedBy}</span>
                    </p>
                  </div>
                </div>
              ))}
              {(!logs || logs.length === 0) && (
                <p className="text-center py-10 font-bold text-slate-400">No activity logs recorded.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-3xl border border-rose-100 dark:border-rose-900/20">
            <h3 className="text-xl font-black text-rose-600 mb-6 flex items-center gap-2">
              <ShieldAlert size={24} /> Suspicious Activity
            </h3>
            <div className="space-y-4">
              {(suspicious || []).map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-rose-100 dark:border-slate-700 relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-1 h-full ${item?.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{item?.reason}</h4>
                  <p className="text-xs text-slate-500 font-bold">User: {item?.user}</p>
                  <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1 font-bold">
                    <Clock size={10} /> {item?.timestamp ? new Date(item.timestamp).toLocaleString() : "Recent"}
                  </p>
                </div>
              ))}
              {(!suspicious || suspicious.length === 0) && (
                <p className="text-center py-5 font-bold text-rose-400 opacity-50 text-xs uppercase tracking-widest">No threats detected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logs;
