import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { events } from "../data/events";
import { ActivityContext } from "../context/ActivityContext";

function EventDetails() {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();

  const { registerEvent, isRegistered } = useContext(ActivityContext);

  const event = events.find((e) => e.id === numericId);

  if (!event) {
    return <div className="p-10">Event not found.</div>;
  }

  const alreadyRegistered = isRegistered(numericId);

  const handleRegister = () => {
    registerEvent(numericId);   // ✅ only ID
    navigate("/dashboard/registered");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl shadow">

        <h2 className="text-2xl font-semibold mb-6">
          {event.title}
        </h2>

        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">

          <div><strong>Date:</strong> {event.date}</div>
          <div><strong>University:</strong> {event.university}</div>
          <div><strong>Location:</strong> {event.location}</div>
          <div><strong>Description:</strong> {event.description}</div>
          <div>
            <strong>Registration Fee:</strong>{" "}
            {event.fee === 0 ? "Free Event" : `₹${event.fee}`}
          </div>
          <div><strong>Team Size:</strong> {event.teamSize}</div>
          <div><strong>Qualifications:</strong> {event.qualifications}</div>
          <div><strong>Seats Available:</strong> {event.seats}</div>

        </div>

        <div className="mt-8 flex justify-between">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 text-sm"
          >
            Maybe Later
          </button>

          {!alreadyRegistered ? (
            <button
              onClick={handleRegister}
              className="px-6 py-2 rounded-xl text-white text-sm
                         bg-gradient-to-r from-[#9F7AEA] to-[#F6C1D9]"
            >
              Confirm Registration
            </button>
          ) : (
            <span className="text-green-600 font-medium">
              You are already registered
            </span>
          )}

        </div>
      </div>
    </div>
  );
}

export default EventDetails;
