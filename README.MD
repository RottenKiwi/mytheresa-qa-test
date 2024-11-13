# Playwright Test Suite

This project consists of various Playwright tests to automate end-to-end testing for a web application. It covers functionality such as homepage checks, login functionality, link status verification, and more. The tests use Playwright to interact with the application and validate expected behavior.

## Project Structure

- **`tests/`**: Contains all the test scripts.
- **`utils/`**: Contains utility functions used across the tests.
- **`playwright.config.ts`**: Playwright configuration file.
- **`.env`**: Environment variables for sensitive data like login credentials.
- **`tsconfig.json`**: TypeScript configuration file.
- **`package.json`**: Defines the project dependencies and scripts.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (>= v16)
- **npm** (Node Package Manager)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://your-repository-url.git
cd your-project-directory
```

### 2. Install dependencies

Run the following command to install the required Node.js dependencies:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root of the project. Here's an example of the contents:

```env
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
```

Replace `your_username` and `your_password` with the appropriate values for your tests.

### 4. Set up Playwright

Playwright needs a few browsers installed to run tests. Install them by running:

```bash
npx playwright install
```

This will download the necessary browser binaries (Chromium, Firefox, and WebKit).

### 5. Configuration

You can modify the `playwright.config.ts` to adjust settings like base URL, test directories, and other Playwright options.

### 6. Run the Tests

Running Tests on Different Environments
To run all tests on the Local environment:

```bash
BASE_URL="http://localhost:4000/fashionhub/" npx playwright test --config=config/playwright.config.ts
```

If you want to run a the PR task, run the following command:

```bash
BASE_URL="http://localhost:4000/fashionhub/" npx playwright test tests/pr-status.test.ts --config=config/playwright.config.ts
```

To run all tests on the Staging environment (dummy environment):
```bash
BASE_URL="https://staging-env/fashionhub/" npx playwright test --config=config/playwright.config.ts
```

To run all tests on the Production environment:
```bash
BASE_URL="https://pocketaces2.github.io/fashionhub/" npx playwright test --config=config/playwright.config.ts
```

If you want to run a specific test file, you can use the following command:
```bash
BASE_URL="http://localhost:4000/fashionhub/" npx playwright test tests/homepage.test.ts --config=config/playwright.config.ts
```

## Utility Functions

The `utils/` folder contains utility functions that are reused across different test files.

- **`checkPageNot404`**: This function checks if a page returns a 404 status code and fails the test if the page is not found.

### Example Usage of `checkPageNot404`

```typescript
import { checkPageNot404 } from '../utils/checkPageNot404.ts';

test('example test', async ({ page }) => {
  await checkPageNot404(page, 'https://your-website-url.com');
  // Continue with test steps
});
```

- **`fetchOpenPRs`**: Fetches open pull requests from a GitHub repository using the GitHub API. Extracts essential information for each PR, including the PR name, created date, and author.

### Example Usage of `fetchOpenPRs`

```typescript
import { fetchOpenPRs } from '../utils/fetchOpenPRs.ts';

test('fetch open PRs test', async () => {
  const prs = await fetchOpenPRs();
  console.log(prs);
  // Use PR data in your test
});
```

- **`convertToCSV`**: Converts a JSON array of pull request data into a CSV format. This function utilizes the json2csv parser to handle CSV conversion.

### Example Usage of `convertToCSV`

```typescript
import { convertToCSV } from '../utils/convertToCSV.ts';

const prsData = [
  { pr_name: 'Fix login issue', created_at: '2023-11-12', author: 'user123' },
];

const csvData = convertToCSV(prsData);
console.log(csvData); // Outputs the CSV format of PR data
```

- **`writeCSVToFile`**: Writes a CSV-formatted string to a file. This utility function saves the CSV data to open_pull_requests.csv by default in the root project directory.

### Example Usage of `writeCSVToFile`

```typescript
import { writeCSVToFile } from '../utils/writeCSVToFile.ts';

const csvData = 'pr_name,created_at,author\nFix login issue,2023-11-12,user123';
writeCSVToFile(csvData);
```

- **`findAllLinks`**: Finds all anchor (<a>) tags on a page and returns their href attributes. Useful for link status verification in tests.

### Example Usage of `findAllLinks`

```typescript
import { findAllLinks } from '../utils/findAllLinks.ts';

test('link status test', async ({ page }) => {
  const links = await findAllLinks(page);
  console.log(links); // Outputs all links on the page
});
```

- **`login`**: Automates the login process by filling in a username and password, clicking the login button, and verifying that a welcome message appears, confirming a successful login.

### Example Usage of `login`

```typescript
import { login } from '../utils/login.ts';

test('login test', async ({ page }) => {
  await login(page, 'your_username', 'your_password');
  // Additional assertions after login
});
```


## Project Tasks

The following tasks are covered in this project:

1. **Homepage Test**: Verifies that the homepage loads without any console errors and includes the correct header.
2. **Login Test**: Checks if a user can log in using provided credentials.
3. **Link Status Test**: Verifies that all links on a page return status codes of 200 or 30x (no 40x errors).
4. **Pull Requests Test**: Fetches and outputs the open pull requests from a GitHub repository as a CSV file with PR name, created date, and author.

## Troubleshooting

- **Error: No tests found**: Ensure your test files are located in the `tests` directory and that the file names end with `.test.ts`.
- **Error: `fs` module not found**: Ensure you have installed `@types/node` by running `npm install --save-dev @types/node`.

