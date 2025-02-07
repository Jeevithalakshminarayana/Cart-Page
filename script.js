document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
});

let cartData = [
    {
        id: 1,
        title: "Luxury Sofa",
        quality: "Premium Leather Finish",
        quantity: 1,
        price: 30000,
        image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png"
    },
    {
        id: 2,
        title: "Comfortable Chair",  // Changed Elegant Chair to Comfortable Chair
        quality: "Ergonomic & Stylish",
        quantity: 2,
        price: 15000,
        image: "https://i.pinimg.com/originals/c5/e7/1d/c5e71d40ca80fa9cc2d1b87cedf7e9df.jpg"  // Change the image if needed
    }
];

function loadCartItems() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    cartData.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        setTimeout(() => cartItem.classList.add("show"), index * 200); // Sliding effect

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h3>${item.title}</h3>
                <p class="item-quality"><strong>Quality:</strong> ${item.quality}</p>
                <p>₹${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="decrease-btn" data-id="${item.id}">−</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="increase-btn" data-id="${item.id}">+</button>
            </div>
            <div class="item-price">
                <p>Total: ₹<span data-id="${item.id}-subtotal">${item.price * item.quantity}</span></p>
            </div>
            <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i> Delete</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", event => updateQuantity(event, 1));
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", event => updateQuantity(event, -1));
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", removeItem);
    });
}

function updateQuantity(event, change) {
    let itemId = event.target.dataset.id;
    let input = document.querySelector(`.quantity-input[data-id="${itemId}"]`);
    input.value = Math.max(1, parseInt(input.value) + change);

    let item = cartData.find(item => item.id == itemId);
    item.quantity = parseInt(input.value);
    document.querySelector(`.item-price span[data-id="${itemId}-subtotal"]`).textContent = item.price * item.quantity;
    updateCartTotals();
}

function updateCartTotals() {
    let total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("subtotal").textContent = total;
    document.getElementById("total").textContent = total;
}

function removeItem(event) {
    let itemId = event.target.closest(".remove-btn").dataset.id;
    cartData = cartData.filter(item => item.id !== itemId);
    loadCartItems();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Proceeding to checkout!");
});