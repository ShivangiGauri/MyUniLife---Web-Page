import { users } from "./authController.js";

// IN-MEMORY DATA
export const events = [];
export const issues = [];
export const logs = [];

// UTILS
export const addLog = (action, performedBy, universityId) => {
  logs.push({
    id: Date.now().toString(),
    action,
    performedBy,
    universityId,
    timestamp: new Date().toISOString()
  });
};

// -- USERS --
export const getUsers = async (req, res) => {
  const universityId = req.user.universityId;
  const filtered = users.filter(u => u.universityId === universityId && (u.role === "student" || u.role === "club"));
  res.json(filtered);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const universityId = req.user.universityId;
  const { role, status } = req.body;

  const user = users.find(u => u.id === id && u.universityId === universityId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (role) {
    if (!["student", "club"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const oldRole = user.role;
    user.role = role;
    addLog(`Role changed from ${oldRole} to ${role}`, req.user.email, universityId);
  }

  if (status) user.status = status;

  res.json({ success: true, user });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const universityId = req.user.universityId;

  const index = users.findIndex(u => u.id === id && u.universityId === universityId);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const targetUser = users[index];
  users.splice(index, 1);
  addLog(`User deleted: ${targetUser.email}`, req.user.email, universityId);

  res.json({ success: true, message: "User removed" });
};

// -- EVENTS --
export const getAdminEvents = async (req, res) => {
  const universityId = req.user.universityId;
  const filtered = events.filter(e => e.universityId === universityId);
  res.json(filtered);
};

export const createAdminEvent = async (req, res) => {
  const universityId = req.user.universityId;
  const event = {
    id: Date.now().toString(),
    ...req.body,
    universityId,
    attendees: 0,
    status: "upcoming"
  };
  events.push(event);
  addLog(`Event created: ${event.title}`, req.user.email, universityId);
  res.status(201).json(event);
};

export const updateAdminEvent = async (req, res) => {
  const { id } = req.params;
  const universityId = req.user.universityId;
  const index = events.findIndex(e => e.id === id && e.universityId === universityId);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  events[index] = { ...events[index], ...req.body };
  addLog(`Event updated: ${events[index].title}`, req.user.email, universityId);
  res.json(events[index]);
};

export const deleteAdminEvent = async (req, res) => {
  const { id } = req.params;
  const universityId = req.user.universityId;
  const index = events.findIndex(e => e.id === id && e.universityId === universityId);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  const title = events[index].title;
  events.splice(index, 1);
  addLog(`Event deleted: ${title}`, req.user.email, universityId);
  res.json({ success: true });
};

// -- ISSUES --
export const getAdminIssues = async (req, res) => {
  const universityId = req.user.universityId;
  const filtered = issues.filter(i => i.universityId === universityId);
  res.json(filtered);
};

export const resolveIssue = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const universityId = req.user.universityId;

  const issue = issues.find(i => i.id === id && i.universityId === universityId);
  if (!issue) return res.status(404).json({ message: "Issue not found" });

  issue.status = "resolved";
  issue.resolutionNote = note;
  addLog(`Issue resolved: ${issue.title}`, req.user.email, universityId);
  res.json(issue);
};

// -- LOGS --
export const getAdminLogs = async (req, res) => {
  const universityId = req.user.universityId;
  const filteredLogs = logs.filter(l => l.universityId === universityId).reverse();
  
  // Also include suspicious mock logs for monitoring
  const suspicious = [
    { id: "s1", reason: "Multiple Rapid Logins", user: "system_detector", severity: "high", timestamp: new Date().toISOString() }
  ];

  res.json({ logs: filteredLogs, suspicious });
};

// -- ANALYTICS --
export const getAdminAnalytics = async (req, res) => {
  const universityId = req.user.universityId;
  const uniUsers = users.filter(u => u.universityId === universityId);
  const uniEvents = events.filter(e => e.universityId === universityId);

  const stats = {
    users: uniUsers.length,
    events: uniEvents.length,
    students: uniUsers.filter(u => u.role === "student").length,
    clubs: uniUsers.filter(u => u.role === "club").length,
    issues: issues.filter(i => i.universityId === universityId && i.status === "open").length,
    activeUsers: Math.floor(uniUsers.length * 0.7) // Mock active count
  };

  const chartData = [
    { name: 'Mon', users: 40, events: 2 },
    { name: 'Tue', users: 30, events: 1 },
    { name: 'Wed', users: 20, events: 5 },
    { name: 'Thu', users: 27, events: 3 },
    { name: 'Fri', users: 18, events: 4 },
    { name: 'Sat', users: 23, events: 8 },
    { name: 'Sun', users: 34, events: 4 },
  ];

  const topClubs = uniUsers
    .filter(u => u.role === "club")
    .map(u => ({
      name: u.fullName,
      events: uniEvents.filter(e => e.club === u.fullName).length,
      participation: Math.floor(Math.random() * 500)
    }))
    .sort((a, b) => b.participation - a.participation)
    .slice(0, 3);

  res.json({ stats, chartData, topClubs });
};
