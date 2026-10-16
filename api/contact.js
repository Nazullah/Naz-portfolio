const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const { name = "", email = "", message = "", website = "" } = req.body || {};

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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: cleanEmail,
      subject: `New portfolio message from ${cleanName.replace(/[\r\n]/g, " ")}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Could not send your message. Please try again." });
  }
};
