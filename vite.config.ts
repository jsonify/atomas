/***********************************************
* FILE: vite.config.ts
* CREATED: 2025-04-05 16:26:22
*
* PURPOSE:
* This file configures Vite for the Atomas game project, including
* test setup, build configuration, and GitHub Pages deployment settings.
*
* CONFIGURATIONS:
* - plugins: React configuration
* - test: Vitest configuration with JSDOM
* - base: GitHub Pages base URL
************************************************/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/atomas/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/setup.ts',
      ]
    }
  }
})
