import { events } from "../data/events";
import EventCard from "../components/EventCard";

function UpcomingAll() {
  const upcomingEvents = events.filter(
    (event) => event.lifecycle === "upcoming"
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">
        ⚡ Upcoming Events
      </h2>

      {upcomingEvents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No upcoming events at the moment.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingAll;
