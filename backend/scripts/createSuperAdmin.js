import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../src/models/User.js";

// Load environment variables dynamically based on current working directory
dotenv.config();

const createSuperAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("No MONGO_URI found in environment variables.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for SuperAdmin initialization...");

    // Check if any SuperAdmin already exists globally
    const superadminExists = await User.findOne({ role: "superadmin" });
    if (superadminExists) {
      console.log("Superadmin already exists. Exiting securely.");
      process.exit(0);
    }

    const { SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD } = process.env;

    if (!SUPERADMIN_EMAIL || !SUPERADMIN_PASSWORD) {
      console.error("ERROR: Please define SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD in your backend/.env file.");
      process.exit(1);
    }

    // Provision Master Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(SUPERADMIN_PASSWORD, salt);

    await User.create({
      fullName: "Master Admin",
      email: SUPERADMIN_EMAIL.trim().toLowerCase(),
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("SUPERADMIN account securely provisioned and stored in database!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating superadmin:", error.message);
    process.exit(1);
  }
};

createSuperAdmin();
