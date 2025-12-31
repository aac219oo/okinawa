const toggle = document.querySelector(".toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav ul li a");
const loginBtn = document.querySelector(".login-btn");
const loginModal = document.querySelector("#login-modal");
const closeModalBtn = document.querySelector(".close-btn");

// Toggle Mobile Menu
toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
});

// Close Mobile Menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        toggle.classList.remove("active");
        nav.classList.remove("active");
    });
});

// Login Modal Logic
loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    loginModal.showModal();
});

closeModalBtn.addEventListener("click", () => {
    loginModal.close();
});

// Close modal when clicking outside
loginModal.addEventListener("click", (e) => {
    const dialogDimensions = loginModal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        loginModal.close();
    }
});
