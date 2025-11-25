// =====================================

// Newsletter form -> Google Sheet submit

// =====================================
 
// IMPORTANT: paste your Apps Script Web App URL here (NO trailing quotes!)

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFSW8lYZKXMhcMmNf_XmaF-HC-ugp7kKZ94wg_JbBIsBNeMz-IqTZkfArX6-lBMpOlTA/exec";
 
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("newsletterForm");

  const message = document.querySelector(".form-message");
 
  if (!form) {

    console.warn("newsletterForm not found.");

    return;

  }
 
  form.addEventListener("submit", async function (e) {

    e.preventDefault();
 
    const payload = {

      firstName: form.firstName.value.trim(),

      lastName: form.lastName.value.trim(),

      email: form.email.value.trim()

    };
 
    message.textContent = "Submitting...";

    message.style.color = "#f7b733";
 
    try {

      // no-cors avoids preflight/CORS blocks.

      await fetch(SCRIPT_URL, {

        method: "POST",

        mode: "no-cors",

        headers: { "Content-Type": "text/plain;charset=utf-8" },

        body: JSON.stringify(payload)

      });
 
      // If fetch doesn't throw, we assume success.

      message.textContent = "🎉 Thanks for joining the newsletter!";

      message.style.color = "#f7b733";

      form.reset();
 
    } catch (err) {

      console.error("Newsletter submit failed:", err);

      message.textContent = "❌ Sorry — something went wrong. Please try again.";

      message.style.color = "red";

    }

  });
 
 
  // -----------------------------

  // Fade-in Scroll Effect (yours)

  // -----------------------------

  const fadeElements = document.querySelectorAll(".sub-hero-card, .newsletter");
 
  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) entry.target.classList.add("fade-in");

    });

  }, { threshold: 0.2 });
 
  fadeElements.forEach(el => observer.observe(el));

});

 