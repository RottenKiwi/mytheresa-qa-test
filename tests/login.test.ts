// tests/login.test.ts
import { test, expect } from '@playwright/test';
import { checkPageNot404 } from '../utils/checkPageNot404.ts';
import { login } from '../utils/login.ts';



test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Clear cookies and localStorage before each test run
        await page.context().clearCookies();

    });

    test('should allow the customer to log in', async ({ page, baseURL }) => {


        await checkPageNot404(page, baseURL + '/login.html' || 'https://pocketaces2.github.io/fashionhub/login.html');

        // Fill in the login form (assuming there are inputs with the following names/IDs)
        const username = process.env.LOGIN_USERNAME || '';
        const password = process.env.LOGIN_PASSWORD || '';

        // Use the login utility function
        await login(page, username, password);

        // Optionally, verify the URL if needed
        const currentURL = page.url();
        expect(currentURL).toBe(`${baseURL}/account.html`);

    });
});
