import express from "express";
import { verifyToken, authorizeRoles } from "../../middleware/authMiddleware.js";
import { users } from "../../controllers/authController.js";

const router = express.Router();

router.patch("/users/:id/role", verifyToken, authorizeRoles("admin", "superadmin"), async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ["student", "club", "admin", "guest"];
    
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role specified" });
    }

    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role;

    res.json({ success: true, message: `User role updated to ${role} (In-Memory)` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

