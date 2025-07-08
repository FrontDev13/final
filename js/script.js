if (window.location.pathname.endsWith('products.html')) {
  const productsList = document.getElementById('products-list');
  productsList.innerHTML = '<p>Loading products...</p>';

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      if (!Array.isArray(products) || products.length === 0) {
        productsList.innerHTML = '<p>No products found.</p>';
        return;
      }
      productsList.innerHTML = products.map(product => `
        <div class="product-item">
          <h2>${product.title}</h2>
          <img src="${product.image}" alt="${product.title}" style="max-width:120px;max-height:120px;display:block;margin-bottom:8px;">
          <p><strong>Price:</strong> $${product.price}</p>
          <p>${product.description}</p>
          <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
        <hr>
      `).join('');
      
      document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
          let count = Number(localStorage.getItem('cartCount') || 0);
          count++;
          localStorage.setItem('cartCount', count);
          updateCartCount();
        });
      });
    })
    .catch(err => {
      productsList.innerHTML = '<p style="color:red">Failed to load products.</p>';
    });
}

if (window.location.pathname.endsWith('contact.html')) {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const formMessage = document.getElementById('form-message');


  togglePasswordBtn.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.textContent = 'Show';
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    let valid = true;

    if (!nameInput.value.trim()) {
      valid = false;
      formMessage.textContent = 'Name is required.';
      nameInput.focus();
      return;
    }
 
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      valid = false;
      formMessage.textContent = 'Valid email is required.';
      emailInput.focus();
      return;
    }

    if (!messageInput.value.trim()) {
      valid = false;
      formMessage.textContent = 'Message is required.';
      messageInput.focus();
      return;
    }

    if (!passwordInput.value.trim() || passwordInput.value.length < 6) {
      valid = false;
      formMessage.textContent = 'Password (min 6 chars) is required.';
      passwordInput.focus();
      return;
    }
    if (valid) {
      formMessage.style.color = '#090';
      formMessage.textContent = 'Message sent successfully!';
      form.reset();
      togglePasswordBtn.textContent = 'Show';
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }
});


function updateCartCount() {
  const count = Number(localStorage.getItem('cartCount') || 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}
updateCartCount();


if (window.location.pathname.endsWith('cart.html')) {
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');

  cartItems.innerHTML = `
    <div class="product-item">
      <h2>Brutal T-shirt</h2>
      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Brutal T-shirt" style="max-width:120px;max-height:120px;display:block;margin-bottom:8px;">
      <p><strong>Price:</strong> $19.99</p>
      <button class="btn pay-btn">Pay</button>
    </div>
  `;
  cartEmpty.style.display = 'none';
  
  const payBtn = document.querySelector('.pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      alert('Thank you for your purchase!');
      localStorage.setItem('cartCount', 0);
      updateCartCount();
      cartItems.innerHTML = '';
      cartEmpty.style.display = '';
    });
  }
}
