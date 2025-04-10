# How to contribute to this project

## Getting Started

This project is a React application managed using bun. To contribute, follow the steps below:

### Prerequisites

Ensure you have the following installed:

- Node.js (version 22.x or later)
- bun@1.2.9

### Installation

1. Fork the repository (prefer the dev branch)
2. Clone your forked repository:

    ```shell
    git clone https://github.com/waldiez/react.git -b dev
    ```

3. Navigate to the project directory:

    ```shell
    cd react
    ```

4. Install the dependencies:

    ```shell
    bun install
    ```

### Running the Project

To start the development server, run:

```shell
bun dev
```

This will launch the application at `http://localhost:5173/`.

### Making Changes

1. Create a new branch for your feature or bugfix:

    ```shell
    git checkout -b your-branch-name
    ```

2. Make your changes in the codebase.
3. Commit your changes with a descriptive message:

    ```shell
    git commit -m "Description of your changes"
    ```

4. Push your branch to your forked repository:

    ```shell
    git push origin your-branch-name
    ```

### Submitting a Pull Request

1. Navigate to the original repository on GitHub.
2. Click on the "New Pull Request" button.
3. Select your branch from the "compare" dropdown.
4. Add a title and description for your pull request.
5. Click "Create Pull Request".
6. Select the "dev" branch as the base branch. After the pull request is reviewed, it will be merged into the "dev" branch. When ready, the changes will be merged into the "main" branch.

### Code Style

Ensure your code adheres to the project's coding standards. Run the following command to check for linting errors:

```shell
bun lint
```

To try and automatically fix linting errors, run:

```shell
bun format
```

### Running Tests

Run the test suite to ensure your changes do not break existing functionality:

```shell
bun test:coverage
bun test:snapshots  # to update snapshots
bun test:browser  # to use playwright *you might need to 'playwright install' first
bun test:all
# or `bun run test` // to run all tests (you might need to call `bun run test` and not `bun test`)
```

Thank you for contributing! 🎉
