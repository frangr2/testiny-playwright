import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    // Otros ajustes que desees configurar
  },
});
