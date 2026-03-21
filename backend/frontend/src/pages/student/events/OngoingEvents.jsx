import { events } from "../../../data/events.js";
import EventCard from "../../../components/EventCard";

function OngoingEvents() {
  const today = new Date();

  const ongoing = events.filter(e => {
    if (e.lifecycle !== "ongoing") return false;
    return new Date(e.startDate) <= today && new Date(e.endDate) >= today;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Ongoing Events</h2>

      {ongoing.length === 0 ? (
        <p className="text-gray-500">No ongoing events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {ongoing.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OngoingEvents;