// main.js - theme toggle, smooth scroll, AOS init, contact form

// Theme toggle (Dark / Light) with localStorage
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    body.classList.add("light-mode");
    if (themeIcon) themeIcon.className = "bi bi-sun";
  } else {
    body.classList.remove("light-mode");
    if (themeIcon) themeIcon.className = "bi bi-moon-stars";
  }
}
applySavedTheme();

themeToggle?.addEventListener("click", () => {
  // Rotation animation
  themeIcon.classList.add("rotate");
  setTimeout(() => themeIcon.classList.remove("rotate"), 500);

  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeIcon.className = "bi bi-sun";
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.className = "bi bi-moon-stars";
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = a.getAttribute("href");
    if (target.length > 1) {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
      // close navbar on mobile if open
      const navCollapse = document.querySelector(".navbar-collapse");
      if (navCollapse && navCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navCollapse).toggle();
      }
    }
  });
});

// Init AOS (Animate on Scroll) - library loaded in HTML
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ duration: 900, offset: 120, once: true });
  // Scroll-to-top button init: show when scrolled down
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 300) scrollBtn.classList.add("show");
      else scrollBtn.classList.remove("show");
    };
    // initial check
    toggleScrollBtn();
    window.addEventListener("scroll", toggleScrollBtn, { passive: true });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// Contact form behaviour — send form data to WhatsApp
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const message = document.getElementById("message")?.value.trim() || "";

  // Basic validation
  if (!name || !message) {
    alert("من فضلك اكتب اسمك والرسالة قبل الإرسال.");
    return;
  }

  // Use international format without +. User requested 01155054433 -> 201155054433
  const phone = "201155054433";

  const text = `اسم: ${name}\nالبريد: ${email}\n\nالرسالة:\n${message}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  // Open WhatsApp in a new tab/window
  window.open(url, "_blank");

  // Optional: reset the form after opening WhatsApp
  form.reset();
});
