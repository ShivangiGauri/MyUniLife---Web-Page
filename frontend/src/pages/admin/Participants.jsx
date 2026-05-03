// src/pages/admin/Participants.jsx

const dummyParticipants = [
  { id: 1, name: "Rahul Sharma", event: "Tech Fest" },
  { id: 2, name: "Ananya Singh", event: "Cultural Night" },
];

export default function Participants() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Participants</h1>

      <div className="space-y-4">
        {dummyParticipants.map((participant) => (
          <div
            key={participant.id}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <h2 className="font-semibold">{participant.name}</h2>
            <p className="text-sm text-gray-400">
              Registered for: {participant.event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
