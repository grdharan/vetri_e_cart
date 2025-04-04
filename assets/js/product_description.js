document.addEventListener("DOMContentLoaded", () => {
    // Get product details from localStorage
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) {
        document.querySelector(".product-description-container").innerHTML = "<p>Product not found.</p>";
        return;
    }

    // Set product details in the DOM
    document.getElementById("product-img").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `₹${product.price}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-information").textContent = product.information || "No additional information available.";

    // Quantity and Cart Functionality
    let quantity = 1;
    const quantityElement = document.getElementById("quantity");
    const increaseBtn = document.getElementById("increase-qty");
    const decreaseBtn = document.getElementById("decrease-qty");
    const addToCartBtn = document.getElementById("add-to-cart");

    increaseBtn.addEventListener("click", () => {
        quantity++;
        updateQuantity();
    });

    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            updateQuantity();
        }
    });

    function updateQuantity() {
        quantityElement.textContent = quantity;
    }

    addToCartBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        showCartMessage(`${product.name} added to cart!`);
    });

    function showCartMessage(message) {
        let cartMessage = document.querySelector(".cart-message");

        if (!cartMessage) {
            cartMessage = document.createElement("div");
            cartMessage.className = "cart-message";
            document.body.appendChild(cartMessage);
        }

        cartMessage.textContent = message;
        cartMessage.style.display = "block";

        setTimeout(() => {
            cartMessage.style.display = "none";
        }, 2000);
    }
});


