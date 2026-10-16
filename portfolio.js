// ---------- Mobile menu ----------
const menuBtn = document.querySelector(".menu-icon");
const navLinks = document.querySelector("#nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close the menu when a link is clicked (registered once, not on every click)
navLinks.addEventListener("click", () => {
  navLinks.classList.remove("active");
});

// ---------- Back to top button ----------
const topBtn = document.getElementById("top-btn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Contact form ----------
// Change this to your deployed backend URL (use http://localhost:3000 while testing)
const API_URL = "http://localhost:3000/api/contact";

const form = document.querySelector(".contact-form");
const senderName = document.querySelector("#sender-name");
const senderEmail = document.querySelector("#sender-email");
const message = document.querySelector("#massage");
const honeypot = document.querySelector("#website");
const statusEl = document.querySelector("#form-status");
const submitBtn = form.querySelector("button[type='submit']");

const nameError = document.querySelector("#n-error");
const emailError = document.querySelector("#e-error");
const messageError = document.querySelector("#m-error");

function showStatus(text, isError) {
  statusEl.textContent = text;
  statusEl.style.display = "block";
  statusEl.style.color = isError ? "#e74c3c" : "#2ecc71";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.style.display = "none";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameOk = senderName.value.trim().length >= 3;
  const emailOk = emailRegex.test(senderEmail.value.trim());
  const messageOk = message.value.trim().length >= 10;

  nameError.style.display = nameOk ? "none" : "block";
  emailError.style.display = emailOk ? "none" : "block";
  messageError.style.display = messageOk ? "none" : "block";

  if (!nameOk || !emailOk || !messageOk) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: senderName.value.trim(),
        email: senderEmail.value.trim(),
        message: message.value.trim(),
        website: honeypot ? honeypot.value : "",
      }),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      showStatus("Message sent successfully! I'll get back to you soon.", false);
      form.reset();
    } else {
      showStatus(data.error || "Something went wrong. Please try again.", true);
    }
  } catch (error) {
    showStatus("Could not reach the server. Please try again later.", true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
