import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'hybrid', // ✅ Enable hybrid mode for API routes
  site: 'https://parisalondon.com',
  devToolbar: {
    enabled: false
  },
  integrations: [],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },
  // Security configuration moved to vercel.json for production
  // API routes are server-side rendered in hybrid mode
});
