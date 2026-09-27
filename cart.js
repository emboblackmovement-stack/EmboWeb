// cart.js - simple cart using localStorage and WhatsApp checkout
function getCart(){
  try{ return JSON.parse(localStorage.getItem('bp_cart')||'[]'); }catch(e){return []}
}

function saveCart(cart){
  localStorage.setItem('bp_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCartById(id, qty=1){
  const prod = getProductById(id);
  if (!prod) return alert('Product not found');
  const cart = getCart();
  const existing = cart.find(i=>i.id===id);
  if (existing) existing.quantity = (existing.quantity||1) + qty;
  else cart.push({id:prod.id,title:prod.title,price:prod.price,quantity:qty});
  saveCart(cart);
  alert('Added to cart');
}

function removeFromCart(id){
  const cart = getCart().filter(i=>i.id!==id);
  saveCart(cart);
}

function clearCart(){ localStorage.removeItem('bp_cart'); updateCartCount(); }

function renderCart(targetId='cart'){
  const target = document.getElementById(targetId);
  if (!target) return;
  const cart = getCart();
  if (!cart.length){ target.innerHTML = '<p>Your cart is empty</p>'; return; }
  const ul = document.createElement('div');
  ul.innerHTML = cart.map(i=>`<div><strong>${i.title}</strong> x ${i.quantity} <span class="muted">${formatCurrency(i.price)}</span> <button data-id="${i.id}" class="js-remove">Remove</button></div>`).join('');
  target.innerHTML = '';
  target.appendChild(ul);
  target.insertAdjacentHTML('beforeend', `<p><strong>Total: ${formatCurrency(cart.reduce((s,i)=>s+i.price*i.quantity,0))}</strong></p><p><button id="checkout-wa" class="btn">Checkout via WhatsApp</button></p>`);
  document.querySelectorAll('.js-remove').forEach(b=>b.addEventListener('click',e=>{ removeFromCart(e.currentTarget.getAttribute('data-id')); renderCart(targetId); }));
  document.getElementById('checkout-wa').addEventListener('click', ()=>checkoutWhatsApp());
}

function checkoutWhatsApp(){
  const cart = getCart();
  if (!cart.length) return alert('Cart is empty');
  const lines = cart.map(i=>`${i.quantity} x ${i.title} - ${formatCurrency(i.price)} each`);
  const total = formatCurrency(cart.reduce((s,i)=>s+i.price*i.quantity,0));
  const msg = `Hello, I want to order:\n${lines.join('\n')}\nTotal: ${total}`;
  const encoded = encodeURIComponent(msg);
  // Replace number below with seller's number in international format without +
  const phone = '1234567890';
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url,'_blank');
}

// If a page has an element with id 'cart', render cart there on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{
  const cartContainer = document.getElementById('cart');
  if (cartContainer) renderCart('cart');
  // update cart count on any page
  updateCartCount();
});
