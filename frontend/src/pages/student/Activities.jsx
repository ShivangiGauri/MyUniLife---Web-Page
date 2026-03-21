import { useState, useEffect } from "react";
import { events } from "../../data/events.js";

function Activities() {
  const [goals, setGoals] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target: "", category: "Any", deadline: "" });

  useEffect(() => {
    setGoals(JSON.parse(localStorage.getItem("userGoals")) || []);
    setRegisteredEvents(JSON.parse(localStorage.getItem("registeredEvents")) || []);
  }, []);

  const registeredList = events.filter(e => registeredEvents.includes(e.id));
  const hackathonCount = registeredList.filter(e => e.category === "Hackathon").length;

  // Process completions
  const processedGoals = goals.map(g => {
    let progress = 0;
    if (g.category === "Any") {
      progress = registeredList.length;
    } else {
      progress = registeredList.filter(e => e.category === g.category).length;
    }
    return { ...g, progress, completed: progress >= g.target };
  });

  const activeGoals = processedGoals.filter(g => !g.completed);
  const completedGoals = processedGoals.filter(g => g.completed);

  const saveGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;
    const goal = {
      id: Date.now(),
      title: newGoal.title,
      target: parseInt(newGoal.target),
      category: newGoal.category,
      deadline: newGoal.deadline,
      completed: false
    };
    const updated = [...goals, goal];
    setGoals(updated);
    localStorage.setItem("userGoals", JSON.stringify(updated));
    setNewGoal({ title: "", target: "", category: "Any", deadline: "" });
    setShowModal(false);
  };

  const streak = registeredList.length > 0 ? 1 : 0; // Simple fallback streak

  return (
    <div className="w-full overflow-x-hidden min-h-screen pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[#333333] dark:text-[#F5F5F5]">Activities</h1>
          <p className="text-[#333333]/70 dark:text-[#F5F5F5]/70">Track your progress and stay consistent</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-5 py-2.5 bg-[#F08B51] hover:bg-[#BB6653] dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0] text-white rounded-xl font-semibold shadow-sm transition">
          + Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-5 rounded-2xl shadow-sm border border-transparent hover:scale-105 transition duration-200">
          <p className="text-sm opacity-70 mb-1">Active Goals</p>
          <p className="text-2xl font-bold">{activeGoals.length}</p>
        </div>
        <div className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-5 rounded-2xl shadow-sm border border-transparent hover:scale-105 transition duration-200">
          <p className="text-sm opacity-70 mb-1">Completed Goals</p>
          <p className="text-2xl font-bold">{completedGoals.length}</p>
        </div>
        <div className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-5 rounded-2xl shadow-sm border border-transparent hover:scale-105 transition duration-200">
          <p className="text-sm opacity-70 mb-1">Total Events</p>
          <p className="text-2xl font-bold">{registeredList.length}</p>
        </div>
        <div className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-5 rounded-2xl shadow-sm border border-transparent hover:scale-105 transition duration-200">
          <p className="text-sm opacity-70 mb-1">Streak</p>
          <p className="text-2xl font-bold">{streak} Days</p>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-[#333333] dark:text-[#F5F5F5]">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl text-center border transition hover:scale-105 duration-200 ${registeredList.length >= 1 ? 'bg-[#BB6653]/20 text-[#BB6653] border-transparent' : 'bg-[#DEE8CE] dark:bg-[#704264] opacity-60 border-transparent text-[#333333] dark:text-[#F5F5F5]'}`}>
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="font-bold text-sm">First Event</h3>
            <p className="text-xs opacity-80 mt-1">Join 1 event</p>
          </div>
          <div className={`p-4 rounded-2xl text-center border transition hover:scale-105 duration-200 ${registeredList.length >= 5 ? 'bg-[#F08B51]/20 text-[#F08B51] border-transparent' : 'bg-[#DEE8CE] dark:bg-[#704264] opacity-60 border-transparent text-[#333333] dark:text-[#F5F5F5]'}`}>
            <div className="text-3xl mb-2">🧭</div>
            <h3 className="font-bold text-sm">Explorer</h3>
            <p className="text-xs opacity-80 mt-1">Join 5 events</p>
          </div>
          <div className={`p-4 rounded-2xl text-center border transition hover:scale-105 duration-200 ${registeredList.length >= 10 ? 'bg-green-100 text-green-700 border-transparent' : 'bg-[#DEE8CE] dark:bg-[#704264] opacity-60 border-transparent text-[#333333] dark:text-[#F5F5F5]'}`}>
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-bold text-sm">Consistent</h3>
            <p className="text-xs opacity-80 mt-1">Join 10 events</p>
          </div>
          <div className={`p-4 rounded-2xl text-center border transition hover:scale-105 duration-200 ${hackathonCount >= 3 ? 'bg-[#F08B51]/20 text-[#F08B51] border-transparent' : 'bg-[#DEE8CE] dark:bg-[#704264] opacity-60 border-transparent text-[#333333] dark:text-[#F5F5F5]'}`}>
            <div className="text-3xl mb-2">💻</div>
            <h3 className="font-bold text-sm">Hackathon Lover</h3>
            <p className="text-xs opacity-80 mt-1">3 Hackathons</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ACTIVE GOALS */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#333333] dark:text-[#F5F5F5]">Active Goals</h2>
          <div className="space-y-4">
            {activeGoals.length === 0 ? (
              <p className="text-[#333333]/70 dark:text-[#F5F5F5]/70 p-6 bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl text-center border border-transparent">No active goals. Time to set one!</p>
            ) : (
              activeGoals.map(goal => (
                <div key={goal.id} className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-5 rounded-2xl shadow-sm hover:scale-[1.03] transition duration-200 border border-transparent">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{goal.title}</h3>
                    <span className="px-2.5 py-1 bg-[#F08B51]/20 text-[#F08B51] text-xs font-semibold rounded-lg">
                      {goal.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm opacity-70 mb-2">
                    <span>Progress: {goal.progress} / {goal.target}</span>
                    {goal.deadline && <span>Due: {goal.deadline}</span>}
                  </div>
                  <div className="w-full bg-[#333333]/10 dark:bg-black/20 h-2 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full bg-[#F08B51] dark:bg-[#BB8493] transition-all duration-500" style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COMPLETED GOALS */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#333333] dark:text-[#F5F5F5]">Completed Goals</h2>
          <div className="space-y-4">
            {completedGoals.length === 0 ? (
              <p className="text-[#333333]/70 dark:text-[#F5F5F5]/70 p-6 bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl text-center border border-transparent">No completed goals yet. Keep going!</p>
            ) : (
              completedGoals.map(goal => (
                <div key={goal.id} className="bg-green-50 dark:bg-green-900/20 p-5 rounded-2xl shadow-sm border border-green-200 dark:border-green-800/30 opacity-80 hover:scale-[1.03] transition duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-through opacity-70">{goal.title}</h3>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1">
                      ✅ Completed
                    </span>
                  </div>
                  <div className="flex justify-between text-sm opacity-70 mb-2">
                    <span>Progress: {goal.target} / {goal.target}</span>
                  </div>
                  <div className="w-full bg-[#333333]/10 dark:bg-black/20 h-2 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `100%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ADD GOAL MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFF8E8] dark:bg-[#49243E] rounded-2xl w-full max-w-md shadow-xl p-6 text-[#333333] dark:text-[#F5F5F5]">
            <h2 className="text-2xl font-bold mb-6">Create New Goal</h2>
            <form onSubmit={saveGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Goal Title</label>
                <input required value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-[#FFF8E8] dark:bg-[#49243E] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" placeholder="e.g. Code 3 Hackathons" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Target (#)</label>
                  <input required type="number" min="1" value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-[#FFF8E8] dark:bg-[#49243E] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" placeholder="3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={newGoal.category} onChange={e => setNewGoal({...newGoal, category: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-[#FFF8E8] dark:bg-[#49243E] focus:outline-none focus:ring-1 focus:ring-[#F08B51]">
                    <option value="Any">Any Event</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Competition">Competition</option>
                    <option value="Festival">Festival</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input type="date" value={newGoal.deadline} onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} className="w-full p-3 rounded-lg border border-[#333333]/30 dark:border-transparent bg-[#FFF8E8] dark:bg-[#49243E] focus:outline-none focus:ring-1 focus:ring-[#F08B51]" />
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#333333]/20 dark:border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 rounded-xl text-sm font-medium border border-[#333333]/30 hover:bg-[#333333]/5 transition">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl text-sm font-semibold bg-[#F08B51] hover:bg-[#BB6653] dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0] text-white shadow-sm transition">Add Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Activities;
