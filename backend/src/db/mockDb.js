// IN-MEMORY DATABASE MOCK
// Replicating a scalable multi-university architecture

export const universities = [
  { 
    id: "uni_1", 
    name: "Massachusetts Institute of Technology", 
    domain: "mit.edu", 
    durationYears: 4,
    location: "USA",
    createdAt: new Date("2024-01-01").toISOString()
  },
  { 
    id: "uni_2", 
    name: "Stanford University", 
    domain: "stanford.edu", 
    durationYears: 4,
    location: "USA",
    createdAt: new Date("2024-01-01").toISOString()
  }
];

export const users = [
  {
    id: "sys_sa_1",
    fullName: "Shivangi Gauri",
    email: "shivangisinghbly2005@gmail.com",
    password: "$2a$10$7R.v3Z4Y.U8N1R7J.5W9V.k9S1R7J.5W9V.k9S1R7J.5W9V", // mock hashed password
    role: "superadmin",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "sys_adm_1",
    fullName: "Test Admin",
    email: "admin@mit.edu",
    password: "$2a$10$7R.v3Z4Y.U8N1R7J.5W9V.k9S1R7J.5W9V.k9S1R7J.5W9V",
    role: "admin",
    universityId: "uni_1",
    universityName: "MIT",
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const events = [];
export const issues = [];
export const logs = [];
