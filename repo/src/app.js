import { categories, products } from './products.js';

const root = document.querySelector('#app');
const whatsappNumber = '919307676833';
let cart = JSON.parse(localStorage.getItem('craftvilla-cart') || '{}');
let modalProduct = null;

const money = (value) => `₹${value.toLocaleString('en-IN')}`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const cartItems = () => Object.entries(cart)
  .map(([id, qty]) => ({ ...products.find((product) => product.id === id), qty }))
  .filter((item) => item.id);

const saveCart = () => localStorage.setItem('craftvilla-cart', JSON.stringify(cart));
const logo = () => `<div class="logo-badge"><img src="assets/products/logo.png" alt="CraftVilla logo" /></div>`;

const imageCard = (product, large = false) => product.image
  ? `<div class="product-art photo ${large ? 'large' : ''}"><img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" /></div>`
  : `<div class="product-art ${large ? 'large' : ''}" style="--tone-a:${product.theme[0]};--tone-b:${product.theme[1]}"><i></i><span>${product.theme[2]}</span><em>${escapeHtml(product.category)}</em></div>`;

const card = (product) => `
  <article class="product-card" data-testid="product-card-${product.id}">
    <button class="art-button" data-open="${product.id}">
      ${imageCard(product)}
      <span class="image-note">Crafted with love</span>
    </button>
    <div class="product-copy">
      <div class="product-meta-top">
        <span class="tag">${escapeHtml(product.category)}</span>
        <strong>${money(product.price)}</strong>
      </div>
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
      <button class="buy-now" data-add="${product.id}">Add to Bag</button>
    </div>
  </article>
`;

function frame(content) {
  const count = cartItems().reduce((sum, item) => sum + item.qty, 0);

  return `
    <div class="site-shell">
      <div class="topline">Rakhi gifting, wrapped with a little extra love <span>✦</span> Free delivery on orders over ₹799</div>
      <header class="header">
        <a class="brand" href="#/" aria-label="CraftVilla home">
          ${logo()}
        </a>
        <nav id="nav" aria-label="Main navigation">
          <a href="#/shop/Gift%20Hampers">Gift Hampers</a>
          <a href="#/shop/Handmade%20Accessories">Accessories</a>
        </nav>
        <a class="cart-button" href="#/cart" aria-label="Shopping bag">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 11H7L6 8Zm3-2a3 3 0 1 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Bag</span>
          ${count > 0 ? `<b>${count}</b>` : ''}
        </a>
        <button id="menu" class="menu" aria-label="Open menu">☰</button>
      </header>

      <main class="page-shell">${content}</main>

      <footer class="site-footer">
        <div class="footer-brand">
          ${logo()}
          <div>
            <strong>CraftVilla</strong>
            <small>By Janvi Agrawal</small>
          </div>
        </div>
        <div class="footer-links">
          <a href="https://instagram.com/Craftvilla_in" target="_blank" rel="noreferrer">Instagram</a>
          <a href="tel:+919307676833">Call Janvi</a>
        </div>
        <p>© 2024 CraftVilla · By Janvi Agrawal</p>
      </footer>
      ${modalProduct ? modal(modalProduct) : ''}
    </div>
  `;
}

