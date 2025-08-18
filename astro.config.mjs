import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://parisalondon.com',
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
  }
});
