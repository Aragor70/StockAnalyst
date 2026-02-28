/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, path.resolve(__dirname, 'config'), '')

  return {
    plugins: [
      react(),
      legacy()
    ],

    define: {
      'process.env': {
        ...env
      }
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    }
  }
})