import { useState, useEffect, useMemo } from "react";
import { events } from "../../../data/events.js";
import EventCard from "../../../components/EventCard";

// Distance calculator (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function UpcomingNearby() {
  const [userLocation, setUserLocation] = useState(null);

  // ✅ Get user location ONCE
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation({ lat: 28.6139, lng: 77.2090 }); // fallback (Delhi)
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        console.log("Location denied, using fallback");
        setUserLocation({ lat: 28.6139, lng: 77.2090 });
      }
    );
  }, []);

  // ✅ Memoized nearby events (NO re-render storm)
  const nearby = useMemo(() => {
    if (!userLocation) return [];

    return events
      .filter((event) => {
        if (event.lifecycle !== "upcoming") return false;
        if (!event.coordinates) return false;

        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          event.coordinates.lat,
          event.coordinates.lng
        );

        return distance <= 100;
      })
      .map((event) => ({
        ...event,
        distance: getDistance(
          userLocation.lat,
          userLocation.lng,
          event.coordinates.lat,
          event.coordinates.lng
        ).toFixed(1),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Nearby Upcoming Events
      </h2>

      {!userLocation ? (
        <p className="text-gray-500">Fetching your location...</p>
      ) : nearby.length === 0 ? (
        <p className="text-gray-500">No nearby upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {nearby.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingNearby;
