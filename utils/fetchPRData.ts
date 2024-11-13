import axios from 'axios';
import { Parser } from 'json2csv';
import fs from 'fs';

const GITHUB_REPO = 'appwrite/appwrite'; // Replace with the desired repo
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/pulls`;

// Function to fetch open pull requests
export async function fetchOpenPRs(): Promise<any[]> {
    try {
        // Make a GET request to the GitHub API to fetch open PRs
        const response = await axios.get(GITHUB_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        // Extract required information: PR name, created date, and author
        const prs = response.data.map(pr => ({
            pr_name: pr.title,
            created_at: pr.created_at,
            author: pr.user.login,
        }));

        return prs;
    } catch (error) {
        console.error('Error fetching pull requests:', error);
        return [];
    }
}

// Function to convert PR data to CSV
export function convertToCSV(data: any[]): string {
    const parser = new Parser();
    return parser.parse(data);
}

// Function to write CSV data to a file
export function writeCSVToFile(csvData: string): void {
    fs.writeFileSync('open_pull_requests.csv', csvData, 'utf8');
}
