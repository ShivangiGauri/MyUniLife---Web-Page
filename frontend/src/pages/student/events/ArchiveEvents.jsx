import { events } from "../../../data/events.js";
import EventCard from "../../../components/EventCard";

function ArchiveEvents() {
  const completedEvents = events.filter(e => e.lifecycle === "completed");
  const archived = [...completedEvents].sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Archived Events</h2>

      {archived.length === 0 ? (
        <p className="text-gray-500">No archived events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {archived.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchiveEvents;