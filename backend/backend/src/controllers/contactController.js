const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

const contactUser = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    
    if (!email || !subject || !message) {
      return res.status(400).json({ error: "Email, subject, and message are required" });
    }
    
    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({ error: "Message must be between 10 and 1000 characters" });
    }
    
    const sender = await prisma.user.findUnique({ where: { id: parseInt(req.userId) } });
    if (!sender) return res.status(401).json({ error: "Sender not found" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `[MyUniLife] New message from ${sender.fullName}`,
      text: `You received a message from ${sender.fullName} (${sender.universityEmail})\n\nSubject: ${subject}\n\nMessage:\n${message}\n\nReply directly to this email to respond.`,
      replyTo: sender.universityEmail
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact Email Error:", error);
    return res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
};

module.exports = { contactUser };
