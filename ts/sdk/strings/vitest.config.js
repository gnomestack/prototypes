/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*_test.ts'],
    exclude: ['**/node_modules/**', './deno/**']
  }
})