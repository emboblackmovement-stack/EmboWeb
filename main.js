// main.js - navigation and common helpers
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) cartBtn.addEventListener('click', () => {
    // simple cart quick view - navigate to shop for this demo
    window.location.href = 'shop.html';
  });
});

function updateCartCount(){
  try{
    const countEl = document.getElementById('cart-count');
    if (!countEl) return;
    const cart = JSON.parse(localStorage.getItem('bp_cart')||'[]');
    const qty = cart.reduce((s,i)=>s+(i.quantity||1),0);
    countEl.textContent = qty;
  }catch(e){console.warn(e)}
}

function formatCurrency(num){
  return '$'+(Number(num)||0).toFixed(2);
}
