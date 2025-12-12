SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxABC123DEF456GHI789/exec";

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

  // CORS-proof "pixel" GET request
  const qs = new URLSearchParams({
    firstName,
    lastName,
    email,
    t: Date.now().toString() // cache-buster
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
    // Even if blocked by something, it often still hit the server;
    // but show an error so user can retry.
    console.error("Newsletter submit failed (image ping).");
    if (messageEl) {
      messageEl.textContent = "❌ Sorry — something went wrong. Please try again.";
      messageEl.style.color = "red";
    }
  };

  img.src = `${SCRIPT_URL}?${qs.toString()}`;
});
