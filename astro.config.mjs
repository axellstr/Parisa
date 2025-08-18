import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'static',
  site: 'https://parisalondon.com',
  integrations: []
});
