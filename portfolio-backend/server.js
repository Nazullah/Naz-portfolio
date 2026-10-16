require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Needed when hosted behind a proxy (Render, Railway) so rate limiting sees the real IP
app.set("trust proxy", 1);

// ---------- Email ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password, not your normal password
  },
});

// ---------- Middleware ----------
app.use(express.json({ limit: "10kb" }));

const allowedOrigins = (process.env.ALLOWED_ORIGIN || "").split(",").map((o) => o.trim());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
  })
);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 messages per IP per window
  message: { ok: false, error: "Too many messages. Please try again later." },
});

// ---------- Routes ----------
app.get("/", (req, res) => res.send("Portfolio API is running"));

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name = "", email = "", message = "", website = "" } = req.body;

  // Honeypot: real users never fill this hidden field, bots usually do
  if (website) return res.json({ ok: true });

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanMessage = String(message).trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (cleanName.length < 3 || cleanName.length > 80) {
    return res.status(400).json({ ok: false, error: "Name must be 3-80 characters." });
  }
  if (!emailRegex.test(cleanEmail) || cleanEmail.length > 120) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email." });
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
    return res.status(400).json({ ok: false, error: "Message must be 10-2000 characters." });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: cleanEmail,
      subject: `New portfolio message from ${cleanName.replace(/[\r\n]/g, " ")}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ ok: false, error: "Could not send your message. Please try again." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
