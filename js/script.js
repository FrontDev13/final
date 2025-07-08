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
