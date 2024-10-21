const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to display products
function displayProducts() {
  const productList = document.getElementById("product-list");

  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    li.appendChild(addButton);
    productList.appendChild(li);
  });
}

// Function to add product to cart
function addToCart(product) {
  let cart = getCartFromSession();

  // Check if the product already exists in the cart
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    // Increment quantity if the product is already in the cart
    existingProduct.quantity += 1;
  } else {
    // Add new product to the cart with a quantity field
    product.quantity = 1;
    cart.push(product);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Function to get cart from session storage
function getCartFromSession() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Function to display the cart
function displayCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear the list before rendering

  const cart = getCartFromSession();

  if (cart.length === 0) {
    cartList.textContent = "Your cart is empty.";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price} (x${item.quantity})`;
      cartList.appendChild(li);
    });
  }
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  displayCart();
}

// Event listener for clearing the cart
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  displayCart();
});

