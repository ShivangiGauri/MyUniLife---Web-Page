import { events } from "../../../data/events.js";
import EventCard from "../../../components/EventCard";

function CompletedEvents() {
  const completed = events.filter(e => e.lifecycle === "completed");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Completed Events</h2>

      {completed.length === 0 ? (
        <p className="text-gray-500">No completed events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {completed.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedEvents;