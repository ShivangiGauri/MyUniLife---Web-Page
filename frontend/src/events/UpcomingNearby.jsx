import { events } from "../data/events";
import EventCard from "../components/EventCard";

function UpcomingNearby() {
  const nearbyEvents = events.filter(
    (event) =>
      event.lifecycle === "upcoming" && event.isNearby === true
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        📍 Nearby Events
      </h2>

      {nearbyEvents.length === 0 ? (
        <p className="text-gray-500">
          No nearby events available.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingNearby;
