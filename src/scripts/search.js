// Professional Search Functionality for Parisa London - IMPROVED VERSION
class ProductSearch {
  constructor() {
    this.products = [];
    this.isInitialized = false;
    this.searchDropdown = null;
    this.searchBackdrop = null;
    this.searchInput = null;
    this.searchResults = null;
    this.searchSuggestions = null;
    this.noResults = null;
    this.resultsGrid = null;
    this.resultsCount = null;
    this.searchClear = null;
    this.currentQuery = '';
    this.searchContainer = null;
    
    // Define valid search terms to prevent misuse
    this.validSearchTerms = this.initializeValidTerms();
    
    this.init();
  }

  initializeValidTerms() {
    return {
      // Product types
      categories: ['ring', 'rings', 'necklace', 'necklaces', 'earring', 'earrings', 'bracelet', 'bracelets', 'pendant', 'pendants', 'brooch', 'brooches', 'cuff', 'cuffs'],
      
      // Materials and stones
      materials: ['gold', '18k', 'yellow', 'white', 'rose', 'silver', 'platinum', 'turquoise', 'persian', 'diamond', 'diamonds', 'stone', 'stones'],
      
      // Collection names
      collections: ['kaleidoscope', 'heritage', 'talisman', 'forever', 'bespoke', 'calligraphy'],
      
      // Styles and descriptions
      styles: ['statement', 'minimalist', 'classic', 'modern', 'traditional', 'luxury', 'elegant', 'bold', 'delicate', 'vintage', 'contemporary'],
      
      // Occasions
      occasions: ['wedding', 'bridal', 'engagement', 'anniversary', 'gift', 'birthday', 'special'],
      
      // Common jewelry terms
      terms: ['chain', 'setting', 'prong', 'bezel', 'clasp', 'band', 'charm', 'stud', 'drop', 'hoop', 'tennis', 'eternity', 'solitaire', 'cluster']
    };
  }

  getAllValidTerms() {
    return [
      ...this.validSearchTerms.categories,
      ...this.validSearchTerms.materials,
      ...this.validSearchTerms.collections,
      ...this.validSearchTerms.styles,
      ...this.validSearchTerms.occasions,
      ...this.validSearchTerms.terms
    ];
  }

