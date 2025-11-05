//const { defineConfig } = require('@playwright/test');
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test-cavs',
  //testDir: './test',

  //aumentar tiempo de espera de las pruebas
  timeout: 60000,
  retries: 3,

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
      size: {width: 1285, height: 613},
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