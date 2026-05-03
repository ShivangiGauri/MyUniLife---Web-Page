import { events } from "../../data/events";

function Dashboard() {
  const upcoming = events.filter(e => e.status === "upcoming").length;
  const ongoing = events.filter(e => e.status === "ongoing").length;
  const completed = events.filter(e => e.status === "completed").length;

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div className="text-[#333333] dark:text-[#F5F5F5]">
        <h1 className="text-3xl font-semibold mb-2">Student Dashboard</h1>
        <p className="opacity-70">
          Overview of your university activity and participation.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 text-[#333333] dark:text-[#F5F5F5]">

        <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl shadow-sm hover:scale-[1.05] transition duration-200">
          <h3 className="text-sm opacity-70 mb-2">Upcoming Events</h3>
          <p className="text-3xl font-semibold">{upcoming}</p>
        </div>

        <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl shadow-sm hover:scale-[1.05] transition duration-200">
          <h3 className="text-sm opacity-70 mb-2">Ongoing Events</h3>
          <p className="text-3xl font-semibold">{ongoing}</p>
        </div>

        <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 rounded-2xl shadow-sm hover:scale-[1.05] transition duration-200">
          <h3 className="text-sm opacity-70 mb-2">Completed Events</h3>
          <p className="text-3xl font-semibold">{completed}</p>
        </div>

      </div>

      {/* Recent Events Section */}
      <div className="text-[#333333] dark:text-[#F5F5F5]">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>

        <div className="bg-[#DEE8CE] dark:bg-[#704264] rounded-2xl shadow-sm divide-y divide-[#333333]/10 dark:divide-white/10 hover:scale-[1.01] transition duration-200">

          {events.slice(0, 5).map(event => (
            <div
              key={event.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm opacity-70">
                  {event.date} • {event.location}
                </p>
              </div>

              <span className="text-sm capitalize opacity-70">
                {event.status}
              </span>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
