const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM Elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from session storage or initialize it
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Function to render products on the page
function renderProducts() {
  products.forEach(product => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(productItem);
  });
}

// Function to add products to the cart
function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Function to render the cart
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach(item => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(cartItem);
  });
}

// Function to clear the cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event Listeners
clearCartBtn.addEventListener("click", clearCart);

// Initialize the page
renderProducts();
renderCart();


