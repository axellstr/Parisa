# Parisa London - Development Setup

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Navigation.astro # Site navigation
│   └── Hero.astro      # Hero section
├── layouts/            # Page layouts
│   └── Layout.astro    # Main layout template
├── pages/              # File-based routing
│   └── index.astro     # Homepage
└── styles/             # Separate CSS files
    ├── global.css      # Global styles and variables
    ├── navigation.css  # Navigation styles
    └── hero.css        # Hero section styles
```

## CSS Organization

- **global.css**: Contains CSS variables, resets, and utility classes
- **navigation.css**: Navigation component specific styles  
- **hero.css**: Hero section specific styles
- Each component imports its corresponding CSS file

## Next Steps

1. Add hero image to `public/images/hero-necklace.jpg`
2. Create product collection components
3. Add shopping cart functionality
4. Integrate Stripe for payments
