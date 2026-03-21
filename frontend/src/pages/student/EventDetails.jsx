import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { events } from "../../data/events.js";
import ContactModal from "../../components/ContactModal";

function EventDetails() {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const event = events.find((e) => e.id === numericId || e.id.toString() === id);

  const [savedEvents, setSavedEvents] = useState(
    JSON.parse(localStorage.getItem("savedEvents")) || []
  );

  const [registeredEvents, setRegisteredEvents] = useState(
    JSON.parse(localStorage.getItem("registeredEvents")) || []
  );

  function toggleSave(eventId) {
    let updated;
    if (savedEvents.includes(eventId)) {
      updated = savedEvents.filter(x => x !== eventId);
    } else {
      updated = [...savedEvents, eventId];
    }
    setSavedEvents(updated);
    localStorage.setItem("savedEvents", JSON.stringify(updated));
  }

  function registerEvent(eventId) {
    if (!registeredEvents.includes(eventId)) {
      const updated = [...registeredEvents, eventId];
      setRegisteredEvents(updated);
      localStorage.setItem("registeredEvents", JSON.stringify(updated));

      const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
      const userEmail = currentUser.email || "student@myunilife.com";

      const newNotification = {
        id: Date.now(),
        userEmail: userEmail,
        role: "student",
        title: "Registration Successful",
        message: `You have successfully registered for ${event.title}`,
        time: new Date().toLocaleString(),
        read: false
      };
      
      const existingNotifs = JSON.parse(localStorage.getItem("notifications")) || [];
      localStorage.setItem("notifications", JSON.stringify([...existingNotifs, newNotification]));
      window.dispatchEvent(new Event("notification-update"));
    }
  }

  if (!event) {
    return <div className="p-10">Event not found.</div>;
  }

  const isSaved = savedEvents.includes(event.id);
  const isRegistered = registeredEvents.includes(event.id);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 text-[#333333] dark:text-[#F5F5F5]">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-[#F08B51] hover:underline transition">
        &larr; Back
      </button>

      <div className="bg-[#DEE8CE] dark:bg-[#704264] p-6 md:p-10 rounded-2xl shadow-sm border border-transparent hover:scale-[1.01] transition duration-200">
        <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">{event.title}</h1>
          <div className="flex gap-2">
            {!isRegistered && (
              <button
                onClick={() => registerEvent(event.id)}
                className="px-4 py-2 rounded-xl text-white text-sm bg-[#F08B51] hover:bg-[#BB6653] dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0] transition"
              >
                Register
              </button>
            )}
            {isRegistered && (
              <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-100 text-green-700">
                Registered ✅
              </span>
            )}
            <button
              onClick={() => toggleSave(event.id)}
              className="px-4 py-2 rounded-xl border border-[#333333]/30 dark:border-[#F5F5F5]/30 hover:bg-[#333333]/10 dark:hover:bg-[#F5F5F5]/10 text-sm transition"
            >
              {isSaved ? "Saved ❤️" : "Save 🤍"}
            </button>
            <button onClick={() => setIsContactOpen(true)} className="px-4 py-2 rounded-xl font-bold bg-[#F08B51] text-white hover:bg-[#BB6653] dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0] transition text-sm shadow-sm">
              Contact Organizer
            </button>
          </div>
        </div>
        
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} receiverEmail={"organizer@university.edu"} />

        <p className="text-lg opacity-80 mb-8 border-b pb-4 border-[#333333]/10 dark:border-white/10">{event.university}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#BB6653] dark:text-[#DBAFA0]">Details</h3>
            <p className="mb-2 opacity-90"><strong>Category:</strong> {event.category}</p>
            <p className="mb-2 opacity-90"><strong>Location:</strong> {event.location}, {event.city}, {event.state}</p>
            <p className="mb-2 opacity-90">
              <strong>Dates:</strong> {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'TBA'} {event.endDate ? `- ${new Date(event.endDate).toLocaleDateString()}` : ''}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#BB6653] dark:text-[#DBAFA0]">Participation</h3>
            <p className="mb-2 opacity-90"><strong>Fee:</strong> {event.fee === 0 ? "Free" : `₹${event.fee}`}</p>
            <p className="mb-2 opacity-90"><strong>Team Size:</strong> {event.teamSize || "TBA"}</p>
            <p className="mb-2 opacity-90"><strong>Seats:</strong> {event.seats || "TBA"}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-[#BB6653] dark:text-[#DBAFA0]">Description</h3>
          <p className="opacity-90 leading-relaxed font-medium whitespace-pre-line">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
