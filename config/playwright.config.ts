// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from a .env file (if it exists)
dotenv.config({ path: './config/.env' });


export default defineConfig({
    testDir: '../tests',
    timeout: 30000,
    retries: 2,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    use: {
        baseURL: process.env.BASE_URL || 'https://pocketaces2.github.io/fashionhub/',
        headless: true,
    },
});
