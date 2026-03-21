import express from "express";
import fs from "fs/promises";
import path from "path";
import { upload } from "../../middleware/uploadMiddleware.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { scanFile } from "../../utils/fileScanner.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    await scanFile(req.file.buffer);

    const sanitizedName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueFilename = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(process.cwd(), "uploads", uniqueFilename);

    await fs.writeFile(filePath, req.file.buffer);

    res.json({
      success: true,
      message: "File uploaded successfully",
      filePath: `/uploads/${uniqueFilename}`
    });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
});

export default router;
