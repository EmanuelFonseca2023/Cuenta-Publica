import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  base: '/Cuenta-Publica',
  vite: {                       
    plugins: [tailwindcss()],
  },
});