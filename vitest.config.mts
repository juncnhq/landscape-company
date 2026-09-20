import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

// .mts để Vite nạp bằng ESM loader — file .ts bị nạp như CommonJS và cảnh báo.
export default defineConfig({
  resolve: {
    alias: { '@': resolve(import.meta.dirname, 'src') },
  },
  test: {
    environment: 'node',
    // Chỉ chạy test thuần logic — không test nào được chạm vào DB, vì
    // DATABASE_URL trong .env trỏ thẳng tới Railway production.
    include: ['src/**/__tests__/**/*.test.ts'],
  },
})
