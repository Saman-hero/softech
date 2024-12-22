// Sample product data (this could come from an API)
const products = [
    {
        id: 1,
        name: "Grapes",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt",
        price: "$4.99 / kg",
        category: "Fruits",
        image: "img/fruite-item-5.jpg"
    },
    {
        id: 2,
        name: "Apples",
        description: "Fresh and organic apples.",
        price: "$3.99 / kg",
        category: "Fruits",
        image: "img/fruite-item-6.jpg"
    },
    // Add more products as needed
];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productCard = `
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
                            <p class="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary">
                                <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard; // Append product card to the list
    });
}

// Call the function to render products
renderProducts();

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const newProduct = {
        id: products.length + 1, // Simple ID generation
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value
    };

    products.push(newProduct); // Add new product to the array
    renderProducts(); // Re-render the product list
    this.reset(); // Reset the form fields
});