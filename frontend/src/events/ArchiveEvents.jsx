import { events } from "../data/events";

function ArchiveEvents() {
  const now = new Date();

  const archivedEvents = events.filter((event) => {
    if (event.lifecycle !== "completed") return false;

    const completedTime = new Date(event.completedAt);
    const diffInDays =
      (now - completedTime) / (1000 * 60 * 60 * 24);

    return diffInDays > 1 && diffInDays <= 90;
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        📚 Event Archive
      </h2>

      {archivedEvents.length === 0 ? (
        <p className="text-gray-500">
          No archived events yet.
        </p>
      ) : (
        <div className="space-y-6">
          {archivedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow"
            >
              <h3 className="text-xl font-semibold">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                🏫 {event.university}
              </p>

              <p className="text-sm mt-2">
                Completed on:{" "}
                {new Date(event.completedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchiveEvents;
