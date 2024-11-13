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

To run all the tests with the specified BASE_URL and config file, use the following command:

```bash
BASE_URL="http://localhost:4000/fashionhub/" npx playwright test --config=config/playwright.config.ts
```

If you want to run a specific test file, you can use the following command:

```bash
npx playwright test tests/homepage.test.ts
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

## Project Tasks

The following tasks are covered in this project:

1. **Homepage Test**: Verifies that the homepage loads without any console errors and includes the correct header.
2. **Login Test**: Checks if a user can log in using provided credentials.
3. **Link Status Test**: Verifies that all links on a page return status codes of 200 or 30x (no 40x errors).
4. **Pull Requests Test**: Fetches and outputs the open pull requests from a GitHub repository as a CSV file with PR name, created date, and author.

## Troubleshooting

- **Error: No tests found**: Ensure your test files are located in the `tests` directory and that the file names end with `.test.ts`.
- **Error: `fs` module not found**: Ensure you have installed `@types/node` by running `npm install --save-dev @types/node`.

