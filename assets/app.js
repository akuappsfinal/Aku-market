/* AKU Market — shared helpers: cart, formatting, header/footer, toast */
(function () {
  const CART_KEY = "aku_cart";
  const ORDERS_KEY = "aku_orders";
  window.AKU_EMAIL = "aku.apps.final@gmail.com";

  const fmt = n => "$" + n.toFixed(2);

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }
  function addToCart(productId, variant, qty) {
    const p = window.AKU_PRODUCTS.find(x => x.id === productId);
    if (!p) return;
    const cart = getCart();
    const key = productId + "|" + (variant || "");
    const existing = cart.find(i => i.key === key);
    if (existing) existing.qty += qty;
    else cart.push({ key, id: productId, variant: variant || "", qty, price: p.price, name: p.name, icon: p.icon, bg: p.bg });
    saveCart(cart);
    toast("Added to cart ✓");
  }
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
  function cartTotal() { return getCart().reduce((s, i) => s + i.qty * i.price, 0); }

  function updateCartBadge() {
    document.querySelectorAll(".cart-count").forEach(el => { el.textContent = cartCount(); });
  }

  function getOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
    catch { return []; }
  }
  function saveOrders(o) { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); }

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => t.classList.remove("show"), 2200);
  }

  function shell(active) {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="header-inner">
        <a class="logo" href="index.html">AKU<span>MARKET</span></a>
        <form class="header-search" action="index.html" method="get">
          <input type="search" name="q" placeholder="Search products…" aria-label="Search products">
        </form>
        <nav class="header-nav">
          <a class="nav-link ${active === "home" ? "active" : ""}" href="index.html">Shop</a>
          <a class="nav-link" href="admin.html">Admin</a>
          <a class="cart-btn" href="cart.html">🛒 <span class="cart-count">0</span></a>
        </nav>
      </div>`;
    document.body.prepend(header);

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <a class="logo" href="index.html">AKU<span>MARKET</span></a>
          <p style="margin-top:.5rem">Curated cross-border deals, shipped worldwide.<br>
          Questions or order support: <a href="mailto:${window.AKU_EMAIL}">${window.AKU_EMAIL}</a></p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="index.html">All products</a></li>
            <li><a href="cart.html">Your cart</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="mailto:${window.AKU_EMAIL}">Contact us</a></li>
            <li><a href="admin.html">Seller admin</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} AKU Market · Shipping estimates shown on each product · Secure checkout</div>`;
    document.body.appendChild(footer);

    const q = new URLSearchParams(location.search).get("q");
    if (q) header.querySelector("input").value = q;
    updateCartBadge();
  }

  function stars(r) {
    return "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
  }

  function productCard(p) {
    return `
      <a class="card" href="product.html?id=${p.id}">
        <div class="card-img" style="background:${p.bg}">
          <span>${p.icon}</span>
          <span class="card-ship">✈ ${p.ship}</span>
        </div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="rating">${stars(p.rating)} <span>${p.rating} · ${p.sold.toLocaleString()} sold</span></div>
          <div class="card-meta">
            <span class="price"><small>US</small> ${fmt(p.price)}</span>
            <span class="old-price">${fmt(p.oldPrice)}</span>
          </div>
        </div>
      </a>`;
  }

  window.AKU = {
    fmt, getCart, saveCart, addToCart, cartCount, cartTotal,
    getOrders, saveOrders, toast, shell, stars, productCard
  };
})();
