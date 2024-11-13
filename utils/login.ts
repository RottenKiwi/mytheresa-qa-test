import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {


    // Fill in the login form
    await page.fill('input#username', username);
    await page.fill('input#password', password);

    // Click the login button
    await page.click('input[type="submit"][value="Login"]');

    // Wait for the welcome message to confirm login
    const welcomeMessageLocator = page.locator('h2', { hasText: `Welcome, testUser!` });
    await welcomeMessageLocator.waitFor({ state: 'visible' });
}