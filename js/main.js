(function ($) {
    "use strict";
//PRODUCTS SECTION

    const products = [
        { name: 'Grapes', category: 'Fruits', image: 'img/fruite-item-5.jpg', price: '$4.99 / kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt' },
        { name: 'Raspberries', category: 'Fruits', image: 'img/fruite-item-2.jpg', price: '$4.99 / kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt' },
    ];


    const vegetables = [
        { name: "Parsley", description: "Fresh organic parsley.", price: "$4.99 / kg", image: "img/vegetable-item-6.jpg" },
        { name: "Banana", description: "Sweet and ripe bananas.", price: "$7.99 / kg", image: "img/vegetable-item-3.png" },
        { name: "Tomato", description: "Juicy red tomatoes.", price: "$3.99 / kg", image: "img/vegetable-item-6.jpg" }
    ];

    // Exemple de tableau de produits bestsellers
    const bestSellers = [
        {
            name: "Organic Apple",
            price: "$2.50",
            image: "path/to/apple.jpg",
            description: "Fresh organic apples harvested from local farms.",
            rating: 4
        },
        {
            name: "Fresh Carrot",
            price: "$1.80",
            image: "path/to/carrot.jpg",
            description: "Crunchy and fresh carrots from organic farms.",
            rating: 5
        },
        // Ajoutez d'autres produits ici
    ];


    


    // Spinner Function
    function spinner() {
        setTimeout(() => {
            $('#spinner').removeClass('show');
        }, 1);
    }
    spinner();

    // Fixed Navbar on Scroll
    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop();
        const isMobile = $(window).width() < 992;

        if (isMobile) {
            if (scrollTop > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if (scrollTop > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }

        // Back to top button visibility
        if (scrollTop > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Back to Top Button Action
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonial Carousel Initialization
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 1 },
            992: { items: 2 },
            1200: { items: 2 }
        }
    });

    // Vegetable Carousel Initialization
    function initializeVegetableCarousel() {
        $(".vegetable-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            margin: 25,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 }
            }
        });
    }

    // Modal Video Player
    $(document).ready(function () {
        let $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', `${$videoSrc}?autoplay=1&modestbranding=1&showinfo=0`);
        });

        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Product Quantity Adjustment
    $('.quantity button').on('click', function () {
        const button = $(this);
        const input = button.parent().parent().find('input');
        let newVal = parseFloat(input.val()) + (button.hasClass('btn-plus') ? 1 : -1);
        input.val(Math.max(newVal, 0));
    });

    // Sample Product Data (can be fetched from API)
    
    // Fonction d'ajout au panier
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Récupérer le panier existant ou en créer un vide

    // Vérifier si le produit existe déjà dans le panier
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        // Si le produit existe, augmenter la quantité
        existingProduct.quantity++;
    } else {
        // Si le produit n'existe pas, l'ajouter avec une quantité de 1
        const newProduct = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        cart.push(newProduct);
    }

    // Sauvegarder le panier dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour le compteur du panier
    updateCartCount();
}

    
    
    function updateCartCount() {
        // Récupérer le panier depuis le localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Calculer le nombre total d'articles dans le panier (en tenant compte de la quantité)
        const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
    
        // Sélectionner l'élément où afficher le nombre d'articles
        const cartCountElement = document.getElementById("cart-count");
    
        // Mettre à jour l'affichage du nombre d'articles
        if (cartCountElement) {
            cartCountElement.textContent = totalItems; // Affiche le nombre total d'articles dans le panier
        }
    }
    
    // Appeler updateCartCount à chaque chargement de la page pour afficher la quantité du panier
    document.addEventListener('DOMContentLoaded', updateCartCount);
    
    
    
    // Function to render products in the cart (for cart page)
    function renderProducts() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartContainer = document.getElementById('cartContainer');
    
        // Clear the cart container before rendering
        cartContainer.innerHTML = '';
    
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(product => {
                const productHTML = `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4>${product.name}</h4>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: ${product.quantity}</p>
                            <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `;
                cartContainer.innerHTML += productHTML;
            });
        }
    }
    
    // Call the renderProducts function on page load for cart.html
    if (window.location.pathname.includes('cart.html')) {
        window.onload = renderProducts;
    }

    
    function displayBestSellers() {
        const container = document.getElementById('best-seller-products');
        const fragment = document.createDocumentFragment();
    
        bestSellers.forEach(product => {
            const productHTML = document.createElement('div');
            productHTML.classList.add('col-lg-6', 'col-xl-4');
            productHTML.innerHTML = `
                <div class="p-4 rounded bg-light">
                    <div class="row align-items-center">
                        <div class="col-6">
                            <img src="${product.image}" class="img-fluid rounded-circle w-100" alt="${product.name}">
                        </div>
                        <div class="col-6">
                            <a href="#" class="h5">${product.name}</a>
                            <div class="d-flex my-3">
                                ${Array.from({ length: product.rating }).map(() => '<i class="fas fa-star text-primary"></i>').join('')}
                                ${Array.from({ length: 5 - product.rating }).map(() => '<i class="fas fa-star"></i>').join('')}
                            </div>
                            <p class="text-muted">${product.description}</p>
                            <h5 class="fw-bold text-dark">${product.price}</h5>
                            <!-- Add to Cart Button -->
                            <button class="btn btn-primary rounded-pill px-3 text-white" onclick="addToCart('${product.name}', '${product.price}', '${product.image}')">
                                <i class="fa fa-shopping-bag me-2"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
    
            const button = productHTML.querySelector('button');
            button.addEventListener('click', () => addToCart(product.name, parseFloat(product.price.slice(1)), product.image));
    
            fragment.appendChild(productHTML);
        });
    
        container.appendChild(fragment);
    }
    function loadVegetables() {
        const carousel = document.getElementById("vegetableCarousel");
    
        vegetables.forEach(vegetable => {
            console.log(`Ajout de ${vegetable.name} au carousel`);
    
            const vegetableHTML = document.createElement('div');
            vegetableHTML.className = "border border-primary rounded position-relative vesitable-item";
    
            vegetableHTML.innerHTML = `
                <div class="vesitable-img">
                    <img src="${vegetable.image}" class="img-fluid w-100 rounded-top" alt="${vegetable.name}">
                </div>
                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style="top: 10px; right: 10px;">Vegetable</div>
                <div class="p-4 rounded-bottom">
                    <h4>${vegetable.name}</h4>
                    <p>${vegetable.description}</p>
                    <div class="d-flex justify-content-between flex-lg-wrap">
                        <p class="text-dark fs-5 fw-bold mb-0">${vegetable.price}</p>
                        <button class="btn border border-secondary rounded-pill px-3 text-primary">
                            <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                        </button>
                    </div>
                </div>
            `;
    
            const button = vegetableHTML.querySelector('button');
            button.addEventListener('click', () => addToCart(vegetable.name, parseFloat(vegetable.price.slice(1)), vegetable.image));
    
            carousel.appendChild(vegetableHTML);
        });
    }


    // Initialize all functionalities
    function init() {
        loadVegetables();
        displayProducts(products);
        displayBestSellers();
        initializeVegetableCarousel();
    }

    // Initialize on document ready
    $(document).ready(init);

    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear existing products
    
        products.forEach(product => {
            const productHTML = `
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="rounded position-relative fruite-item">
                        <div class="fruite-img">
                            <img src="${product.image}" class="img-fluid w-100 rounded-top" alt="${product.name}">
                        </div>
                        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${product.category}</div>
                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <div class="d-flex justify-content-between flex-lg-wrap">
                                <p class="text-dark fs-5 fw-bold mb-0">${product.price} €</p>
                                <button class="btn border border-secondary rounded-pill px-3 text-primary add-to-cart-btn"
                                    data-name="${product.name}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}">
                                    <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productHTML;
        });
    
        // Attacher les événements 'click' aux boutons "Add to cart"
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const name = event.target.getAttribute('data-name');
                let price = event.target.getAttribute('data-price');
                const image = event.target.getAttribute('data-image');
    
                // Parse the price by removing the currency symbol and converting it to a float
                price = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    
                addToCart(name, price, image); // Call the addToCart function with the parsed price
            });
        });
    }
    
    
    let cart = [];

    // Function to remove an item from the cart
    
    // Function to render cart products in the table
    function renderCartItems() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItemsContainer = document.getElementById("cartItems");
        const subtotalElement = document.getElementById("subtotal");
        const totalPriceElement = document.getElementById("totalPrice");
    
        // Clear the cart table before rendering
        cartItemsContainer.innerHTML = '';
    
        // Calculate subtotal and total
        let subtotal = 0;
    
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>';
        } else {
            cart.forEach((product, index) => {
                // Calculate total for this product
                const total = product.price * product.quantity;
                subtotal += total;
    
                // Create a table row for each product
                const productRow = `
                    <tr>
                        <td><img src="${product.image}" alt="${product.name}" class="cart-item-image" style="width: 50px;"></td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>
                            <input type="number" class="form-control cart-item-quantity" value="${product.quantity}" min="1" data-index="${index}" onchange="updateQuantity(event)">
                        </td>
                        <td>$${total.toFixed(2)}</td>
                        <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
                    </tr>
                `;
    
                // Add the product row to the cart table
                cartItemsContainer.innerHTML += productRow;
            });
    
            // Update subtotal and total price
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            const shipping = 3.00;  // Flat rate shipping
            const totalPrice = subtotal + shipping;
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }
    // Fonction pour ajouter un produit au panier

    // Load cart from localStorage
    function loadCart() {
        const cartTableBody = document.getElementById("cartItems");
        const subtotalElement = document.getElementById("subtotal");
        const totalPriceElement = document.getElementById("totalPrice");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let subtotal = 0;
        const shippingCost = 3.0;

        cartTableBody.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            cartTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">Your cart is empty.</td>
                </tr>
            `;
            subtotalElement.textContent = "0.00";
            totalPriceElement.textContent = "3.00";
            return;
        }

        // Populate cart items
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const rowHTML = `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;" class="rounded"></td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <input type="number" class="form-control" value="${item.quantity}" min="1" 
                               onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            cartTableBody.innerHTML += rowHTML;
        });

        // Update subtotal and total price
        subtotalElement.textContent = `${subtotal.toFixed(2)}`;
        totalPriceElement.textContent = `${(subtotal + shippingCost).toFixed(2)}`;
    }
    // Apply coupon code (simple example)
    document.querySelector(".btn[type='button']").addEventListener("click", () => {
        const couponCode = document.querySelector("input[placeholder='Coupon Code']").value.trim();
        if (couponCode === "DISCOUNT10") {
            alert("Coupon applied! You get a 10% discount.");
        } else {
            alert("Invalid coupon code.");
        }
    });

    // Event listener for the checkout button
    document.getElementById("checkoutButton").addEventListener("click", () => {
        alert("Proceeding to checkout... (this is just a placeholder)");
    });
    // Combine all initialization functions into one onload handler
    window.onload = () => {
        loadVegetables();
        renderCartItems();
        loadCart();
        updateCartCount();
    };
    





    function displayCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Récupérer le panier
        const cartItemsContainer = document.getElementById("checkout-items"); // Table des produits sur la page checkout
        const totalPriceElement = document.querySelector(".total-price"); // Élément affichant le total du panier
    
        let subtotal = 0;
        let total = 0;
        const shipping = 3.00; // Frais de livraison fixes
    
        // Vider le contenu de la table des produits de checkout
        cartItemsContainer.innerHTML = "";
    
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='5' class='text-center'>Votre panier est vide.</td></tr>";
        } else {
            cart.forEach(item => {
                const row = document.createElement("tr");
                const productTotal = item.price * item.quantity;
                subtotal += productTotal;
    
                row.innerHTML = `
                    <th scope="row">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid" style="width: 90px; height: 90px;">
                    </th>
                    <td>${item.name}</td>
                    <td>${item.price} DH</td>
                    <td>${item.quantity}</td>
                    <td>${productTotal.toFixed(2)} DH</td>
                `;
                cartItemsContainer.appendChild(row);
            });
    
            total = subtotal + shipping;
            totalPriceElement.innerText = `${total.toFixed(2)} DH`;
        }
    }
    
    // Appeler la fonction lors du chargement de la page
    window.onload = displayCheckout;






})(jQuery);
