import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

// Cosmic dashboard live preview
// frame-ancestors 'self' http://localhost:3040 http://localhost:3000 http://127.0.0.1:3040 https://app.cosmicjs.com https://*.cosmicjs.com
