// Mobile Nav Toggle
const hamburger = document.getElementById('hamburger-btn');
const navPrimary = document.getElementById('nav-primary');
hamburger.addEventListener('click', () => {
  navPrimary.classList.toggle('open');
});

// Add-to-Cart Helpers
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart'))||[];
  const count = cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cart-count').forEach(el=>el.textContent=count);
}

function showAddFeedback(name) {
  const fb = document.getElementById('add-feedback');
  document.getElementById('feedback-text').textContent = `"${name}" added to cart!`;
  fb.classList.remove('hidden'); fb.classList.add('show');
  setTimeout(()=>{ fb.classList.remove('show'); fb.classList.add('hidden'); }, 1800);
}

function addToCart(item) {
  const key  = 'cart';
  const cart = JSON.parse(localStorage.getItem(key))||[];
  const { id, name, price, image, variation=null, qty=1 } = item;
  const existing = cart.find(e=>e.id===id && e.variation===variation);
  if (existing) existing.qty = Math.max(1, existing.qty+qty);
  else cart.push({ id,name,price,image,variation,qty });
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartCount();
  showAddFeedback(name);
}

// Featured Products (FakeStore API)
async function loadFeatured() {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=4');
    const prods = await res.json();
    const grid = document.getElementById('featured-grid');
    grid.innerHTML = prods.map(p => `
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
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded',()=>{
  loadFeatured();
  updateCartCount();
});
document.addEventListener('DOMContentLoaded', () => {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      });
    });
    lazyImgs.forEach(img => obs.observe(img));
  });
  