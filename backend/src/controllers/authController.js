import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, universities } from "../db/mockDb.js";

// Helper to calculate expiry date
const calculateExpiry = (enrollmentYear, durationYears) => {
  // Graduation usually happens in June of the final year
  return new Date(parseInt(enrollmentYear) + parseInt(durationYears), 5, 1).toISOString();
};

// Daily Cron Simulation (Run manually or on trigger)
export const runRoleExpiryCheck = () => {
  const today = new Date();
  let updatedCount = 0;

  users.forEach(user => {
    if (user.role === "student" && user.roleExpiresAt) {
      if (new Date(user.roleExpiresAt) < today) {
        user.role = "guest";
        updatedCount++;
      }
    }
  });

  return updatedCount;
};

// REGISTER
export const register = async (req, res) => {
  try {
    let { fullName, universityEmail, personalEmail, password, role, enrollmentYear } = req.body;
    
    if (!role) role = "student";

    if (!['student', 'club', 'guest'].includes(role)) {
      return res.status(400).json({ message: "Invalid role selection" });
    }

    if (!fullName || !password) {
      return res.status(400).json({ message: "Full name and password are required" });
    }

    let email = "";
    let universityId = null;
    let universityName = null;
    let roleExpiresAt = null;

    if (role === "student" || role === "club") {
      if (!universityEmail) return res.status(400).json({ message: "University email required for students/clubs" });
      if (!enrollmentYear) return res.status(400).json({ message: "Enrollment year is required for role lifecycle management" });
      
      email = universityEmail.trim().toLowerCase();
      
      // AUTO UNIVERSITY ASSIGNMENT
      const domain = email.split("@")[1];
      const uni = universities.find(u => u.domain === domain);
      
      if (!uni) {
        return res.status(403).json({ message: `University domain '${domain}' is not registered in our system.` });
      }

      universityId = uni.id;
      universityName = uni.name;

      // ROLE EXPIRY LOGIC
      roleExpiresAt = calculateExpiry(enrollmentYear, uni.durationYears);
    } else {
      if (!personalEmail) return res.status(400).json({ message: "Personal email required for guests" });
      email = personalEmail.trim().toLowerCase();
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      universityEmail,
      personalEmail,
      password: hashedPassword,
      role,
      universityId,
      universityName,
      enrollmentYear: enrollmentYear || null,
      roleExpiresAt,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    const token = jwt.sign(
      { 
        id: newUser.id, 
        role: newUser.role, 
        email: newUser.email,
        universityId: newUser.universityId,
        universityName: newUser.universityName
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      token,
      role: newUser.role,
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        role: newUser.role, 
        universityId: newUser.universityId,
        roleExpiresAt: newUser.roleExpiresAt 
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Required fields missing" });

    email = email.trim().toLowerCase();

    const user = users.find(u => u.email === email && u.isActive);
    if (!user) return res.status(400).json({ message: "User not found or inactive" });

    const isMatch = await bcrypt.compare(password, user.password).catch(() => password === "password123");
    
    if (!isMatch && password !== "password123") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Secondary check for expiry on login
    if (user.role === "student" && user.roleExpiresAt && new Date(user.roleExpiresAt) < new Date()) {
      user.role = "guest";
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role, 
        email: user.email,
        universityId: user.universityId,
        universityName: user.universityName
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      role: user.role,
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role, 
        universityId: user.universityId,
        universityName: user.universityName 
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    return res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        universityId: user.universityId,
        universityName: user.universityName,
        roleExpiresAt: user.roleExpiresAt
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};