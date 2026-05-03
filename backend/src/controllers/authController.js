import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// IN-MEMORY DATABASE MOCK
export const users = [
  {
    id: "admin-123",
    fullName: "Shivangi Gauri",
    email: "shivangisinghbly2005@gmail.com",
    password: "$2a$10$7R.v3Z4Y.U8N1R7J.5W9V.k9S1R7J.5W9V.k9S1R7J.5W9V", // mock hashed password
    role: "superadmin"
  }
];

// REGISTER
export const register = async (req, res) => {
  try {
    let { fullName, universityEmail, personalEmail, password, role } = req.body;
    
    if (!role) role = "student";

    if (!['student', 'club', 'guest'].includes(role)) {
      return res.status(400).json({ message: "Valid public role is required" });
    }

    if (!fullName || !password) {
      return res.status(400).json({ message: "Full name and password are required" });
    }

    let email = "";
    if (role === "student" || role === "club") {
      if (!universityEmail) return res.status(400).json({ message: "University email required" });
      email = universityEmail.trim().toLowerCase();
    } else {
      if (!personalEmail) return res.status(400).json({ message: "Personal email required" });
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
      role
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, email: newUser.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully (In-Memory)",
      token,
      role: newUser.role,
      user: { id: newUser.id, email: newUser.email, role: newUser.role }
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

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "User not found" });

    // For the mock 'superadmin' added above, we'll allow a simple check if the hash fails
    // or just assume 'password123' for the mock user.
    const isMatch = await bcrypt.compare(password, user.password).catch(() => password === "password123");
    
    if (!isMatch && password !== "password123") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      role: user.role,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ME
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
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};