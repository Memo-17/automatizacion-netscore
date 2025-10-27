//const { defineConfig } = require('@playwright/test');
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  retries: 0,
  use: {
    launchOptions: {
      args: ['--start-maximized'],
      
    },
    headless: false,
    screenshot: 'on', 
    trace: 'on', 
    ignoreHTTPSErrors: true,
    video:{
      mode: 'on',
      size: {width: 1280, height: 720},
    },
    // Asegura que Playwright no fuerce un viewport fijo
    viewport: null,
  },
  
  reporter: 'html',

  projects: [
    {
      name: 'chromium',
    },
  ],
});