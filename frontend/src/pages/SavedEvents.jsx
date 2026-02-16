import { events } from "../data/events";
import { getSavedEvents } from "../utils/eventStorage";

function SavedEvents() {
  const savedIds = getSavedEvents();

  const savedEvents = events.filter((event) =>
    savedIds.includes(event.id)
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        💾 Saved Events
      </h2>

      {savedEvents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          You haven’t saved any events yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {savedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow"
            >
              <h3 className="text-lg font-semibold">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500">
                📅 {event.date}
              </p>
              <p className="text-sm text-gray-500">
                🎓 {event.university}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedEvents;
