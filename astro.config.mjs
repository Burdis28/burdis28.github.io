// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://burdis28.github.io',

  integrations: [
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
  adapter: cloudflare(),
});