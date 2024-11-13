import { test, expect } from '@playwright/test';
import { fetchOpenPRs, convertToCSV, writeCSVToFile } from '../utils/fetchPRData';
import fs from 'fs';

test.describe('PR Status Test', () => {
    test('should fetch open pull requests and save to CSV', async () => {
        // Fetch open PRs from GitHub
        const prs = await fetchOpenPRs();

        // Check if there are any open PRs
        expect(prs.length).toBeGreaterThan(0); // You can assert this based on your requirements

        // Convert the fetched PR data to CSV format
        const csvData = convertToCSV(prs);

        // Write the CSV data to a file
        writeCSVToFile(csvData);

        // Assert that the CSV file was created
        const fileExists = fs.existsSync('open_pull_requests.csv');
        expect(fileExists).toBe(true);

        console.log('CSV file created with open pull requests data.');
    });
});
