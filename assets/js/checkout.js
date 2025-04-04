document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPriceElement = document.querySelector("p strong");
    const paymentOptions = document.querySelectorAll(".payment-option");
    const selectedPaymentInput = document.getElementById("selected-payment");
    const checkoutForm = document.querySelector(".checkout-form");
    let selectedPayment = "";


    if (!totalPriceElement || !checkoutForm || paymentOptions.length === 0) {
        console.error("One or more required elements are missing in the checkout page.");
        return;
    }

    function updateOrderSummary() {
        let totalPrice = 0;
        let summaryHTML = `<h3>Order Summary</h3>`;

        if (cart.length === 0) {
            summaryHTML += `<p>Your cart is empty.</p>`;
        } else {
            cart.forEach((item) => {
                let productTotal = item.price * item.quantity;
                totalPrice += productTotal;

                summaryHTML += `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" width="50">
                        <span>${item.name} (x${item.quantity})</span>
                        <strong>₹ ${productTotal}</strong>
                    </div>
                `;
            });
        }

        totalPriceElement.textContent = `₹ ${totalPrice}`;
        document.querySelector(".checkout-form").insertAdjacentHTML("beforeend", summaryHTML);
    }

    paymentOptions.forEach(option => {
        option.addEventListener("click", (event) => {

            paymentOptions.forEach(opt => opt.classList.remove("selected"));
            

            event.currentTarget.classList.add("selected");

            selectedPayment = event.currentTarget.dataset.value;
            selectedPaymentInput.value = selectedPayment;
            console.log(`Payment selected: ${selectedPayment}`);
        });
    });

    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !phone || !address || !selectedPayment) {
            showMessage("Please fill in all details and select a payment method.", "error");
            return;
        }

        const orderDetails = {
            name,
            phone,
            address,
            paymentMethod: selectedPayment,
            cart,
            total: totalPriceElement.textContent
        };

        localStorage.setItem("order", JSON.stringify(orderDetails));
        localStorage.removeItem("cart");

        showMessage("Order Placed Successfully!", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });

    function showMessage(message, type) {
        let msgElement = document.querySelector(".message");
        if (!msgElement) {
            msgElement = document.createElement("p");
            msgElement.classList.add("message");
            checkoutForm.appendChild(msgElement);
        }
        msgElement.textContent = message;
        msgElement.className = `message ${type}`;
    }

    updateOrderSummary();
});
