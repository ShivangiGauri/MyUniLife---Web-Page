import { events } from "../../data/events";
import { getSavedEvents } from "../../utils/eventStorage";

function SavedEvents() {
  const savedIds = getSavedEvents();

  const savedEvents = events.filter((event) =>
    savedIds.includes(event.id)
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-[#333333] dark:text-[#F5F5F5]">
        💾 Saved Events
      </h2>

      {savedEvents.length === 0 ? (
        <p className="text-[#333333]/70 dark:text-[#F5F5F5]/70">
          You haven’t saved any events yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {savedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-6 rounded-2xl shadow-sm hover:scale-[1.05] transition duration-200"
            >
              <h3 className="text-lg font-semibold">
                {event.title}
              </h3>
              <p className="text-sm opacity-80">
                📅 {event.date}
              </p>
              <p className="text-sm opacity-80">
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
