// -----------------------------

// Newsletter Form → Google Sheet

// -----------------------------
 
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxt-jnR_6b6GoHbHgksDqKkzgo31ziZbjbdku8kpZYJfS-Gct7IzH26ov50LEeWAtgH/exec";
 
document.getElementById("newsletterForm").addEventListener("submit", async function(e) {

    e.preventDefault();
 
    const message = document.querySelector(".form-message");
 
    // Grab form values

    const payload = {

        firstName: this.firstName.value.trim(),

        lastName: this.lastName.value.trim(),

        email: this.email.value.trim()

    };
 
    // Show temporary status

    message.textContent = "Submitting...";

    message.style.color = "#f7b733";  // your existing color
 
    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(payload)

        });
 
        const result = await response.json();
 
        if (result.ok) {

            message.textContent = "🎉 Thanks for joining the newsletter!";

            this.reset();

        } else {

            message.textContent = "❌ Error: " + (result.error || "Unknown error");

            message.style.color = "red";

        }
 
    } catch (err) {

        message.textContent = "❌ Network error: " + err.message;

        message.style.color = "red";

    }

});
 
 
// -----------------------------

// Fade-in Scroll Effect

// -----------------------------
 
const fadeElements = document.querySelectorAll('.sub-hero-card, .newsletter');
 
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('fade-in');

        }

    });

}, { threshold: 0.2 });
 
fadeElements.forEach(el => observer.observe(el));

 