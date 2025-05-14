// reuse addToCart, updateCartCount, showAddFeedback from app.js

function getId() {
    return new URLSearchParams(window.location.search).get('id');
  }
  function initZoom(imgEl) {
    imgEl.addEventListener('mousemove', e => {
      const r = imgEl.getBoundingClientRect();
      const x = ((e.clientX-r.left)/r.width)*100;
      const y = ((e.clientY-r.top)/r.height)*100;
      imgEl.style.transformOrigin = `${x}% ${y}%`;
      imgEl.style.transform = 'scale(2)';
    });
    imgEl.addEventListener('mouseleave', () => imgEl.style.transform = 'scale(1)');
  }
  
  async function renderDetail() {
    const id = getId();
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const p = await res.json();
      const c = document.getElementById('product-detail');
      c.innerHTML = `
        <div class="detail-img-wrap">
          <img id="detail-img" src="${p.image}" alt="${p.title}" class="detail-img">
        </div>
        <div class="detail-info">
          <h1>${p.title}</h1>
          <p class="price">₹${(p.price*75).toFixed(2)}</p>
          <p>${p.description}</p>
          <div class="quantity-selector">
            <button id="dec-qty">−</button>
            <input type="text" id="qty" value="1" readonly>
            <button id="inc-qty">+</button>
          </div>
          <button class="btn add-cart" id="add-detail-cart">Add to Cart</button>
        </div>
      `;
      const imgEl = document.getElementById('detail-img');
      initZoom(imgEl);
  
      let qty = 1;
      document.getElementById('inc-qty').onclick = ()=>{ qty=Math.min(10,qty+1); document.getElementById('qty').value=qty; };
      document.getElementById('dec-qty').onclick = ()=>{ qty=Math.max(1,qty-1); document.getElementById('qty').value=qty; };
      document.getElementById('add-detail-cart').onclick = ()=>{ addToCart({
        id:p.id,name:p.title,price:Math.round(p.price*75),image:p.image,qty
      }); };
      updateCartCount();
    } catch(e){ console.error(e); }
  }
  
  document.addEventListener('DOMContentLoaded',renderDetail);
  