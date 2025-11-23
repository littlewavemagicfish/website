// Newsletter Form
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const message = document.querySelector(".form-message");
    message.textContent = "Thanks for joining the newsletter!";
    message.style.color = "#f7b733";
    this.reset();
});

// Fade-in scroll effect
const fadeElements = document.querySelectorAll('.sub-hero-card, .newsletter');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));
