document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
  
    // Check if hamburger and navMenu are defined
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
      });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
  
    // Fetch products from FakeStore API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          // Create product card elements
          const card = document.createElement('div');
          card.classList.add('product-card');
  
          const img = document.createElement('img');
          img.src = product.image;
          img.alt = product.title;
  
          const title = document.createElement('h3');
          title.textContent = product.title;
  
          const price = document.createElement('p');
          price.classList.add('price');
          price.textContent = `$${product.price.toFixed(2)}`;
  
          const button = document.createElement('a');
          button.href = '#';
          button.classList.add('cta-button');
          button.textContent = 'Buy Now';
  
          // Append elements to the card
          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(price);
          card.appendChild(button);
  
          // Append card to the product grid
          productGrid.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
      });
  });
  document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazyload");
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazyload");
            observer.unobserve(img);
          }
        });
      });
  
      lazyImages.forEach(img => {
        observer.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver support
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove("lazyload");
      });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const cart = {};
  
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
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
      });
    });
  });
  async function fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const products = await response.json();
      // Proceed with processing the products
      console.log(products);
    } catch (error) {
      // Handle network errors or errors thrown above
      console.error('Error fetching products:', error);
    }
  }
  
  fetchProducts();
  document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
  
   
  
    // Function to render product cards
    function renderProducts(products) {
      products.forEach(product => {
        // Create product card container
        const card = document.createElement('div');
        card.className = 'product-card';
  
        // Create and append product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.loading = 'lazy';
        card.appendChild(img);
  
        // Create and append product title
        const title = document.createElement('h3');
        title.textContent = product.title;
        card.appendChild(title);
  
        // Create and append product price
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `$${product.price}`;
        card.appendChild(price);
  
        // Create and append product description
        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = product.description;
        card.appendChild(description);
  
        // Create and append "Add to Cart" button
        const button = document.createElement('button');
        button.className = 'cta-button add-to-cart';
        button.textContent = 'Add to Cart';
        button.dataset.id = product.id;
        button.dataset.name = product.title;
        button.dataset.price = product.price;
        card.appendChild(button);
  
        // Append the product card to the product grid
        productGrid.appendChild(card);
      });
    }
  
    // Fetch and render products on page load
    fetchProducts();
  });
    
  
  