import { Page } from '@playwright/test';

export async function findAllLinks(page: Page) {
    // Find all <a> tags and return the href attributes
    return page.locator('a[href]').evaluateAll((anchors) =>
        anchors.map((anchor) => (anchor as HTMLAnchorElement).href)
    );
}