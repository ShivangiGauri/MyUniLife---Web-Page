import express from "express";
import { verifyToken, authorizeRoles } from "../../middleware/authMiddleware.js";
import { 
  createAdmin, getAdmins, deleteAdmin, getUsers, 
  getUniversities, createUniversity, deleteUniversity 
} from "../../controllers/superadminController.js";

const router = express.Router();

router.use(verifyToken, authorizeRoles("superadmin"));

// ADMINS
router.post("/create-admin", createAdmin);
router.get("/admins", getAdmins);
router.delete("/delete-admin/:id", deleteAdmin);

// USERS
router.get("/users", getUsers);

// UNIVERSITIES
router.get("/universities", getUniversities);
router.post("/universities", createUniversity);
router.delete("/universities/:id", deleteUniversity);

export default router;
