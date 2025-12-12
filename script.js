
// =====================================
// Newsletter form -> Google Sheet submit
// =====================================

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx3crsHnII7o6d1XHa-V30025ruT_Nx_V6dgdFCrYon6-MMIMQaxS61YqrvCGXrDllaMA/exec";

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
  
    const params = new URLSearchParams({ firstName, lastName, email });
    const bodyString = params.toString();
  
    // ✅ Beacon works best when you pass a Blob
    let sent = false;
    if (navigator.sendBeacon) {
      const blob = new Blob([bodyString], {
        type: "application/x-www-form-urlencoded;charset=UTF-8",
      });
      sent = navigator.sendBeacon(SCRIPT_URL, blob);
    }
  
    // ✅ Fallback: fetch no-cors (response is opaque, but request sends)
    const sendPromise = sent
      ? Promise.resolve()
      : fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          keepalive: true,
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: bodyString,
        });
  
    sendPromise
      .then(() => {
        if (messageEl) {
          messageEl.textContent = "🎉 Thanks for joining the newsletter!";
          messageEl.style.color = "#f7b733";
        }
        form.reset();
      })
      .catch((err) => {
        console.error("Newsletter submit failed:", err);
        if (messageEl) {
          messageEl.textContent = "❌ Sorry — something went wrong. Please try again.";
          messageEl.style.color = "red";
        }
      });
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
