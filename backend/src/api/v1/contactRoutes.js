import express from "express";
import { contactUser } from "../../controllers/contactController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";
import { transporter } from "../../config/mailer.js";

const router = express.Router();

// Original route
router.post('/', verifyToken, contactUser);

// New Nodemailer route
router.post("/send", async (req, res) => {
  let { name, email, subject, message, role } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  // Security & cleanup
  subject = subject.trim();
  message = message.trim();
  if (message.length > 1000) {
    return res.status(400).json({ success: false, message: "Message too long (max 1000 chars)" });
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: `[MyUniLife] ${subject}`,
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

export default router;
