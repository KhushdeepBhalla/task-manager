import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4201',
    browserName: 'chromium',
    headless: false,
    launchOptions: {
      slowMo: 100,
    },
  },
  webServer: {
    command: 'npm run ng -- serve --host 127.0.0.1 --port 4201 --no-open',
    url: 'http://127.0.0.1:4201',
    reuseExistingServer: false,
  },
});
