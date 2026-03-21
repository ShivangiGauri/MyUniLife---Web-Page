import { useState, useEffect } from "react";
import { events } from "../../data/events.js";

function RegisteredEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setRegisteredEvents(stored);
  }, []);

  const registeredList = events.filter((event) =>
    registeredEvents.includes(event.id)
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-[#333333] dark:text-[#F5F5F5]">
        📝 Registered Events
      </h2>

      {registeredList.length === 0 ? (
        <p className="text-[#333333]/70 dark:text-[#F5F5F5]/70">
          You have not registered for any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {registeredList.map((event) => (
            <div
              key={event.id}
              className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5] p-6 rounded-2xl shadow-sm hover:scale-[1.05] transition duration-200"
            >
              <h3 className="text-lg font-semibold mb-2">
                {event.title}
              </h3>

              <p className="text-sm opacity-80 mb-1">
                📅 {event.date || event.startDate}
              </p>

              <p className="text-sm opacity-80 mb-1">
                🎓 {event.university}
              </p>

              <p className="text-sm opacity-80 mb-1">
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
