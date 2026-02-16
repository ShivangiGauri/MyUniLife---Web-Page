import { events } from "../data/events";

function OngoingEvents() {
  const ongoingEvents = events.filter(
    (event) => event.lifecycle === "ongoing"
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        🔥 Ongoing Events
      </h2>

      {ongoingEvents.length === 0 ? (
        <p className="text-gray-500">
          No ongoing events right now.
        </p>
      ) : (
        <div className="space-y-8">
          {ongoingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-[#1E293B]
                         p-6 rounded-2xl shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                🏫 {event.university}
              </p>

              <div className="space-y-3">
                {event.progress?.map((stage, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-300"
                  >
                    • <strong>{stage.stage}</strong>  
                    <div>{stage.date}</div>
                    <div>{stage.venue}</div>
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

export default OngoingEvents;
