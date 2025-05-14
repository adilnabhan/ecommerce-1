function renderCart() {
    const container = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart'))||[];
    if (!cart.length) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      document.getElementById('cart-total').textContent = '';
      return;
    }
    const lines = cart.map(item => `
      <div class="cart-item">
        <img src="" alt="" data-id="${item.id}" class="cart-thumb">
        <div>
          <h4>Product #${item.id}</h4>
          <p>Quantity: ${item.qty}</p>
          <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `);
    container.innerHTML = lines.join('');
    // fetch images & titles for each
    cart.forEach(item => {
      fetch(`https://fakestoreapi.com/products/${item.id}`)
        .then(r=>r.json())
        .then(p=>{
          const imgEl = document.querySelector(`.cart-thumb[data-id="${item.id}"]`);
          imgEl.src = p.image;
          imgEl.alt = p.title;
          imgEl.nextElementSibling.querySelector('h4').innerText = p.title;
        });
    });
    const total = cart.reduce((sum,i)=>sum + i.qty * i.id /* placeholder price */, 0);
    document.getElementById('cart-total').innerHTML = `<h3>Total: ₹${total}</h3>`;
  }
  
  function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart'))||[];
    cart = cart.filter(i=>i.id!==id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
  });
  