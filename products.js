// products.js - sample product data and renderers
const BP_PRODUCTS = [
  { id: 'p1', title: 'Black Power Tee', price: 24.99, image: 'https://via.placeholder.com/400x300?text=Black+Power+Tee', desc: 'Comfortable cotton tee with empowering design.' },
  { id: 'p2', title: 'Freedom Hoodie', price: 49.99, image: 'https://via.placeholder.com/400x300?text=Freedom+Hoodie', desc: 'Warm hoodie with embroidered emblem.' },
  { id: 'p3', title: 'Pan-African Cap', price: 14.99, image: 'https://via.placeholder.com/400x300?text=Pan-African+Cap', desc: 'Adjustable cap with Pan-African colors.' }
];

function renderProductsGrid(targetId='products'){
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = '';
  BP_PRODUCTS.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}"/>
      <h4>${p.title}</h4>
      <p class="muted">${formatCurrency(p.price)}</p>
      <p><a href="product.html?id=${encodeURIComponent(p.id)}" class="btn">View</a>
      <button class="btn js-add" data-id="${p.id}">Add to Cart</button></p>
    `;
    target.appendChild(card);
  });
  // attach add handlers
  document.querySelectorAll('.js-add').forEach(b=>b.addEventListener('click',e=>{
    const id = e.currentTarget.getAttribute('data-id');
    addToCartById(id,1);
  }));
}

function getProductById(id){
  return BP_PRODUCTS.find(p=>p.id===id);
}

// if product page, render details
document.addEventListener('DOMContentLoaded', ()=>{
  // render product list on shop page if present
  if (document.getElementById('products')){
    renderProductsGrid('products');
  }

  // render product detail on product page if present
  const detailEl = document.getElementById('product-detail');
  if (!detailEl) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const p = getProductById(id);
  if (!p){ detailEl.innerHTML = '<p>Product not found.</p>'; return; }
  detailEl.innerHTML = `
    <div class="product-detail">
      <div>
        <img src="${p.image}" alt="${p.title}"/>
      </div>
      <div>
        <h2>${p.title}</h2>
        <p class="muted">${formatCurrency(p.price)}</p>
        <p>${p.desc}</p>
        <p><button id="add-to-cart" class="btn">Add to cart</button></p>
      </div>
    </div>
  `;
  document.getElementById('add-to-cart').addEventListener('click', ()=>addToCartById(p.id,1));
});
