import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dubai-legal-firm.pages.dev',
  integrations: [sitemap()],
  output: 'static',
  build: { format: 'directory' }
});
