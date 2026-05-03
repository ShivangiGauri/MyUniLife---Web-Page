import { useNavigate } from "react-router-dom";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Calendar, MapPin, GraduationCap, Heart } from "lucide-react";

function EventCard({ event }) {
  const navigate = useNavigate();

  const savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
  const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

  const isSaved = savedEvents.includes(event.id);
  const isRegistered = registeredEvents.includes(event.id);

  function toggleSave(e, eventId) {
    e.stopPropagation();
    let updated;
    if (savedEvents.includes(eventId)) {
      updated = savedEvents.filter(id => id !== eventId);
    } else {
      updated = [...savedEvents, eventId];
    }
    localStorage.setItem("savedEvents", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  function registerEvent(e, eventId) {
    e.stopPropagation();
    if (!registeredEvents.includes(eventId)) {
      const updated = [...registeredEvents, eventId];
      localStorage.setItem("registeredEvents", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }
  }

  return (
    <Card 
      onClick={() => navigate(`/student/event/${event.id}`)}
      className="group cursor-pointer hover:-translate-y-1 transition-all flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
          {event.title}
        </h3>
        {isRegistered && (
          <Badge variant="success" className="shrink-0 ml-2">
            Registered
          </Badge>
        )}
      </div>

      <div className="space-y-2 mb-6 flex-1">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Calendar size={14} className="shrink-0" />
          <span>{event.startDate || event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <GraduationCap size={14} className="shrink-0" />
          <span className="truncate">{event.university}</span>
        </div>
        {event.distance && (
          <div className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 w-fit px-2 py-0.5 rounded-md">
            {event.distance} km away
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="ghost" size="sm" className="px-0 group-hover:text-indigo-600">
          Details
        </Button>

        <div className="flex items-center gap-2">
          {!isRegistered && (
            <Button 
              size="sm" 
              onClick={(e) => registerEvent(e, event.id)}
              className="h-9 px-4"
            >
              Register
            </Button>
          )}

          <button 
            onClick={(e) => toggleSave(e, event.id)}
            className={`p-2 rounded-xl transition-all ${isSaved ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default EventCard;
