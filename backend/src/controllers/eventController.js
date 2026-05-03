// IN-MEMORY EVENTS
export const events = [
  { id: "e1", title: "Fresher's Party", date: "2026-05-01", university: "MIT" },
  { id: "e2", title: "Tech Symposium", date: "2026-05-15", university: "Stanford" }
];

export const getEvents = async (req, res) => {
  res.json(events);
};

export const createEvent = async (req, res) => {
  const newEvent = { id: Date.now().toString(), ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
};
