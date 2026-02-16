import { useContext } from "react";
import { events } from "../data/events";
import { ActivityContext } from "../context/ActivityContext";

function RegisteredEvents() {
  const { registeredEvents } = useContext(ActivityContext);

  const registeredList = events.filter((event) =>
    registeredEvents.includes(event.id)
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        📝 Registered Events
      </h2>

      {registeredList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No registered events yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {registeredList.map((event) => (
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

              <p className="text-sm text-gray-500">
                📍 {event.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RegisteredEvents;
