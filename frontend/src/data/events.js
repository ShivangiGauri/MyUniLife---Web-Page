export const events = [

/* ================================
UPCOMING EVENTS
================================ */

{
id:1,
title:"TechFest Hackathon 2026",
university:"Shiv Nadar University",
city:"Greater Noida",
state:"Uttar Pradesh",
coordinates:{lat:28.526,lng:77.574},
category:"Hackathon",
startDate:"2026-03-10",
endDate:"2026-03-11",
location:"Main Auditorium",
description:"24 hour coding marathon focused on campus solutions.",
fee:0,
teamSize:"2-4",
seats:120,
lifecycle:"upcoming"
},

{
id:2,
title:"AI & ML Innovation Summit",
university:"IIT Delhi",
city:"Delhi",
state:"Delhi",
coordinates:{lat:28.545,lng:77.192},
category:"Seminar",
startDate:"2026-03-18",
endDate:"2026-03-18",
location:"Innovation Hall",
description:"Future of artificial intelligence and machine learning.",
fee:500,
teamSize:"Individual",
seats:200,
lifecycle:"upcoming"
},

{
id:3,
title:"Startup Pitch Arena",
university:"IIM Bangalore",
city:"Bangalore",
state:"Karnataka",
coordinates:{lat:12.971,lng:77.594},
category:"Competition",
startDate:"2026-04-02",
endDate:"2026-04-02",
location:"Seminar Hall",
description:"Pitch startup ideas to venture capitalists.",
fee:0,
teamSize:"1-3",
seats:60,
lifecycle:"upcoming"
},

{
id:4,
title:"Robotics Challenge",
university:"IIT Bombay",
city:"Mumbai",
state:"Maharashtra",
coordinates:{lat:19.133,lng:72.913},
category:"Robotics",
startDate:"2026-03-20",
endDate:"2026-03-22",
location:"Mechanical Block",
description:"Autonomous robotics competition.",
fee:300,
teamSize:"3-5",
seats:80,
lifecycle:"upcoming"
},

{
id:5,
title:"Cultural Fest Rhythm",
university:"Delhi University",
city:"Delhi",
state:"Delhi",
coordinates:{lat:28.686,lng:77.209},
category:"Festival",
startDate:"2026-03-25",
endDate:"2026-03-27",
location:"Central Ground",
description:"Dance, music and theatre festival.",
fee:150,
teamSize:"Group",
seats:800,
lifecycle:"upcoming"
},

{
id:6,
title:"National Debate Championship",
university:"JNU",
city:"Delhi",
state:"Delhi",
coordinates:{lat:28.538,lng:77.165},
category:"Debate",
startDate:"2026-03-15",
endDate:"2026-03-15",
location:"Seminar Complex",
description:"Inter university debate competition.",
fee:100,
teamSize:"Individual",
seats:100,
lifecycle:"upcoming"
},

{
id:7,
title:"FinTech Workshop",
university:"BITS Pilani",
city:"Pilani",
state:"Rajasthan",
coordinates:{lat:28.362,lng:75.587},
category:"Workshop",
startDate:"2026-03-16",
endDate:"2026-03-17",
location:"Tech Lab",
description:"Building fintech products using blockchain.",
fee:250,
teamSize:"Individual",
seats:90,
lifecycle:"upcoming"
},

{
id:8,
title:"BioTech Innovation Meet",
university:"IIT Kharagpur",
city:"Kharagpur",
state:"West Bengal",
coordinates:{lat:22.314,lng:87.310},
category:"Conference",
startDate:"2026-03-21",
endDate:"2026-03-21",
location:"Biotech Hall",
description:"Emerging biotechnology innovations.",
fee:400,
teamSize:"Individual",
seats:150,
lifecycle:"upcoming"
},

{
id:9,
title:"Gaming Tournament",
university:"VIT Vellore",
city:"Vellore",
state:"Tamil Nadu",
coordinates:{lat:12.971,lng:79.158},
category:"Gaming",
startDate:"2026-03-28",
endDate:"2026-03-29",
location:"Student Center",
description:"National e-sports gaming competition.",
fee:200,
teamSize:"3-5",
seats:100,
lifecycle:"upcoming"
},

{
id:10,
title:"Photography Contest",
university:"Manipal University",
city:"Manipal",
state:"Karnataka",
coordinates:{lat:13.352,lng:74.792},
category:"Photography",
startDate:"2026-03-30",
endDate:"2026-03-30",
location:"Arts Block",
description:"Capture campus life through lens.",
fee:50,
teamSize:"Individual",
seats:200,
lifecycle:"upcoming"
},

/* ================================
ONGOING EVENTS
================================ */

{
id:20,
title:"Cybersecurity Championship",
university:"NIET",
city:"Greater Noida",
state:"Uttar Pradesh",
coordinates:{lat:28.473,lng:77.503},
category:"Cybersecurity",
startDate:"2026-03-05",
endDate:"2026-03-08",
location:"Computer Center",
description:"Live cyber attack simulation challenge.",
lifecycle:"ongoing",
progress:[
{stage:"Event Started",time:"5 Mar 09:00 AM"},
{stage:"Round 1 Completed",time:"6 Mar 02:00 PM"},
{stage:"Final Round Ongoing",time:"7 Mar 10:00 AM"}
]
},

{
id:21,
title:"Robotics Expo",
university:"GL Bajaj Institute of Technology",
city:"Greater Noida",
state:"Uttar Pradesh",
coordinates:{lat:28.474,lng:77.505},
category:"Exhibition",
startDate:"2026-03-06",
endDate:"2026-03-08",
location:"Engineering Block",
description:"Robotics prototypes demonstration.",
lifecycle:"ongoing",
progress:[
{stage:"Expo Started",time:"6 Mar 10:00 AM"},
{stage:"Judging Phase",time:"7 Mar 01:00 PM"}
]
},

/* ================================
COMPLETED EVENTS
================================ */

{
id:40,
title:"Data Science Hackathon",
university:"Amity University",
city:"Noida",
state:"Uttar Pradesh",
coordinates:{lat:28.544,lng:77.333},
category:"Hackathon",
completedAt:"2026-03-01T10:00:00",
lifecycle:"completed",
description:"Urban problem solving using data science.",
winners:[
{position:1,team:"Team Alpha",project:"Smart Waste Segregator"},
{position:2,team:"Team Beta",project:"AI Attendance Tracker"}
]
},

{
id:41,
title:"National Coding Olympiad",
university:"IIT Kanpur",
city:"Kanpur",
state:"Uttar Pradesh",
coordinates:{lat:26.512,lng:80.232},
category:"Programming",
completedAt:"2026-03-02T18:00:00",
lifecycle:"completed",
description:"Competitive programming challenge.",
winners:[
{position:1,team:"AlgoMasters"}
]
}

];