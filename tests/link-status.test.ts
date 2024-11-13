// tests/link-status.test.ts
import { test, expect } from '@playwright/test';
import { checkPageNot404 } from '../utils/checkPageNot404.ts';
import { findAllLinks } from '../utils/findAllLinks.ts';



test.describe('Link Status Tests', () => {
    test('should verify that all links return 200 or 30x status codes, with no 40x errors', async ({ page, request, baseURL }) => {

        await checkPageNot404(page, baseURL || 'https://pocketaces2.github.io/fashionhub/');


        // Use the utility function to find all links with href attributes
        const links = await findAllLinks(page);

        console.log(`Found ${links.length} links on the page.`);

        // Track any links that return unexpected status codes
        const invalidLinks: { url: string, status: number }[] = [];

        // Visit each link and check the status code
        for (const link of links) {
            const response = await request.get(link);
            const status = response.status();

            // Log the link and its status
            if (status === 200) {
                console.log(`✅ [200 OK] ${link}`);
            } else if (status >= 300 && status < 400) {
                console.log(`🔄 [30x Redirect] ${link} - Status: ${status}`);
            } else if (status >= 400) {
                console.log(`❌ [Error ${status}] ${link}`);
                // Track invalid links with 40x or higher error codes
                invalidLinks.push({ url: link, status });
            }

            // Validate that the status is 200 or in the 30x range
            expect(status).toBeGreaterThanOrEqual(200);
            expect(status).toBeLessThan(400);
        }

        // Assert that no invalid links were found
        expect(invalidLinks).toHaveLength(0);

        // Log any errors for debugging
        if (invalidLinks.length > 0) {
            console.error('Invalid links found:', invalidLinks);
        }
    });
});