function shopPage() {
  const category = decodeURIComponent((location.hash || '#/').replace('#/shop/', ''));
  const shown = categories.includes(category) ? products.filter((product) => product.category === category) : products;

  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Handmade with love</p>
        <h1>Handmade with love, made just for you.</h1>
        <p class="hero-lead">Thoughtful gift hampers and handcrafted accessories for the sweetest surprises.</p>
        <div class="hero-actions">
          <a href="#/shop/Gift%20Hampers" class="primary-btn">Shop Hampers</a>
          <a href="#/shop/Handmade%20Accessories" class="secondary-btn">Accessories</a>
        </div>
      </div>

      <div class="hero-art">
        <div class="art-ring">${logo()}</div>
        <span class="float-tag tag-one">Made for you</span>
        <span class="float-tag tag-two">♡ Janvi</span>
      </div>
    </section>

    <section class="rakhi-banner" data-testid="rakhi-banner">
      <div>
        <p>✦ FESTIVE EDIT</p>
        <h2>Rakhi Collection is here</h2>
        <span>Sweet gestures for your favourite sibling.</span>
      </div>
      <a href="#/shop/Gift%20Hampers">Explore Rakhi →</a>
    </section>

    <section class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Find your kind of lovely</p>
          <h2>Shop by feeling</h2>
        </div>
        <a href="#/shop/Gift%20Hampers">Browse all →</a>
      </div>

      <div class="category-grid">
        <a href="#/shop/Gift%20Hampers" class="category-tile hamper-tile">
          <div>
            <span>01 / sweet gifting</span>
            <h3>Gift Hampers</h3>
            <p>Big feelings, beautifully bundled.</p>
          </div>
          <span class="tile-arrow">→</span>
        </a>

        <a href="#/shop/Handmade%20Accessories" class="category-tile accessory-tile">
          <div>
            <span>02 / little treasures</span>
            <h3>Handmade Accessories</h3>
            <p>Whimsical details for everyday joy.</p>
          </div>
          <span class="tile-arrow">→</span>
        </a>
      </div>
    </section>

    <section class="about-strip">
      <div class="about-seal">♡ <span>Made by<br/>Janvi</span></div>
      <div class="about-copy">
        <p class="eyebrow">A little note from CraftVilla</p>
        <h2>Handmade with love,<br/><em>made just for you.</em></h2>
        <p>Hi, Janvi here! Every CraftVilla piece is shaped, wrapped, and sent out with the hope of making someone smile a little wider.</p>
      </div>
    </section>

    <section class="catalog section">
      <div class="section-heading product-heading">
        <div>
          <p class="eyebrow">Shop the collection</p>
          <h2>${categories.includes(category) ? category : 'Featured Products'}</h2>
        </div>
      </div>
      <div class="product-grid">${shown.map(card).join('')}</div>
    </section>
  `;
}

function modal(product) {
  return `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true">
        <button class="close" data-close aria-label="Close modal">×</button>
        ${imageCard(product, true)}
        <div class="modal-copy">
          <span class="tag">${escapeHtml(product.category)}</span>
          <h2>${escapeHtml(product.name)}</h2>
          <strong class="modal-price">${money(product.price)}</strong>
          <p>${escapeHtml(product.description)}</p>
          <div class="qty-row">
            <button data-dec aria-label="Decrease quantity">−</button>
            <span id="modalQty">1</span>
            <button data-inc aria-label="Increase quantity">+</button>
          </div>
          <button class="checkout-button" data-modal-add="${product.id}">Add to Bag</button>
        </div>
      </div>
    </div>
  `;
}

function cartPage() {
  const items = cartItems();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!items.length) {
    return `
      <section class="cart-page empty-cart">
        <h1>Your CraftVilla Bag</h1>
        <p>Your bag is waiting for something handmade. <a href="#/shop/Gift%20Hampers">Start shopping</a>.</p>
      </section>
    `;
  }

  return `
    <section class="cart-page">
      <h1>Your CraftVilla Bag</h1>
      <div class="cart-list">
        ${items.map((item) => `
          <article class="cart-item">
            ${imageCard(item)}
            <div class="cart-item-copy">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${money(item.price)} each</p>
              <div class="qty compact">
                <button data-qty="${item.id}" data-next="${item.qty - 1}">−</button>
                <span>${item.qty}</span>
                <button data-qty="${item.id}" data-next="${item.qty + 1}">+</button>
                <button class="remove" data-qty="${item.id}" data-next="0">Remove</button>
              </div>
            </div>
            <strong>${money(item.price * item.qty)}</strong>
          </article>
        `).join('')}
      </div>

      <section class="checkout">
        <h2>Subtotal: ${money(subtotal)}</h2>
        <p>Share your details and Janvi will confirm your order personally.</p>
        <form id="checkout">
          <input name="name" required placeholder="Your name" />
          <input name="phone" required placeholder="Phone number" />
          <textarea name="address" required placeholder="Delivery address"></textarea>
          <button class="checkout-button">Checkout via WhatsApp</button>
        </form>
      </section>
    </section>
  `;
}

function render() {
  root.innerHTML = frame(location.hash.startsWith('#/cart') ? cartPage() : shopPage());
  bindEvents();
}

function bindEvents() {
  document.querySelector('#menu')?.addEventListener('click', () => {
    document.querySelector('#nav')?.classList.toggle('open');
  });

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.add;
      cart[id] = (cart[id] || 0) + 1;
      saveCart();
      render();
    });
  });

  document.querySelectorAll('[data-open]').forEach((button) => {
    button.addEventListener('click', () => {
      modalProduct = products.find((product) => product.id === button.dataset.open) || null;
      render();
    });
  });

  document.querySelector('[data-close]')?.addEventListener('click', () => {
    modalProduct = null;
    render();
  });

  let modalQty = 1;
  document.querySelector('[data-inc]')?.addEventListener('click', () => {
    modalQty += 1;
    const qtyNode = document.querySelector('#modalQty');
    if (qtyNode) qtyNode.textContent = String(modalQty);
  });

  document.querySelector('[data-dec]')?.addEventListener('click', () => {
    modalQty = Math.max(1, modalQty - 1);
    const qtyNode = document.querySelector('#modalQty');
    if (qtyNode) qtyNode.textContent = String(modalQty);
  });

  document.querySelector('[data-modal-add]')?.addEventListener('click', (event) => {
    const id = event.currentTarget.dataset.modalAdd;
    for (let count = 0; count < modalQty; count += 1) {
      cart[id] = (cart[id] || 0) + 1;
    }
    modalProduct = null;
    saveCart();
    render();
  });

  document.querySelectorAll('[data-qty]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.qty;
      const next = Number(button.dataset.next);
      if (next <= 0) delete cart[id];
      else cart[id] = next;
      saveCart();
      render();
    });
  });

  document.querySelector('#checkout')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const details = Object.fromEntries(new FormData(event.target));

    if (!/^[0-9+\-\s]{10,15}$/.test(details.phone.trim())) {
      return alert('Please enter a valid phone number.');
    }

    const orderItems = cartItems();
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const lines = orderItems.map((item) => `• ${item.name} x ${item.qty} = ${money(item.price * item.qty)}`);

    const message = [
      'Hello CraftVilla! I\'d like to place an order.',
      '',
      ...lines,
      '',
      `Subtotal: ${money(subtotal)}`,
      '',
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Delivery address: ${details.address}`
    ].join('\n');

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
}

addEventListener('hashchange', render);
render();
