// reuse updateCartCount, addToCart, showAddFeedback from app.js

async function renderCart() {
    const container = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart'))||[];
    if (!cart.length) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      document.getElementById('cart-total').textContent = '';
      return;
    }
    container.innerHTML = cart.map(item=>`
      <div class="cart-item">
        <img data-id="${item.id}" class="cart-thumb" alt="" src="">
        <div>
          <h4 data-id="${item.id}">Loading…</h4>
          <p>Quantity: ${item.qty}</p>
          <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `).join('');
  
    // Load product details for each cart item
    await Promise.all(cart.map(async item => {
      const r = await fetch(`https://fakestoreapi.com/products/${item.id}`);
      const p = await r.json();
      document.querySelector(`.cart-thumb[src=""][data-id="${item.id}"]`).src = p.image;
      document.querySelector(`h4[data-id="${item.id}"]`).innerText = p.title;
    }));
  
    const total = cart.reduce((sum,i)=>sum + i.qty * (/* placeholder price? use item.price */ i.price), 0);
    document.getElementById('cart-total').innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
  }
  
  function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart'))||[];
    cart = cart.filter(i=>i.id!==id);
    localStorage.setItem('cart',JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
  
  document.addEventListener('DOMContentLoaded',()=>{
    renderCart();
    updateCartCount();
  });
  