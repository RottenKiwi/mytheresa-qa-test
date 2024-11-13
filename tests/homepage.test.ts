// tests/homepage.test.ts
import { test, expect } from '@playwright/test';
import { checkPageNot404 } from '../utils/checkPageNot404.ts';

test.describe('Homepage Tests', () => {
    test('should load the homepage without console errors', async ({ page, baseURL }) => {
        // Capture console messages
        const consoleErrors: string[] = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                consoleErrors.push(message.text());
            }
        });

        await checkPageNot404(page, baseURL || 'https://pocketaces2.github.io/fashionhub/');

        // Check the page title or header text
        await expect(page.locator('header h1')).toHaveText('FashionHub');

        // Ensure no console errors were captured
        expect(consoleErrors).toHaveLength(0);
    });
});
