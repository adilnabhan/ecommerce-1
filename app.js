document.addEventListener('DOMContentLoaded', () => {
  // Initialize hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Initialize lazy loading
  const lazyImages = document.querySelectorAll('img.lazyload');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazyload');
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver support
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazyload');
    });
  }

  // Initialize cart functionality
  const cart = {};
  const productGrid = document.getElementById('product-grid');
  productGrid.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      const button = event.target;
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      if (cart[id]) {
        cart[id].quantity += 1;
      } else {
        cart[id] = { name, price, quantity: 1 };
      }

      console.log('Cart:', cart);
      alert(`${name} added to cart!`);
    }
  });

  // Fetch and render products
  fetchProducts();
});
function fetchProducts() {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '<p>Loading products...</p>';

  fetch('https://fakestoreapi.com/products')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(products => {
      productGrid.innerHTML = '';
      renderProducts(products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    });
}
