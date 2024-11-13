import { Page, expect } from '@playwright/test';

/**
 * Utility function to check if the page is a 404.
 * Fails the test if a 404 status is encountered.
 * @param page - The Playwright Page object.
 * @param url - The URL to visit.
 */
export async function checkPageNot404(page: Page, url: string) {
    const response = await page.goto(url);

    // Check if the page returned a 404 status code
    if (response && response.status() === 404) {
        expect(response.status(), `Expected a non-404 status, but got ${response.status()}`).not.toBe(404);
    }

    // Continue with the test if the page is not a 404
    expect(response?.status()).toBeLessThan(400); // Expect success or redirect status
}
