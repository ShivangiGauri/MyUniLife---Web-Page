import { events } from "../data/events";

function CompletedEvents() {
  const now = new Date();

  const completedEvents = events.filter((event) => {
    if (event.lifecycle !== "completed") return false;

    const completedTime = new Date(event.completedAt);
    const diffInHours =
      (now - completedTime) / (1000 * 60 * 60);

    return diffInHours <= 24;
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        🏆 Recently Completed
      </h2>

      {completedEvents.length === 0 ? (
        <p className="text-gray-500">
          No recently completed events.
        </p>
      ) : (
        <div className="space-y-6">
          {completedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                🏫 {event.university}
              </p>

              <div className="space-y-4">
                {event.winners?.map((winner, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 dark:bg-slate-700 rounded-xl"
                  >
                    <div className="font-medium">
                      🥇 {winner.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {winner.university}
                    </div>
                    <div className="text-sm mt-1">
                      Project: {winner.project}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedEvents;
