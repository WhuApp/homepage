import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import lit from '@astrojs/lit';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
  integrations: [lit()],
  vite: {
    ssr: {
      external: 'lit/decorators.js',
    },
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
