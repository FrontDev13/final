// Fetch and render products only on products.html
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
        </div>
        <hr>
      `).join('');
    })
    .catch(err => {
      productsList.innerHTML = '<p style="color:red">Failed to load products.</p>';
    });
}

// Contact form validation and show/hide password
if (window.location.pathname.endsWith('contact.html')) {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const formMessage = document.getElementById('form-message');

  // Show/hide password
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
    // Name validation
    if (!nameInput.value.trim()) {
      valid = false;
      formMessage.textContent = 'Name is required.';
      nameInput.focus();
      return;
    }
    // Email validation (regex)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      valid = false;
      formMessage.textContent = 'Valid email is required.';
      emailInput.focus();
      return;
    }
    // Message validation
    if (!messageInput.value.trim()) {
      valid = false;
      formMessage.textContent = 'Message is required.';
      messageInput.focus();
      return;
    }
    // Password validation (min 6 chars)
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
