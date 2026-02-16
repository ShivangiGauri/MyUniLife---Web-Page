const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { fullName, universityEmail, personalEmail, studyYear, role, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { universityEmail },
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
        role,
        passwordHash: hashedPassword,
      },
    });

    res.status(201).json({
  message: "User created successfully",
  user: {
    id: user.id,
    fullName: user.fullName,
    universityEmail: user.universityEmail,
    role: user.role
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { universityEmail, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { universityEmail },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
