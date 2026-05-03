import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Clock, MessageSquare, Search, Filter, MoreVertical } from "lucide-react";
import api from "../../api/api";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await api.get("/admin/issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
      // Mock data
      setIssues([
        { id: 1, title: "Event Approval Delay", description: "Tech Club event has been pending for 3 days.", reportedBy: "Alex Chen", date: "2026-05-02T14:30:00Z", status: "open" },
        { id: 2, title: "Login Issues", description: "Multiple students reporting 401 errors on login.", reportedBy: "Sarah Miller", date: "2026-05-01T10:15:00Z", status: "resolved", resolutionNote: "Fixed authentication middleware issue." },
        { id: 3, title: "Venue Conflict", description: "Auditorium booked for two clubs at the same time.", reportedBy: "James Wilson", date: "2026-05-03T09:00:00Z", status: "open" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resolveIssue = async (id, note) => {
    try {
      await api.patch(`/admin/issues/${id}/resolve`, { note });
      setIssues(issues.map(i => i.id === id ? { ...i, status: "resolved", resolutionNote: note } : i));
    } catch (error) {
      alert("Failed to resolve issue");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Issue Tracking</h1>
          <p className="text-slate-500 font-bold">Monitor and resolve university-wide reports</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white dark:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 flex">
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest">Active</button>
            <button className="px-4 py-2 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition">Resolved</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search issues by title or reporter..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-20 text-center font-bold text-slate-400">Loading issues...</div>
        ) : issues.length === 0 ? (
          <div className="p-20 text-center font-bold text-slate-400">No issues reported</div>
        ) : issues.filter(i => i.title.toLowerCase().includes(search.toLowerCase())).map((issue) => (
          <div key={issue.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${issue.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {issue.status === 'resolved' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{issue.title}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Reported by {issue.reportedBy} • {new Date(issue.date).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                  {issue.description}
                </p>
                {issue.status === 'resolved' && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Resolution Note</p>
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">{issue.resolutionNote}</p>
                  </div>
                )}
              </div>
              <div className="flex lg:flex-col justify-end gap-3 min-w-[200px]">
                {issue.status === 'open' ? (
                  <button 
                    onClick={() => resolveIssue(issue.id, "Manually resolved by admin.")}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 dark:shadow-none"
                  >
                    <CheckCircle2 size={16} /> Mark Resolved
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest">
                    <CheckCircle2 size={16} /> Resolved
                  </div>
                )}
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-900 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition">
                  <MessageSquare size={16} /> Add Note
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Issues;
