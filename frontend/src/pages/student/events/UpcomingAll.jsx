import { events } from "../../../data/events.js";
import EventCard from "../../../components/EventCard";

function UpcomingAll() {
  const upcomingEvents = events
    .filter((event) => event.lifecycle === "upcoming")
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Upcoming Events</h2>

      {upcomingEvents.length === 0 ? (
        <p className="text-gray-500">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingAll;
