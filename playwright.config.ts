import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { Asset_Allocation } from './pages/Asset_Allocation';
import { Asset_DeAllocation } from './pages/Asser_DeAllocation';
dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 240000, 
  // testDir : './tests',
    testMatch:
  [
    // "Employee_Management.spec.ts"
  "tests/Asset_Enrollment.spec.ts",
  // "tests/Asset_Allocation.spec.ts",
  // "tests/Asset_DeAllocation.spec.ts",
   // "tests/Asset_OverView.spec.ts",
  //  "tests/AssetManagement.spec.ts",
  //  "LoginPage.spec.ts"
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  workers : 1,
  reporter: [["html"] , ['line'] , ["allure-playwright"]],
  // reporter: [
  //   ["dot"],
  //   ['allure-playwright'],
  //   ["json", {
  //     outputFile: "jsonReports/jsonReport.json"
  //   }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: process.env.URL || 'https://topuptalent.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // actionTimeout : 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

