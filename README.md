# testiny-playwright

## Description

Testiny-Playwright is a project designed to integrate and automate the execution of test plans and test cases using the Testiny API and the Playwright testing framework. This project facilitates automatic test execution and result management through Testiny.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository:

    ```sh
    git clone https://github.com/frangr2/testiny-playwright.git
    cd testiny-playwright
    ```

2. Install the dependencies:

    ```sh
    git clone https://github.com/frangr2/testiny-playwright.git
    cd testiny-playwright
    ```

3. Install the necessary browsers for Playwright:

    ```sh
    npx playwright install
    ```

## Configuration

1. Create a `.env` file in the root of the project and add the following environment variables:

    ```ts
    TESTINY_API_KEY=your_testiny_api_key
    ```
2. Configure your `playwright.config.ts` according to your specific needs.

## Usage

1. To run the tests, simply use the following command:

    ```sh
    npm test
    ```
2. Test results will be automatically managed and reported through the integration with Testiny.

## Project Structure

- `src/` - Source code of the project.
- `tests/` - Test files written with Playwright.
- `playwright.config.ts` - Playwright configuration file.
- `tsconfig.json` - TypeScript configuration file.
- `.gitignore` - Files and directories ignored by git.
- `package.json` - Project dependencies and scripts.
- `package-lock.json` - Dependency lock file to ensure consistency.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/new-feature).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/new-feature).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.