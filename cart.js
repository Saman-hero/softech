// cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("totalAmount");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

        const discount = 0; // Placeholder for coupon functionality
        const total = subtotal - discount;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
            return;
        }

        cart.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="decrease" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="increase" data-index="${index}">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove" data-index="${index}">Remove</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function handleCartActions(e) {
        const button = e.target;

        if (button.classList.contains("increase")) {
            const index = button.dataset.index;
            cart[index].quantity++;
        } else if (button.classList.contains("decrease")) {
            const index = button.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (button.classList.contains("remove")) {
            const index = button.dataset.index;
            cart.splice(index, 1);
        }

        saveCart();
        renderCartItems();
        updateTotals();
        updateCartCount();
    }

    function applyCoupon() {
        const couponInput = document.getElementById("coupon").value;
        let discount = 0;

        if (couponInput === "DISCOUNT10") {
            discount = 10;
        } else {
            alert("Invalid coupon code.");
        }

        updateTotals();
    }

    document.getElementById("apply-coupon").addEventListener("click", applyCoupon);
    cartItemsContainer.addEventListener("click", handleCartActions);

    renderCartItems();
    updateTotals();
    updateCartCount();
});
