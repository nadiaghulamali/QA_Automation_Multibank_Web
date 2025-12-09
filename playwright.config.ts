import { defineConfig, devices } from '@playwright/test';

const env = process.env.TEST_ENV || 'prod';

const baseURLs: Record<string, string> = {
  prod: 'https://trade.multibank.io',
};

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: baseURLs[env],
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
         viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], 
        viewport: { width: 1920, height: 1080 }
      },
    }
  ],
});
