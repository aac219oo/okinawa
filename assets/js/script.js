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

// Service Items Modal Logic
const startBtn = document.querySelector(".start");
const searchBtn = document.querySelector(".search-btn");
const serviceModal = document.querySelector("#service-modal");
const serviceCloseBtn = serviceModal.querySelector(".close-btn");
const serviceTitle = document.querySelector("#service-title");
const searchContainer = document.querySelector("#search-container");
const serviceSearchInput = document.querySelector("#service-search");
const serviceListItems = document.querySelectorAll(".service-list li");

// Function to open Service Modal in specific mode
function openServiceModal(mode) {
    if (mode === 'popular') {
        serviceTitle.textContent = "熱門租借方案";
        searchContainer.classList.add("hidden");
        // Show only popular items
        serviceListItems.forEach(item => {
            if (item.dataset.popular === "true") {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    } else if (mode === 'search') {
        serviceTitle.textContent = "服務項目搜尋";
        searchContainer.classList.remove("hidden");
        // Show all items initially
        serviceListItems.forEach(item => item.classList.remove("hidden"));
        // Clear previous search
        serviceSearchInput.value = "";
    }
    serviceModal.showModal();
}

// Event Listeners for Service Modal
startBtn.addEventListener("click", () => {
    openServiceModal('popular');
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openServiceModal('search');
});

serviceCloseBtn.addEventListener("click", () => {
    serviceModal.close();
});

serviceModal.addEventListener("click", (e) => {
    const dialogDimensions = serviceModal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        serviceModal.close();
    }
});

// Search Filtering Logic
serviceSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    serviceListItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
});

// Shopping Cart Logic
const cartBtn = document.querySelector(".cart-btn");
const cartCountBubble = document.querySelector(".cart-count");
const cartModal = document.querySelector("#cart-modal");
const cartCloseBtn = cartModal.querySelector(".close-btn");
const cartList = document.querySelector(".cart-list");
const totalPriceEl = document.querySelector("#total-price");
const addToCartBtns = document.querySelectorAll(".add-to-cart");

let cart = [];

// Update Cart Count in Header
function updateCartCount() {
    cartCountBubble.textContent = cart.length;
}

// Calculate Total Price
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Render Cart Items
function renderCart() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        cartList.innerHTML = "<li>您的購物車是空的 (Your cart is empty)</li>";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price}</span>
                </div>
                <button class="remove-btn" data-index="${index}">&times;</button>
            `;
            cartList.appendChild(li);
        });

        // Add event listeners to remove buttons
        const removeBtns = document.querySelectorAll(".remove-btn");
        removeBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                removeFromCart(index);
            });
        });
    }
    totalPriceEl.textContent = calculateTotal();
}

// Add Item to Cart
// Toast Notification Function
function showToast(message) {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300); // Wait for transition
    }, 3000);
}

// Add Item to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    showToast(`已加入購物車: ${name}`);
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart(); // Re-render to show updated list
}

// Add to Cart Buttons Event Listener
addToCartBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const item = e.target.closest("li");
        const name = item.querySelector(".name").textContent;
        // Parse price from data-price attribute (ensure it's an integer)
        const price = parseInt(item.dataset.price);
        addToCart(name, price);
    });
});

// Open Cart Modal
cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    renderCart();
    cartModal.showModal();
});

// Close Cart Modal
cartCloseBtn.addEventListener("click", () => {
    cartModal.close();
});

// Close Cart Modal when clicking outside
cartModal.addEventListener("click", (e) => {
    const dialogDimensions = cartModal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        cartModal.close();
    }
});
