import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

function EventCard({ event }) {
  const navigate = useNavigate();

  const [savedEvents, setSavedEvents] = useState(
    JSON.parse(localStorage.getItem("savedEvents")) || []
  );

  const [registeredEvents, setRegisteredEvents] = useState(
    JSON.parse(localStorage.getItem("registeredEvents")) || []
  );

  function toggleSave(eventId) {
    let updated;
    if (savedEvents.includes(eventId)) {
      updated = savedEvents.filter(id => id !== eventId);
    } else {
      updated = [...savedEvents, eventId];
    }
    setSavedEvents(updated);
    localStorage.setItem("savedEvents", JSON.stringify(updated));
  }

  function registerEvent(eventId) {
    if (!registeredEvents.includes(eventId)) {
      const updated = [...registeredEvents, eventId];
      setRegisteredEvents(updated);
      localStorage.setItem("registeredEvents", JSON.stringify(updated));
    }
  }

  const isSaved = savedEvents.includes(event.id);
  const isRegistered = registeredEvents.includes(event.id);

  return (
    <Card>
      {/* REGISTERED BADGE */}
      {isRegistered && (
        <span
          className="absolute top-4 right-4 text-xs font-semibold
                     px-3 py-1 rounded-full
                     bg-green-100 text-green-600
                     dark:bg-green-900/40 dark:text-green-400"
        >
          Registered ✅
        </span>
      )}

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-2 pr-20">
        {event.title}
      </h3>

      {/* DETAILS */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        📅 {event.startDate || event.date}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        📍 {event.location}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        🎓 {event.university}
      </p>

      {event.distance && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          🛣️ {event.distance} km away
        </p>
      )}

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-4">

        <button
          onClick={() => navigate(`/student/event/${event.id}`)}
          className="px-4 py-2 rounded-xl text-sm
                     bg-[#F1EAFB] text-[#9F7AEA]
                     dark:bg-[#334155] dark:text-cyan-300
                     hover:opacity-90 transition"
        >
          View Details
        </button>

        <div className="flex items-center gap-2">
          {!isRegistered && (
            <button
              onClick={() => registerEvent(event.id)}
              className="text-sm font-medium transition text-gray-500 dark:text-gray-400 hover:text-[#9F7AEA]"
            >
              Register
            </button>
          )}

          <button
            onClick={() => toggleSave(event.id)}
            className={`text-sm font-medium transition ${
              isSaved
                ? "text-[#9F7AEA] dark:text-cyan-300"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isSaved ? "Saved ❤️" : "Save 🤍"}
          </button>
        </div>

      </div>

    </Card>
  );
}

export default EventCard;
