// src/pages/admin/ManageEvents.jsx

const dummyEvents = [
  { id: 1, title: "Tech Fest", date: "2026-03-15" },
  { id: 2, title: "Cultural Night", date: "2026-04-01" },
];

export default function ManageEvents() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <div className="space-y-4">
        {dummyEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-400">{event.date}</p>
            </div>

            <div className="space-x-2">
              <button className="bg-yellow-500 px-3 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-600 px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}