const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxpSMOOhzI_L7u7P82ydtGgOgShOuBZR4gFVXbGxextIK6hLlFJmQj5ngxVWQ6VM71NZw/exec";
 
document.addEventListener("DOMContentLoaded", () => {

  console.log("NEW script.js loaded v2");
 
  const form = document.getElementById("newsletterForm");

  const message = document.querySelector(".form-message");
 
  if (!form) {

    console.warn("newsletterForm not found");

    return;

  }
 
  // Nuke any inline onsubmit just in case

  form.onsubmit = null;
 
  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    e.stopPropagation();
 
    const payload = {

      firstName: form.firstName.value.trim(),

      lastName: form.lastName.value.trim(),

      email: form.email.value.trim()

    };
 
    console.log("submit fired, about to fetch", payload);
 
    message.textContent = "Submitting...";

    message.style.color = "#f7b733";
 
    try {

      const res = await fetch(SCRIPT_URL, {

        method: "POST",

        mode: "cors",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload)

      });
 
      console.log("fetch response status", res.status);
 
      const result = await res.json();

      console.log("result", result);
 
      if (result.ok) {

        message.textContent = "🎉 Thanks for joining the newsletter!";

        form.reset();

      } else {

        message.textContent = "❌ Error: " + (result.error || "Unknown error");

        message.style.color = "red";

      }

    } catch (err) {

      console.error(err);

      message.textContent = "❌ Network error: " + err.message;

      message.style.color = "red";

    }

  });

});

 