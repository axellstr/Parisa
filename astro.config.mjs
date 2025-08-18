import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true,
    functionPerRoute: false
  }),
  site: 'https://parisalondon.com',
  integrations: []
});
