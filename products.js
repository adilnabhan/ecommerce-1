// reuse addToCart, updateCartCount, showAddFeedback from app.js

async function renderProducts() {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const prods = await res.json();
      const list = document.getElementById('product-list');
      list.innerHTML = prods.map(p=>`
        <div class="product-card">
          <a href="product.html?id=${p.id}">
            <img src="${p.image}" alt="${p.title}">
          </a>
          <div class="product-info">
            <h3>${p.title}</h3>
            <p class="price">₹${(p.price*75).toFixed(2)}</p>
            <button class="add-cart" onclick='addToCart({
              id:${p.id},name:"${p.title}",price:${(p.price*75).toFixed(2)},
              image:"${p.image}",qty:1
            })'>Add to Cart</button>
          </div>
        </div>
      `).join('');
      updateCartCount();
    } catch(e){ console.error(e); }
  }
  
  document.addEventListener('DOMContentLoaded',renderProducts);
  