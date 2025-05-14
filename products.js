async function renderProducts() {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const products = await res.json();
      const list = document.getElementById('product-list');
      list.innerHTML = products.map(p => `
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
      updateCartCount();
    } catch (err) {
      console.error('Error loading products', err);
    }
  }
  
  // reuse addToCart and updateCartCount from app.js
  // copy/paste those two functions here.
  
  document.addEventListener('DOMContentLoaded', renderProducts);
  