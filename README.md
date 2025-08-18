# Parisa London Jewellery

> Production-ready luxury fine jewellery e-commerce platform featuring handcrafted 18K gold pieces with rare gemstones

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
[![Deployed with Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=parisa-london)](https://vercel.com/)

## 🌟 Project Overview

**Parisa London** is a luxury jewellery e-commerce platform specializing in exclusive, handcrafted pieces featuring Persian turquoise and rare gemstones. Built with Astro's hybrid rendering for optimal performance, this website delivers a premium shopping experience with real-time inventory management and secure checkout.

### Brand Essence
- **Luxury & Elegance**: Premium 18K gold with rare gemstones
- **Exclusivity**: Limited collections with celebrity endorsements
- **Sophistication**: Modern design meets timeless craftsmanship
- **Empowerment**: Jewellery that tells a story

---

## 🎨 Design System

### Color Palette
```css
:root {
  --primary-turquoise: #246a73;    /* Brand turquoise */
  --secondary-turqoise: #368f8b;       /* Elegant gray */
  --background-light: #FEFEFE;     /* Clean white */
  --text-dark: #160f29;            /* Primary text */
  --text-light: #7F8C8D;           /* Secondary text */
}
```
---

## 🏗️ Tech Stack

### Core Framework
- **[Astro.js](https://astro.build/)** - Hybrid rendering (static + SSR) for optimal performance
- **Vercel Edge Functions** - Serverless API endpoints for dynamic features
- **TypeScript** - Type safety across frontend and API routes
- **Vanilla CSS** - Custom styling with CSS Grid & Flexbox

### E-commerce & Payments
- **[Stripe Checkout](https://stripe.com/payments/checkout)** - Secure payment processing (GBP)
- **Stripe Webhooks** - Real-time order processing and confirmations
- **Serverless Cart Management** - Persistent shopping cart with Edge functions

### Deployment & Performance
- **[Vercel](https://vercel.com/)** - Production hosting with global CDN
- **Edge Runtime** - Sub-100ms API responses worldwide
- **Hybrid Rendering** - Static pages for speed, SSR for dynamic content

### Tools & Utilities
- **ESLint & Prettier** - Code quality and formatting
- **Vercel Analytics** - Real user monitoring and performance insights

---

---

## 🚀 Quick Start

```bash
# Clone and install dependencies
git clone https://github.com/your-username/parisa-london.git
cd parisa-london
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Stripe keys and other secrets

# Start development server
npm run dev
```

### Environment Variables
```bash
# .env.local
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=your_database_connection_string
```

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |
| `npm run lint` | Check code with ESLint |
| `npm run format` | Format code with Prettier |
| `vercel dev` | Run local development with Vercel functions |
| `vercel deploy` | Deploy to Vercel staging |
| `vercel --prod` | Deploy to production |

---

## 📦 Collections

### 🌈 Kaleidoscope Collection
**Vibrant designs featuring diamonds, emeralds, rubies, sapphires**
- Premium gemstones from ethical sources
- 18K gold settings
- Contemporary luxury designs

### 🔷 Blue-Sky Collection  
**Persian turquoise with diamonds, citrine, pearls, and emeralds**
- Rare Persian turquoise (exclusive sourcing)
- Celebrity endorsements (Amal Clooney)
- Limited edition pieces

### 💎 Talisman Collection
**Elegant pieces in gold, diamonds, and rubies**
- Symbolic and meaningful designs
- Heritage-inspired craftsmanship
- Empowerment through luxury

---

## 💳 E-commerce Features

### Payment Processing
- **Stripe Checkout** integration for secure payments
- **GBP currency** support with international shipping
- **Multiple payment methods**: Cards, Apple Pay, Google Pay, Buy Now Pay Later
- **PCI compliance** through Stripe
- **Webhook integration** for real-time order processing

### Shopping Experience
- **Hybrid rendering** for instant page loads
- **Real-time inventory** checking via serverless functions
- **Persistent shopping cart** across devices
- **Guest checkout** optimized for luxury purchases
- **Progressive Web App** features for mobile users

### Dynamic Features
- **Server-side rendering** for cart and checkout pages
- **Edge functions** for sub-100ms API responses
- **Real-time stock validation** before purchase
- **Automated email sequences** for order management
- **Analytics integration** for conversion optimization

### Admin Features
- **Vercel dashboard** for deployment monitoring
- **Stripe dashboard** for order and payment management
- **Real-time performance** monitoring with Core Web Vitals
- **Automated backups** and version control

---

## 🎯 Performance Goals

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms  
- **Cumulative Layout Shift (CLS)**: < 0.1

### Lighthouse Targets
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100

### Optimization Strategies
- **Static generation** with Astro for maximum speed
- **Image optimization** with modern formats (WebP, AVIF)
- **CSS optimization** with purging and minification
- **JavaScript splitting** for optimal loading

---

## 🚀 Deployment

### Production Hosting: **Vercel** (Configured)

```bash
# Install Vercel CLI
npm i -g vercel

# Link to existing Vercel project
vercel link

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "functions": {
    "src/pages/api/**/*.ts": {
      "runtime": "edge"
    }
  },
  "env": {
    "STRIPE_PUBLISHABLE_KEY": "@stripe-publishable-key",
    "STRIPE_SECRET_KEY": "@stripe-secret-key"
  }
}
```

### Domain & SSL
- **Production URL**: `https://parisalondon.com`
- **Staging URL**: `https://parisa-london-git-main.vercel.app`
- **SSL Certificate**: Automatically managed by Vercel
- **CDN**: Global edge network included

---

## 📈 Analytics & Marketing

### Tracking Setup
- **Google Analytics 4** for site analytics
- **Google Search Console** for SEO monitoring
- **Facebook Pixel** for social media advertising
- **Hotjar** for user behavior analysis

### Marketing Integrations
- **Instagram Feed** API for social proof
- **Mailchimp/ConvertKit** for newsletter management
- **Google Reviews** widget for testimonials
- **WhatsApp Business** for customer support

---

## 🔒 Security & Privacy

### Data Protection
- **GDPR compliance** for EU customers
- **Privacy policy** and cookie consent
- **Secure checkout** through Stripe
- **SSL encryption** for all transactions

### Development Security
- **Environment variables** for sensitive data
- **API key rotation** for production
- **CORS configuration** for API endpoints
- **Content Security Policy** headers

---

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Responsive design across all devices
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Cart functionality and Stripe integration
- [ ] Form submissions and email delivery
- [ ] Page load performance
- [ ] Accessibility with screen readers

### Automated Testing
```bash
# Performance testing
npm run lighthouse

# Accessibility testing  
npm run a11y-test

# Link checking
npm run check-links
```

---

## 📞 Support & Contact

### Development Team
- **Lead Developer**: [Your Name]
- **Designer**: [Designer Name]
- **Project Manager**: [PM Name]

### Business Contact
- **Email**: hello@parisalondon.com
- **Phone**: +44 (0) 20 1234 5678
- **Address**: London, United Kingdom

---

## 📄 License

This project is proprietary and confidential. All rights reserved by Parisa London Jewellery.

---

## 🙏 Acknowledgments

- **Astro.js Team** for the amazing static site generator
- **Stripe** for secure payment processing
- **Unsplash/Pexels** for placeholder imagery during development
- **Google Fonts** for beautiful typography

---

*Built with ❤️ and ✨ for luxury jewellery lovers worldwide*