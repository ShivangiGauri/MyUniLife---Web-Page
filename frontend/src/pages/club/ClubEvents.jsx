// src/pages/club/ClubEvents.jsx

const dummyClubEvents = [
  { id: 1, title: "Coding Hackathon", date: "2026-03-20" },
  { id: 2, title: "AI Workshop", date: "2026-04-05" },
];

export default function ClubEvents() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#8E7DBE] dark:text-[#A64D79]">My Events</h1>

      <div className="space-y-4">
        {dummyClubEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-5 rounded-xl flex justify-between items-center shadow-sm border border-white/40 dark:border-white/10 text-gray-800 dark:text-gray-200"
          >
            <div>
              <h2 className="font-bold text-lg">{event.title}</h2>
              <p className="text-sm opacity-70 mt-1">{event.date}</p>
            </div>

            <div className="space-x-3">
              <button className="bg-[#A6D6D6] dark:bg-[#A64D79] text-gray-800 dark:text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:opacity-90 transition">
                Edit
              </button>
              <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
