// Clean Cart System - Rebuilt for reliability
class ParisaCart {
  constructor() {
    this.items = this.loadFromStorage();
    this.init();
  }

  init() {
    this.updateCounters();
    this.setupEventListeners();
    this.dispatchUpdate();
  }

  loadFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('parisa-cart') || '[]');
    } catch {
      return [];
    }
  }

  saveToStorage() {
    localStorage.setItem('parisa-cart', JSON.stringify(this.items));
  }

  addItem(product) {
    // Input sanitization and validation
    const sanitizedProduct = this.sanitizeProductInput(product);
    
    if (!sanitizedProduct) {
      console.error('Invalid product data');
      return;
    }

    const existing = this.items.find(item => item.id === sanitizedProduct.id);
    
    if (existing) {
      // Limit quantity to prevent abuse
      if (existing.quantity >= 10) {
        this.showNotification('Maximum quantity reached for this item');
        return;
      }
      existing.quantity += 1;
    } else {
      this.items.push({
        ...sanitizedProduct,
        quantity: 1,
        addedAt: Date.now()
      });
    }
    
    this.saveToStorage();
    this.updateCounters();
    this.showNotification(`${sanitizedProduct.name} added to cart`);
    this.dispatchUpdate();
  }

  sanitizeProductInput(product) {
    if (!product || typeof product !== 'object') {
      return null;
    }

    // Sanitize and validate required fields
    const sanitizedId = String(product.id || '').replace(/[^a-zA-Z0-9-]/g, '');
    const sanitizedName = String(product.name || '').replace(/<[^>]*>/g, '').substring(0, 100);
    const sanitizedImage = String(product.image || '').replace(/[<>"']/g, '');
    const sanitizedCollection = String(product.collection || '').replace(/[^a-zA-Z0-9-]/g, '');
    const price = parseInt(product.price) || 0;

    // Validate required fields
    if (!sanitizedId || !sanitizedName || price <= 0) {
      return null;
    }

    return {
      id: sanitizedId,
      name: sanitizedName,
      price: price,
      image: sanitizedImage,
      collection: sanitizedCollection
    };
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToStorage();
    this.updateCounters();
    this.dispatchUpdate();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = Math.max(0, parseInt(quantity) || 0);
    
    if (newQuantity === 0) {
      this.removeItem(productId);
    } else {
      item.quantity = newQuantity;
      this.saveToStorage();
      this.updateCounters();
      this.dispatchUpdate();
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getFormattedTotal() {
    return `£${(this.getTotal() / 100).toFixed(2)}`;
  }

  clear() {
    this.items = [];
    this.saveToStorage();
    this.updateCounters();
    this.dispatchUpdate();
  }

  updateCounters() {
    const count = this.getTotalItems();
    
    // Update navigation cart count
    const navCounters = document.querySelectorAll('[data-cart-count]');
    navCounters.forEach(counter => {
      counter.textContent = count;
      counter.style.display = count > 0 ? 'flex' : 'none';
    });
    
    // Update cart drawer badge
    const drawerBadge = document.getElementById('cart-badge');
    if (drawerBadge) {
      drawerBadge.textContent = count;
      drawerBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  dispatchUpdate() {
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: {
        items: this.items,
        total: this.getTotal(),
        count: this.getTotalItems(),
        formattedTotal: this.getFormattedTotal()
      }
    }));
  }

  setupEventListeners() {
    // Handle add to cart buttons
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.add-to-cart');
      if (!addBtn) return;

      e.preventDefault();
      
      const product = {
        id: addBtn.dataset.productId,
        name: addBtn.dataset.productName,
        price: parseInt(addBtn.dataset.productPrice),
        image: addBtn.dataset.productImage,
        slug: addBtn.dataset.productSlug,
        collection: addBtn.dataset.productCollection
      };

      this.addItem(product);
    });
  }

  showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.cart-notification');
    existing?.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'var(--primary-turquoise, #246a73)',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      fontSize: '0.875rem',
      fontWeight: '500'
    });

    notification.querySelector('.notification-content').style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1.25rem',
      padding: '0',
      lineHeight: '1'
    });

    document.body.appendChild(notification);

    // Show notification
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    // Auto hide
    const hide = () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    };

    setTimeout(hide, 3000);
    closeBtn.addEventListener('click', hide);
  }

  async checkout() {
    if (this.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      // Validate cart with server before checkout
      const validationResult = await this.validateCartWithServer();
      
      if (!validationResult.success) {
        alert(`Checkout failed: ${validationResult.error}`);
        return;
      }

      // Update cart with validated items and prices
      this.items = validationResult.items;
      this.saveToStorage();
      this.updateCounters();
      this.dispatchUpdate();

      // Placeholder for real checkout
      console.log('Validated Checkout:', {
        items: validationResult.items,
        total: this.getFormattedTotal()
      });

      alert(`Checkout: ${this.getFormattedTotal()}\n\nCart validated ✅\nThis will integrate with Stripe in production.`);
      
    } catch (error) {
      console.error('Checkout validation error:', error);
      alert('Checkout failed. Please try again.');
    }
  }

  async validateCartWithServer() {
    const response = await fetch('/api/validate-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: this.items })
    });

    if (!response.ok) {
      throw new Error(`Validation failed: ${response.status}`);
    }

    return await response.json();
  }
}

// Initialize cart
const cart = new ParisaCart();

// Make globally available
window.parisaCart = cart;

export default cart;