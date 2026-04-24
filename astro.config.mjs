import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  base: '/Cuenta-Publica',  // ← mayúscula C y P, igual que tu repo
});