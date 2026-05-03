import { events } from "../../../data/events";
import EventCard from "../../../components/EventCard";

function UniAll() {
  const universityEvents = events.filter(event => event.university === "Your University");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All University Events</h2>

      {universityEvents.length === 0 ? (
        <p className="text-gray-500">No university events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {universityEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UniAll;
