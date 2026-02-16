export const events = [
  // ===============================
  // UPCOMING EVENTS
  // ===============================
  {
    id: 1,
    title: "TechFest Hackathon 2026",
    university: "Shiv Nadar University",
    category: "Hackathon",
    date: "2026-03-10",
    location: "Main Auditorium",
    description: "24-hour coding marathon focused on real-world campus solutions.",
    fee: 0,
    teamSize: "2–4 Members",
    qualifications: "Open to all CS and IT students",
    seats: 100,
    lifecycle: "upcoming",
    isNearby: true
  },
  {
    id: 2,
    title: "AI & ML Innovation Summit",
    university: "IIT Delhi",
    category: "Seminar",
    date: "2026-03-18",
    location: "Innovation Hall",
    description: "Industry experts discuss the future of AI systems.",
    fee: 500,
    teamSize: "Individual",
    qualifications: "Basic ML knowledge preferred",
    seats: 200,
    lifecycle: "upcoming",
    isNearby: false
  },
  {
    id: 3,
    title: "Cultural Night 2026",
    university: "Galgotias University",
    category: "Festival",
    date: "2026-02-25",
    location: "Open Ground",
    description: "Annual cultural celebration featuring dance and music.",
    fee: 200,
    teamSize: "Individual / Group",
    qualifications: "Open to all",
    seats: 500,
    lifecycle: "upcoming",
    isNearby: true
  },
  {
    id: 4,
    title: "Blockchain Bootcamp",
    university: "Bennett University",
    category: "Workshop",
    date: "2026-03-12",
    location: "Tech Lab 2",
    description: "Hands-on blockchain development workshop.",
    fee: 300,
    teamSize: "Individual",
    qualifications: "Basic programming required",
    seats: 80,
    lifecycle: "upcoming",
    isNearby: true
  },
  {
    id: 5,
    title: "National Startup Pitch",
    university: "IIM Bangalore",
    category: "Competition",
    date: "2026-04-02",
    location: "Seminar Hall",
    description: "Pitch your startup idea to investors.",
    fee: 0,
    teamSize: "1–3 Members",
    qualifications: "Open to final year students",
    seats: 50,
    lifecycle: "upcoming",
    isNearby: false
  },

  // ===============================
  // ONGOING EVENTS
  // ===============================
  {
    id: 6,
    title: "Cybersecurity Championship",
    university: "NIET",
    category: "Competition",
    date: "2026-02-14",
    location: "Computer Center",
    description: "Live cyber attack simulation challenge.",
    lifecycle: "ongoing",
    progress: [
      {
        stage: "Event Started",
        date: "13 Feb 2026, 12:00 PM",
        venue: "Computer Center"
      },
      {
        stage: "Round 1 Completed",
        date: "14 Feb 2026, 03:00 PM",
        venue: "Lab 1"
      },
      {
        stage: "Final Round Ongoing",
        date: "15 Feb 2026, 10:00 AM",
        venue: "Main Hall"
      }
    ]
  },
  {
    id: 7,
    title: "Robotics Expo Live",
    university: "GL Bajaj Institute of Technology and Management",
    category: "Exhibition",
    date: "2026-02-15",
    location: "Engineering Block",
    description: "Live robotics demonstrations and judging.",
    lifecycle: "ongoing",
    progress: [
      {
        stage: "Exhibition Started",
        date: "14 Feb 2026, 09:00 AM",
        venue: "Engineering Block"
      },
      {
        stage: "Evaluation in Progress",
        date: "15 Feb 2026, 01:00 PM",
        venue: "Hall B"
      }
    ]
  },

  // ===============================
  // COMPLETED EVENTS (24hr winner window)
  // ===============================
  {
    id: 8,
    title: "Data Science Hackathon",
    university: "Amity University",
    category: "Hackathon",
    lifecycle: "completed",
    completedAt: "2026-02-14T09:00:00",
    winners: [
      {
        name: "Team Alpha",
        university: "Amity University",
        project: "Smart Waste Segregator"
      },
      {
        name: "Team Beta",
        university: "Sharda University",
        project: "AI Attendance Tracker"
      }
    ]
  }
];
