const express = require('express');
const router = express.Router();
const { contactUser } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { message: "Too many messages sent from this IP, please try again after a minute" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', authMiddleware, contactLimiter, contactUser);

module.exports = router;
