// Mobile Nav Toggle
const hamburger = document.getElementById('hamburger-btn');
const navPrimary = document.getElementById('nav-primary');
hamburger.addEventListener('click', () => {
  navPrimary.classList.toggle('open');
});

// Featured Products (FakeStore API)
async function loadFeatured() {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=4');
    const products = await res.json();
    const grid = document.getElementById('featured-grid');
    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.title}">
        </a>
        <div class="product-info">
          <h3>${p.title}</h3>
          <p class="price">₹${(p.price*75).toFixed(2)}</p>
          <button class="add-cart" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed loading featured', err);
  }
}

// Cart Logic
function addToCart(id) {
  const key = 'cart';
  const cart = JSON.parse(localStorage.getItem(key)) || [];
  const idx = cart.findIndex(i=>i.id===id);
  if (idx > -1) cart[idx].qty++;
  else cart.push({id, qty:1});
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  document.getElementById('cart-count').textContent = count;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadFeatured();
  updateCartCount();
});
