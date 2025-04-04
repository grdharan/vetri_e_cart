document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.querySelector(".cart-table");
    const totalPriceElement = document.querySelector(".total-price");
    const checkoutButton = document.querySelector(".checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        let totalPrice = 0;
        let cartHTML = `
            <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
            </tr>
        `;

        if (cart.length === 0) {
            cartHTML += `<tr><td colspan="6">Your cart is empty.</td></tr>`;
            checkoutButton.disabled = true;
            checkoutButton.classList.add("disabled");
        } else {
            checkoutButton.disabled = false;
            checkoutButton.classList.remove("disabled"); 

            cart.forEach((product, index) => {
                let productTotal = product.price * product.quantity;
                totalPrice += productTotal;

                cartHTML += `
                    <tr>
                        <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                        <td>${product.name}</td>
                        <td>₹ ${product.price}</td>
                        <td>
                            <div class="quantity-control" data-index="${index}">
                            <button class="decrement-btn">−</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="increment-btn">+</button>
                        </div>
                        </td>
                        <td>₹ ${productTotal}</td>
                        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
                    </tr>
                `;
            });
        }

        cartTable.innerHTML = cartHTML;
        totalPriceElement.textContent = `Total: ₹ ${totalPrice}`;

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", removeItem);
        });

        document.querySelectorAll(".increment-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                let index = event.target.closest(".quantity-control").dataset.index;
                updateQuantity(index, 1);
            });
        });

        document.querySelectorAll(".decrement-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                let index = event.target.closest(".quantity-control").dataset.index;
                updateQuantity(index, -1);
            });
        });
    }

    function removeItem(event) {
        let index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateQuantity(index, change) {
        cart[index].quantity += change;

        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    updateCartDisplay();
});
