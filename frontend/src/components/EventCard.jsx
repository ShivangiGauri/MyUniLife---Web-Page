import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveEvent,
  unsaveEvent,
  getSavedEvents,
  getRegisteredEvents,
} from "../utils/eventStorage";
import Card from "./Card";

function EventCard({ event }) {
  const navigate = useNavigate();

  const [savedIds, setSavedIds] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    setSavedIds(getSavedEvents());
    setRegisteredIds(getRegisteredEvents());
  }, []);

  const isSaved = savedIds.includes(event.id);
  const isRegistered = registeredIds.includes(event.id);

  const handleSave = () => {
    if (isSaved) {
      unsaveEvent(event.id);
    } else {
      saveEvent(event.id);
    }
    setSavedIds(getSavedEvents());
  };

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
          Registered
        </span>
      )}

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-2 pr-20">
        {event.title}
      </h3>

      {/* DETAILS */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        📅 {event.date}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        📍 {event.location}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        🎓 {event.university}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-4">

        <button
          onClick={() => navigate(`/dashboard/event/${event.id}`)}
          className="px-4 py-2 rounded-xl text-sm
                     bg-[#F1EAFB] text-[#9F7AEA]
                     dark:bg-[#334155] dark:text-cyan-300
                     hover:opacity-90 transition"
        >
          View Details
        </button>

        {/* SAVE ICON STYLE */}
        <button
          onClick={handleSave}
          className={`text-sm font-medium transition ${
            isSaved
              ? "text-[#9F7AEA] dark:text-cyan-300"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {isSaved ? "💜 Saved" : "🤍 Save"}
        </button>

      </div>

    </Card>
  );
}

export default EventCard;
