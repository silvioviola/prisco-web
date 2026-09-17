import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL final del sitio. Cuando conectes el dominio, dejalo así.
export default defineConfig({
  site: 'https://priscoautomotores.com.ar',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
