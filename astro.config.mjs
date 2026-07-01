import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aiworkflowguy.com',
  // Static output — deploys straight to Netlify with no adapter needed.
  // React is used only for a few animated islands (Framer Motion); the rest
  // of the site stays static HTML, so React ships only where an island is used.
  output: 'static',
  // sitemap generates /sitemap-index.xml (referenced by public/robots.txt) at build.
  // Post-conversion pages (thank-you, intake) are excluded — they shouldn't rank.
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !/\/(thank-you|thank-you-intake|intake)\/?$/.test(new URL(page).pathname),
    }),
  ],
});
