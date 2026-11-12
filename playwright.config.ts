import { defineConfig } from '@playwright/test'

const url = 'http://127.0.0.1:4173'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL: url,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url,
    reuseExistingServer: false,
  },
})
