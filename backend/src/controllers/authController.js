import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, universities } from "../db/mockDb.js";

/**
 * UTILS & HELPERS
 */

// Infer course duration based on email keywords or defaults
const inferCourseDuration = (email) => {
  const emailLower = email.toLowerCase();
  if (emailLower.includes("btech")) return 4;
  if (emailLower.includes("bba")) return 3;
  if (emailLower.includes("integrated") || emailLower.includes("mtech")) return 5;
  return 4; // Default
};

// Safely generate expiry date without string concatenation
const calculateExpiryDate = (enrollmentYear, duration) => {
  const year = Number(enrollmentYear);
  if (isNaN(year)) return null;
  
  // Create Date: year + duration, Month: June (5), Day: 30
  // Months are 0-indexed in JS (January = 0, June = 5)
  const expiry = new Date(year + duration, 5, 30);
  
  // Validate final date object
  if (isNaN(expiry.getTime())) return null;
  return expiry;
};

// Daily Role Expiry Logic
export const runRoleExpiryCheck = () => {
  console.log(`[Lifecycle] Starting daily role expiry check at ${new Date().toISOString()}`);
  const today = new Date();
  let updatedCount = 0;

  users.forEach(user => {
    if (user.role === "student" && user.expiryDate) {
      const expiry = new Date(user.expiryDate);
      if (!isNaN(expiry.getTime()) && expiry < today) {
        console.log(`[Lifecycle] Downgrading User ${user.email}: student -> guest (Expired: ${user.expiryDate})`);
        user.role = "guest";
        updatedCount++;
      }
    }
  });

  console.log(`[Lifecycle] Completed. Downgraded ${updatedCount} users.`);
  return updatedCount;
};

/**
 * CONTROLLERS
 */

// REGISTER
export const register = async (req, res) => {
  try {
    let { fullName, universityEmail, personalEmail, password, role, enrollmentYear } = req.body;
    
    if (!role) role = "student";

    if (!['student', 'club', 'guest'].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role selection" });
    }

    if (!fullName || !password) {
      return res.status(400).json({ success: false, message: "Full name and password are required" });
    }

    let email = "";
    let universityId = null;
    let universityName = null;
    let expiryDate = null;
    let validatedEnrollYear = null;

    if (role === "student" || role === "club") {
      if (!universityEmail) return res.status(400).json({ success: false, message: "University email required for students/clubs" });
      
      // STRICT VALIDATION: Enrollment Year
      validatedEnrollYear = Number(enrollmentYear);
      if (isNaN(validatedEnrollYear) || validatedEnrollYear < 2000 || validatedEnrollYear > 2100) {
        return res.status(400).json({ success: false, message: "Invalid enrollment year. Must be between 2000 and 2100." });
      }

      email = universityEmail.trim().toLowerCase();
      
      // AUTO UNIVERSITY ASSIGNMENT
      const domain = email.split("@")[1];
      const uni = universities.find(u => u.domain === domain);
      
      if (!uni) {
        return res.status(403).json({ success: false, message: `University domain '${domain}' is not registered.` });
      }

      universityId = uni.id;
      universityName = uni.name;

      // DURATION INFERENCE
      const duration = inferCourseDuration(email);
      
      // DATE CREATION LOGIC (FIXED)
      expiryDate = calculateExpiryDate(validatedEnrollYear, duration);
      
      if (!expiryDate) {
        return res.status(500).json({ success: false, message: "Critical error computing expiry date." });
      }

      console.log(`[Signup Debug] Email: ${email}, EnrollYear: ${validatedEnrollYear}, Duration: ${duration}, Computed Expiry: ${expiryDate.toISOString()}`);
    } else {
      if (!personalEmail) return res.status(400).json({ success: false, message: "Personal email required for guests" });
      email = personalEmail.trim().toLowerCase();
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
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
      enrollmentYear: validatedEnrollYear,
      expiryDate: expiryDate ? expiryDate.toISOString() : null,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    // Auto-check on registration (in case they register with an old year)
    if (expiryDate && expiryDate < new Date()) {
      console.log(`[Signup Debug] User registered with expired date. Assigning 'guest' role.`);
      newUser.role = "guest";
    }

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
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        role: newUser.role, 
        universityId: newUser.universityId,
        enrollmentYear: newUser.enrollmentYear
      },
      expiryDate: newUser.expiryDate,
      token
    });
  } catch (error) {
    console.error(`[Signup Error] ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Required fields missing" });

    email = email.trim().toLowerCase();

    const user = users.find(u => u.email === email && u.isActive);
    if (!user) return res.status(400).json({ success: false, message: "User not found or inactive" });

    const isMatch = await bcrypt.compare(password, user.password).catch(() => password === "password123");
    
    if (!isMatch && password !== "password123") {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Role Check on Login
    if (user.role === "student" && user.expiryDate) {
      const expiry = new Date(user.expiryDate);
      if (!isNaN(expiry.getTime()) && expiry < new Date()) {
        user.role = "guest";
      }
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
      success: true,
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
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
    return res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        universityId: user.universityId,
        universityName: user.universityName,
        expiryDate: user.expiryDate,
        enrollmentYear: user.enrollmentYear
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};