  async init() {
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeAfterDOM());
      } else {
        this.initializeAfterDOM();
      }
    } catch (error) {
      console.error('Failed to initialize search:', error);
    }
  }

  async initializeAfterDOM() {
    try {
      await this.loadProducts();
      this.initializeElements();
      this.bindEvents();
      this.isInitialized = true;
      console.log('Search initialized with', this.products.length, 'products');
    } catch (error) {
      console.error('Failed to initialize search after DOM:', error);
    }
  }

  async loadProducts() {
    try {
      if (window.PARISA_PRODUCTS) {
        this.processProductData(window.PARISA_PRODUCTS);
        return;
      }
      
      const apiResponse = await fetch('/api/products');
      if (apiResponse.ok) {
        const flattenedProducts = await apiResponse.json();
        this.products = flattenedProducts.map(product => ({
          ...product,
          searchText: this.createSearchText(product, product.collection)
        }));
        return;
      }
    } catch (error) {
      console.log('Could not fetch products from API, trying alternative methods...');
    }

    console.warn('Using fallback product data. Ensure products are accessible.');
    this.createFallbackProducts();
  }

  processProductData(data) {
    this.products = [];
    Object.entries(data).forEach(([collectionId, products]) => {
      products.forEach(product => {
        this.products.push({
          ...product,
          collection: collectionId,
          searchText: this.createSearchText(product, collectionId)
        });
      });
    });
  }

  createFallbackProducts() {
    this.products = [
      {
        id: 'sample-1',
        name: 'Persian Turquoise Ring',
        slug: 'persian-turquoise-ring',
        price: 285000,
        images: ['/images/product.jpg'],
        description: 'Beautiful Persian turquoise ring with gold setting',
        collection: 'kaleidoscope',
        tags: ['ring', 'turquoise', 'gold'],
        searchText: 'persian turquoise ring beautiful gold setting kaleidoscope'
      }
    ];
  }

  createSearchText(product, collection) {
    const searchableFields = [
      product.name,
      product.description,
      product.detailed_description,
      collection,
      ...(product.tags || []),
      product.specifications?.material,
      product.specifications?.stone,
      product.seo?.title,
      product.seo?.description
    ];

    return searchableFields
      .filter(field => field)
      .join(' ')
      .toLowerCase();
  }

  initializeElements() {
    this.searchDropdown = document.getElementById('search-dropdown');
    this.searchBackdrop = document.getElementById('search-backdrop');
    this.searchInput = document.getElementById('search-input-field');
    this.searchResults = document.getElementById('search-results-section');
    this.searchSuggestions = document.getElementById('search-suggestions-section');
    this.noResults = document.getElementById('search-no-results-section');
    this.resultsGrid = document.getElementById('search-results-list');
    this.resultsCount = document.getElementById('search-results-count');
    this.searchClear = document.getElementById('search-clear-btn');
    this.searchContainer = document.querySelector('.search-container');
  }

  bindEvents() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSearch();
      });
    }

    // Close search when clicking outside (desktop)

    // Mobile close button
    const mobileCloseBtn = document.getElementById('search-close-mobile');
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', () => this.closeSearch());
    }

    // Close search when clicking outside (desktop)
    document.addEventListener('click', (e) => {
      if (this.searchDropdown?.classList.contains('active')) {
        if (!this.searchDropdown.contains(e.target) && !this.searchContainer?.contains(e.target)) {
          this.closeSearch();
        }
      }
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeSearch();
      });
    }

    if (this.searchClear) {
      this.searchClear.addEventListener('click', () => this.clearSearch());
    }

    const suggestionPills = document.querySelectorAll('.suggestion-pill');
    suggestionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const query = pill.getAttribute('data-search');
        this.performSearch(query);
      });
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      
      if (e.key === 'Escape' && this.searchDropdown?.classList.contains('active')) {
        this.closeSearch();
      }
    });

    // Handle window resize for mobile positioning
    window.addEventListener('resize', () => {
      if (this.searchDropdown && this.searchDropdown.classList.contains('active')) {
        // Only update position on mobile devices
        if (window.innerWidth <= 768) {
          this.updateMobilePosition();
        } else {
          // If switching to desktop, clean up mobile inline styles
          this.searchDropdown.style.removeProperty('top');
          this.searchDropdown.style.removeProperty('height');
        }
      }
    });

    // Handle scroll for mobile positioning (when marquee visibility changes)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (this.searchDropdown && this.searchDropdown.classList.contains('active')) {
        // Only update position on mobile devices
        if (window.innerWidth <= 768) {
          // Throttle scroll events for better performance
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            this.updateMobilePosition();
          }, 16); // ~60fps
        }
      }
    });
  }

  toggleSearch() {
    if (this.searchDropdown?.classList.contains('active')) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    if (!this.searchDropdown) return;
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, append to body for proper fixed positioning
      document.body.appendChild(this.searchDropdown);
      
      // Update position accounting for marquee
      this.updateMobilePosition();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // On desktop, position relative to search container
      if (this.searchContainer) {
        this.searchContainer.appendChild(this.searchDropdown);
      }
      
      // Reset any inline styles that might have been set by mobile positioning
      this.searchDropdown.style.removeProperty('top');
      this.searchDropdown.style.removeProperty('height');
    }
    
    this.searchDropdown.classList.add('active');
    
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.focus();
      }
    }, 150);
  }

  updateMobilePosition() {
    if (!this.searchDropdown) return;
    
    // Only run this function on mobile devices
    if (window.innerWidth > 768) return;
    
    // Get the actual navbar element to calculate real position
    const navbar = document.querySelector('nav') || document.querySelector('.navigation') || document.querySelector('header');
    const marquee = document.querySelector('.marquee') || document.querySelector('[class*="marquee"]');
    
    let totalOffset = 60; // Default navbar height
    
    if (navbar) {
      const navbarRect = navbar.getBoundingClientRect();
      totalOffset = navbarRect.bottom;
    }
    
    // Check if marquee is visible (not scrolled out of view)
    if (marquee) {
      const marqueeRect = marquee.getBoundingClientRect();
      if (marqueeRect.bottom > 0 && marqueeRect.top < window.innerHeight) {
        // Marquee is visible, add its height
        totalOffset = marqueeRect.bottom;
      }
    }
    
    // Update the dropdown position dynamically (mobile only)
    this.searchDropdown.style.top = `${totalOffset}px`;
    this.searchDropdown.style.height = `calc(100vh - ${totalOffset}px)`;
  }

  closeSearch() {
    if (!this.searchDropdown) return;
    
    this.searchDropdown.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    this.clearSearch();
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.currentQuery = '';
    this.showSuggestions();
    this.updateClearButton();
  }

  updateClearButton() {
    if (!this.searchClear) return;
    
    if (this.currentQuery.length > 0) {
      this.searchClear.classList.add('visible');
    } else {
      this.searchClear.classList.remove('visible');
    }
  }

  handleSearch(query) {
    this.currentQuery = query.trim();
    this.updateClearButton();
    
    if (this.currentQuery.length === 0) {
      this.showSuggestions();
      return;
    }

    if (this.currentQuery.length < 2) {
      return;
    }

    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.performSearch(this.currentQuery);
    }, 200);
  }

  performSearch(query) {
    if (this.searchInput && this.searchInput.value !== query) {
      this.searchInput.value = query;
    }
    
    this.currentQuery = query.toLowerCase().trim();
    this.updateClearButton();
    
    if (this.currentQuery.length === 0) {
      this.showSuggestions();
      return;
    }

    // Pre-validate search query to prevent misuse
    const isValid = this.isValidSearchQuery(this.currentQuery);
    console.log(`Search validation for "${this.currentQuery}": ${isValid}`);
    
    if (!isValid) {
      console.log(`Blocking invalid search: "${this.currentQuery}"`);
      this.hideAllViews();
      this.showNoResults();
      return;
    }

    const results = this.searchProducts(this.currentQuery);
    console.log(`Search results for "${this.currentQuery}":`, results.length);
    this.displayResults(results);
  }

  isValidSearchQuery(query) {
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    // If query is too short, don't validate strictly
    if (query.length < 3) {
      return true;
    }

    // Check for random character sequences (like "resoasdasdads")
    const hasRandomPattern = queryWords.some(word => {
      if (word.length > 8) {
        // Check for repeating patterns or too many consonants/vowels in a row
        const consonantRun = /[bcdfghjklmnpqrstvwxyz]{5,}/i;
        const repeatingChars = /(.)\1{3,}/;
        const mixedPattern = /[asd]{3,}|[qwe]{3,}|[zxc]{3,}/i;
        
        return consonantRun.test(word) || repeatingChars.test(word) || mixedPattern.test(word);
      }
      return false;
    });

    if (hasRandomPattern) {
      console.log('Detected random pattern in query:', query);
      return false;
    }

    // Check for inappropriate content
    const inappropriateTerms = [
      'sex', 'sexual', 'porn', 'xxx', 'adult', 'nude', 'naked', 'fuck', 'shit', 'damn', 'hell',
      'bitch', 'ass', 'dick', 'cock', 'pussy', 'tits', 'boobs', 'gay', 'lesbian', 'drug', 'drugs'
    ];

    if (inappropriateTerms.some(term => query.includes(term))) {
      return false;
    }

    // Check if at least one word is jewelry-related
    const allValidTerms = this.getAllValidTerms();
    const hasValidTerm = queryWords.some(word => {
      // Direct exact match
      if (allValidTerms.includes(word)) {
        return true;
      }
      
      // More strict partial matching - must be meaningful
      if (word.length >= 3) {
        return allValidTerms.some(validTerm => {
          // Only allow if word is a clear prefix of a valid term (at least 3 chars)
          // AND the valid term is reasonably long
          if (validTerm.length >= 4 && validTerm.startsWith(word) && word.length >= 3) {
            return true;
          }
          // Or if a valid term starts with the word and they share significant letters
          if (word.length >= 4 && validTerm.length >= 4) {
            return validTerm.startsWith(word.substring(0, 3));
          }
          return false;
        });
      }
      
      return false;
    });

    // Much stricter product name matching - only exact words or clear prefixes
    const hasProductMatch = this.products.some(product => {
      const productWords = product.name.toLowerCase().split(/\s+/);
      return queryWords.some(queryWord => {
        if (queryWord.length < 3) return false;
        
        return productWords.some(productWord => {
          // Exact match
          if (productWord === queryWord) return true;
          
          // Only allow if query word is a clear prefix of product word (4+ chars)
          if (queryWord.length >= 4 && productWord.length >= 4) {
            return productWord.startsWith(queryWord);
          }
          
          return false;
        });
      });
    });

    // Require at least one meaningful match
    return hasValidTerm || hasProductMatch;
  }

  searchProducts(query) {
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    return this.products
      .map(product => {
        let score = 0;
        const searchText = product.searchText;

        // Exact full query match in name (highest priority)
        if (product.name.toLowerCase().includes(query)) {
          score += 100;
        }

        // Exact full query match in description
        if (product.description.toLowerCase().includes(query)) {
          score += 80;
        }

        // Collection match
        if (product.collection.toLowerCase().includes(query)) {
          score += 70;
        }

        // Tag matches - exact matches only
        if (product.tags) {
          product.tags.forEach(tag => {
            if (tag.toLowerCase() === query || tag.toLowerCase().includes(query)) {
              score += 60;
            }
          });
        }

        // Material/stone exact matches
        if (product.specifications?.material?.toLowerCase().includes(query)) {
          score += 50;
        }
        if (product.specifications?.stone?.toLowerCase().includes(query)) {
          score += 50;
        }

        // Word-by-word exact matching
        queryWords.forEach(word => {
          if (word.length >= 3) { // Only consider words with 3+ characters
            // Exact word matches in search text
            const searchWords = searchText.split(/\s+/);
            searchWords.forEach(searchWord => {
              if (searchWord === word) {
                score += 30;
              } else if (searchWord.includes(word) && word.length >= 3) {
                score += 15;
              } else if (word.includes(searchWord) && searchWord.length >= 3) {
                score += 10;
              }
            });
          }
        });

        // Only minimal typo tolerance for legitimate words
        if (score === 0) {
          queryWords.forEach(word => {
            if (word.length >= 4) {
              const searchWords = searchText.split(/\s+/);
              searchWords.forEach(searchWord => {
                if (Math.abs(word.length - searchWord.length) <= 1) {
                  const editDist = this.levenshteinDistance(word, searchWord);
                  if (editDist === 1) {
                    score += 5; // Very small score for single typo
                  }
                }
              });
            }
          });
        }

        return { product, score };
      })
      .filter(item => item.score >= 10) // Increased minimum score threshold
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, 15); // Reduced to top 15 results
  }

  levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  displayResults(results) {
    this.hideAllViews();

    if (results.length === 0) {
      this.showNoResults();
      return;
    }

    this.showResults(results);
  }

  showSuggestions() {
    this.hideAllViews();
    if (this.searchSuggestions) {
      this.searchSuggestions.style.display = 'block';
    }
  }

  showResults(results) {
    if (!this.searchResults || !this.resultsGrid || !this.resultsCount) return;

    this.searchResults.style.display = 'block';
    this.resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;

    this.resultsGrid.innerHTML = '';

    results.forEach(product => {
      const resultItem = this.createResultItem(product);
      this.resultsGrid.appendChild(resultItem);
    });
  }

  showNoResults() {
    if (this.noResults) {
      this.noResults.style.display = 'block';
    }
  }

  hideAllViews() {
    if (this.searchSuggestions) this.searchSuggestions.style.display = 'none';
    if (this.searchResults) this.searchResults.style.display = 'none';
    if (this.noResults) this.noResults.style.display = 'none';
  }

  createResultItem(product) {
    const item = document.createElement('a');
    item.className = 'search-result';
    item.href = `/collections/${product.collection}/${product.slug}`;

    const formatPrice = (price) => `£${(price / 100).toFixed(2)}`;
    const mainImage = product.images?.[0] || '/images/product.jpg';

    item.innerHTML = `
      <img 
        src="${mainImage}" 
        alt="${product.name}"
        class="search-result-image"
        loading="lazy"
      />
      <div class="search-result-content">
        <h4 class="search-result-title">${product.name}</h4>
        <div class="search-result-meta">
          <span class="search-result-price">${formatPrice(product.price)}</span>
          <span class="search-result-collection">${this.capitalizeWords(product.collection)}</span>
        </div>
      </div>
    `;

    item.addEventListener('click', () => {
      this.closeSearch();
    });

    return item;
  }

  capitalizeWords(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }
}

// Initialize search when DOM is ready
if (typeof window !== 'undefined') {
  const search = new ProductSearch();
  window.ParisaSearch = search;
}