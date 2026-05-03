import bcrypt from "bcryptjs";
import { users } from "./authController.js";

// IN-MEMORY UNIVERSITIES
export const universities = [
  { id: "1", name: "MIT", domain: "mit.edu", location: "USA" },
  { id: "2", name: "Stanford", domain: "stanford.edu", location: "USA" }
];

// -- ADMIN MANAGEMENT --
export const createAdmin = async (req, res) => {
  try {
    let { fullName, email, password, universityId, passphrase } = req.body;

    // Required fields validation
    if (!fullName || !email || !password || !universityId) {
      return res.status(400).json({ success: false, message: "Name, email, password, and University selection are required." });
    }

    // Optional Passphrase Validation (if provided)
    const envPassphrase = process.env.ADMIN_PASSPHRASE || "supersecretkey";
    if (passphrase && passphrase !== envPassphrase) {
      return res.status(403).json({ success: false, message: "Invalid security passphrase." });
    }

    const university = universities.find(u => u.id === universityId);
    if (!university) return res.status(404).json({ success: false, message: "Assigned university not found." });

    email = email.trim().toLowerCase();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists with this email." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = {
      id: Date.now().toString(),
      fullName,
      email,
      password: hashedPassword,
      role: "admin",
      universityId,
      universityName: university.name,
      createdAt: new Date().toISOString()
    };

    users.push(admin);
    res.status(201).json({ success: true, message: "Admin created successfully (In-Memory)" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAdmins = async (req, res) => {
  const admins = users.filter(u => u.role === "admin");
  res.json({ success: true, admins });
};

export const deleteAdmin = async (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id && u.role === "admin");
  if (index === -1) return res.status(404).json({ success: false, message: "Admin not found" });
  
  users.splice(index, 1);
  res.json({ success: true, message: "Admin deleted" });
};

// -- USER MANAGEMENT --
export const getUsers = async (req, res) => {
  const filtered = users.filter(u => u.role !== "superadmin");
  res.json({ success: true, users: filtered });
};

// -- UNIVERSITY MANAGEMENT --
export const getUniversities = async (req, res) => {
  res.json({ success: true, universities });
};

export const createUniversity = async (req, res) => {
  const { name, domain, location } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "Name is required" });

  const existing = universities.find(u => u.name === name);
  if (existing) return res.status(400).json({ success: false, message: "University already exists" });

  const newUniversity = { id: Date.now().toString(), name, domain, location };
  universities.push(newUniversity);
  res.status(201).json({ success: true, message: "University added (In-Memory)", university: newUniversity });
};

export const deleteUniversity = async (req, res) => {
  const index = universities.findIndex(u => u.id === req.params.id);
  if (index !== -1) universities.splice(index, 1);
  res.json({ success: true, message: "University deleted" });
};

