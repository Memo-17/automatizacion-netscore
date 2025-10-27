//const { defineConfig } = require('@playwright/test');
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  retries: 0,
  use: {
    headless: false,
    screenshot: 'on', 
    video: 'on', 
    trace: 'on', 
    ignoreHTTPSErrors: true,
  },
  reporter: [['html', { open: 'never' }]]
});