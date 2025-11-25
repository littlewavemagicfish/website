// =====================================

// Newsletter form -> Google Sheet submit

// =====================================
 
// IMPORTANT: Paste your Apps Script Web App URL here (NO trailing quotes!)

const SCRIPT_URL =

  "https://script.google.com/macros/s/AKfycbxuJNFYi3M3NQ9y2IpzeWUd1_cRuAJqGAhN9D3IEnCssS8UeRak7WT595jeW2Z5-i7-Uw/exec";
 
document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------

  // Newsletter Form Handler

  // -----------------------------

  const form = document.getElementById("newsletterForm");

  const messageEl = document.querySelector(".form-message");
 
  if (!form) {

    console.warn("newsletterForm not found — skipping newsletter JS.");

  } else {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      e.stopPropagation();
 
      const firstName = form.elements["firstName"]?.value.trim() || "";

      const lastName  = form.elements["lastName"]?.value.trim() || "";

      const email     = form.elements["email"]?.value.trim() || "";
 
      const payload = { firstName, lastName, email };
 
      if (messageEl) {

        messageEl.textContent = "Submitting...";

        messageEl.style.color = "#f7b733";

      }
 
      try {

        // no-cors avoids preflight/CORS blocks.

        await fetch(SCRIPT_URL, {

          method: "POST",

          mode: "no-cors",

          headers: {

            "Content-Type": "text/plain;charset=utf-8"

          },

          body: JSON.stringify(payload)

        });
 
        // If fetch doesn't throw, assume success.

        if (messageEl) {

          messageEl.textContent = "🎉 Thanks for joining the newsletter!";

          messageEl.style.color = "#f7b733";

        }

        form.reset();

      } catch (err) {

        console.error("Newsletter submit failed:", err);

        if (messageEl) {

          messageEl.textContent =

            "❌ Sorry — something went wrong. Please try again.";

          messageEl.style.color = "red";

        }

      }

    });

  }
 
  // -----------------------------

  // Fade-in Scroll Effect

  // -----------------------------

  const fadeElements = document.querySelectorAll(".sub-hero-card, .newsletter");

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

 