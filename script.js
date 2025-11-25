// =====================================

// Newsletter form -> Google Sheet submit

// (reliable, CORS-proof)

// =====================================
 
const SCRIPT_URL =

  "https://script.google.com/macros/s/AKfycbyrZB2CT8VYw6jNAPS6hna3Mz99hqfAd8X8gWL03SxWSK8Lt344L7aFdOn5TaqwfDLXNw/exec";
 
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("newsletterForm");

  const messageEl = document.querySelector(".form-message");
 
  if (!form) {

    console.warn("newsletterForm not found — skipping newsletter JS.");

  } else {

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      e.stopPropagation();
 
      const firstName = form.elements["firstName"]?.value.trim() || "";

      const lastName  = form.elements["lastName"]?.value.trim() || "";

      const email     = form.elements["email"]?.value.trim() || "";
 
      const params = new URLSearchParams({

        firstName,

        lastName,

        email

      });
 
      if (messageEl) {

        messageEl.textContent = "Submitting...";

        messageEl.style.color = "#f7b733";

      }
 
      // Prefer sendBeacon (super reliable for no-cors POST)

      let sent = false;

      if (navigator.sendBeacon) {

        sent = navigator.sendBeacon(SCRIPT_URL, params);

      }
 
      // Fallback to fetch(no-cors) if beacon not supported or fails

      if (!sent) {

        fetch(SCRIPT_URL, {

          method: "POST",

          mode: "no-cors",

          headers: {

            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"

          },

          body: params.toString()

        }).catch((err) => {

          console.error("Newsletter submit failed:", err);

          if (messageEl) {

            messageEl.textContent =

              "❌ Sorry — something went wrong. Please try again.";

            messageEl.style.color = "red";

          }

          return;

        });

      }
 
      // We can’t read the response in no-cors mode,

      // so show success immediately.

      if (messageEl) {

        messageEl.textContent = "🎉 Thanks for joining the newsletter!";

        messageEl.style.color = "#f7b733";

      }

      form.reset();

    });

  }
 
  // -----------------------------

  // Fade-in Scroll Effect (yours)

  // -----------------------------

  const fadeElements = document.querySelectorAll(".sub-hero-card, .newsletter");

  if (fadeElements.length > 0) {

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) entry.target.classList.add("fade-in");

        });

      },

      { threshold: 0.2 }

    );

    fadeElements.forEach((el) => observer.observe(el));

  }

});

 