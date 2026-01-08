import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL || 'https://app.staging.bloomwell.de',
    headless: false,  // Браузер видимий для дебагу
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
});