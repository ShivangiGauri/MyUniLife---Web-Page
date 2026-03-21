// src/pages/club/ManageParticipants.jsx
import { useState } from "react";
import ContactModal from "../../components/ContactModal";

const dummyParticipants = [
  { id: 1, name: "Amit Verma", event: "Coding Hackathon", email: "amit@university.edu" },
  { id: 2, name: "Sneha Patel", event: "AI Workshop", email: "sneha@university.edu" },
];

export default function ManageParticipants() {
  const [contactTarget, setContactTarget] = useState(null);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#8E7DBE] dark:text-[#A64D79]">Manage Participants</h1>

      <div className="space-y-4">
        {dummyParticipants.map((participant) => (
          <div
            key={participant.id}
            className="bg-[#F4F8D3] dark:bg-[#3B1C32] p-5 rounded-xl text-gray-800 dark:text-gray-200 shadow-sm border border-white/40 dark:border-white/10 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-xl">{participant.name}</h2>
              <p className="text-sm opacity-80 mt-2 font-medium">
                Registered for: <span className="text-[#8E7DBE] dark:text-[#A6D6D6] bg-white/50 dark:bg-black/20 px-2 py-1 rounded-md ml-1">{participant.event}</span>
              </p>
            </div>
            
            <button onClick={() => setContactTarget(participant)} className="px-4 py-2 bg-[#8E7DBE] dark:bg-[#6A1E55] text-white font-bold rounded-lg hover:opacity-90 shadow-sm transition">
              Message
            </button>
          </div>
        ))}
      </div>
      
      <ContactModal isOpen={!!contactTarget} onClose={() => setContactTarget(null)} receiverEmail={contactTarget?.email || "student@university.edu"} />
    </div>
  );
}