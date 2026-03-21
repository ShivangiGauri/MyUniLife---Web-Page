import express from "express";
import { verifyToken, authorizeRoles } from "../../middleware/authMiddleware.js";
import User from "../../models/User.js";

const router = express.Router();

router.patch("/users/:id/role", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ["student", "club", "admin", "guest"];
    
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role specified" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ success: true, message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
