
// =====================================
// Newsletter form -> Google Sheet submit
// =====================================

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyP5_vLC1RrVS18nxzHitUuEwqNCbFxD2ybkSEJmi-xcZshMgjL4zGmL84ibHRBog2j6A/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  const messageEl = document.querySelector(".form-message");

  if (!form) {
    console.warn("newsletterForm not found — skipping newsletter JS.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const firstName = form.elements["firstName"]?.value.trim() || "";
    const lastName  = form.elements["lastName"]?.value.trim() || "";
    const email     = form.elements["email"]?.value.trim() || "";

    if (messageEl) {
      messageEl.textContent = "Submitting...";
      messageEl.style.color = "#f7b733";
    }

    // CORS-proof GET ping
    const qs = new URLSearchParams({
      firstName,
      lastName,
      email,
      t: Date.now().toString() // cache buster
    });

    const img = new Image();
    img.onload = () => {
      if (messageEl) {
        messageEl.textContent = "🎉 Thanks for joining the newsletter!";
        messageEl.style.color = "#f7b733";
      }
      form.reset();
    };

    img.onerror = () => {
      console.error("Newsletter submit failed.");
      if (messageEl) {
        messageEl.textContent =
          "❌ Sorry — something went wrong. Please try again.";
        messageEl.style.color = "red";
      }
    };

    img.src = `${SCRIPT_URL}?${qs.toString()}`;
  });

  // -----------------------------
  // Fade-in Scroll Effect
  // -----------------------------
  const fadeElements = document.querySelectorAll(
    ".sub-hero-card, .newsletter"
  );

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }
});
