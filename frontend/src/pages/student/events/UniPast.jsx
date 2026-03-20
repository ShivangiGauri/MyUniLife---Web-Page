import { events } from "../../../data/events";
import EventCard from "../../../components/EventCard";

function UniPast() {
  const past = events.filter(
    event =>
      event.university === "Your University" &&
      event.status === "completed"
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Past University Events</h2>

      {past.length === 0 ? (
        <p className="text-gray-500">No past events.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {past.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UniPast;