import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://aiworkflowguy.com',
  // Static output — deploys straight to Netlify with no adapter needed.
  // React is used only for a few animated islands (Framer Motion); the rest
  // of the site stays static HTML, so React ships only where an island is used.
  output: 'static',
  integrations: [react()],
});
