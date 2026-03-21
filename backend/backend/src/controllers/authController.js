const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* SIGNUP */
exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      universityEmail,
      personalEmail,
      studyYear,
      role,
      password
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { universityEmail }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        universityEmail,
        personalEmail,
        studyYear,
        role: role || "student",
        passwordHash: hashedPassword
      }
    });

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { universityEmail, password, role } = req.body;

    await new Promise(r => setTimeout(r, 500));

    const user = await prisma.user.findUnique({
      where: { universityEmail }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      return res.status(403).json({ error: "Too many attempts. Try again later." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    const roleMatch = !(role && user.role !== role);

    if (!isMatch || !roleMatch) {
      user.loginAttempts += 1;
      
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
        user.loginAttempts = 0;
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: user.loginAttempts,
          lockUntil: user.lockUntil
        }
      });

      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.loginAttempts > 0 || user.lockUntil) {
      await prisma.user.update({
        where: { id: user.id },
        data: { loginAttempts: 0, lockUntil: null }
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};