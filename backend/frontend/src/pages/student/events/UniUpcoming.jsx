import { events } from "../../../data/events";
import EventCard from "../../../components/EventCard";

function UniUpcoming() {
  const upcoming = events.filter(
    event =>
      event.university === "Your University" &&
      event.status === "upcoming"
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Upcoming University Events</h2>

      {upcoming.length === 0 ? (
        <p className="text-gray-500">No upcoming events.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {upcoming.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UniUpcoming;