document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        const params = new URLSearchParams(window.location.search);
        const selectedCategory = params.get("category") || "All";

        const filteredProducts = selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory);

        displayProducts(filteredProducts);
        // console.log(products);
        
    })
    .catch(error => console.error("Error loading products:", error));


    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", handleCategoryClick);
    });
});

let products = [];
// console.log(products);

const displayProducts = (filteredProducts = products) => {
    const productContainer = document.querySelector(".products");
    productContainer.innerHTML = "";


    if (filteredProducts.length === 0) {
        productContainer.innerHTML = `<p>No products found in this category.</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <a href="product_description.html" class="view-product" data-product='${JSON.stringify(product)}'>
                <img src="${product.image}" alt="${product.category}">
                <br>
                <strong>${product.name}</strong><br>
            </a>
            <strong class="price">${product.price}</strong><br>
            <p>${product.description}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button> 
        `;

        productContainer.appendChild(productDiv);
    });
    attachCartEventListeners();
    attachProductClickEvent();
};

const handleCategoryClick = (event) => {
    event.preventDefault(); 
    const selectedCategory = event.target.getAttribute("category"); 
    // displayProducts(selectedCategory);
    const filteredProducts = selectedCategory === "All" 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    displayProducts(filteredProducts);
};

function attachCartEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const product = {
                name: event.target.dataset.name,
                price: parseInt(event.target.dataset.price),
                image: event.target.dataset.image,
                quantity: 1
            };

            addToCart(product);
            showCartMessage(`${product.name} added to cart!`);
        });
    });
}

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


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function attachProductClickEvent() {
    document.querySelectorAll(".view-product").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            
            const productData = JSON.parse(event.currentTarget.getAttribute("data-product"));
            
            localStorage.setItem("selectedProduct", JSON.stringify(productData));

            window.location.href = "product_description.html";
        });
    });
}

function searchProducts() {
    const searchText = document.getElementById("search-box").value.toLowerCase();
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText) || 
        product.description.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts); 
}