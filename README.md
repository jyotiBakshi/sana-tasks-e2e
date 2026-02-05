# Sana Tasks E2E Tests

UI test automation for Sana.ai workflow management using Cypress and TypeScript.

## Quick Start

- npm install
- npx cypress open

## Prerequisites

- Node.js v18.18.0 or higher
- npm

## Setup

npm install

## Running Tests

npx cypress open

## Authentication

**Current approach:**

- Manual Gmail OTP authentication (user-driven)
- Test waits up to 30 seconds for the blocking dialog to appear, then closes it
- Login email: jyoti.bakshy@gmail.com
- The logic lives in `gotoWorkflows()` in `cypress/support/flows/workflows.ts`.

## Test Approach

This project follows a maintainable, accessibility-focused testing strategy.

**1. Case-sensitive matching for UI text**  
Catches UI bugs when text casing changes unexpectedly. Uses exact strings for precise matching, RegExp for flexible patterns.

**2. Testing Library (accessibility-focused)**  
Locators based on how users interact - roles, accessible names, text, and placeholders. Ensures tests work the way real users experience the app.

**3. Fixture-based data-driven testing**  
JSON format enables extensive testing by modifying data (multiple steps, inputs) without changing test code.

### Code Organization

**4. Element coverage with reusable helpers**  
Different element types (buttons, inputs, dialogs, menus, contenteditable) abstracted into modular functions for reusability and cleanliness.

**5. TypeScript type safety**  
`WorkflowData` and `WorkflowEditData` interfaces prevent data structure errors and provide autocomplete for better coding experience.

**6. Separation of concerns**  
Test logic separated from element interaction logic. Changing locator strategy doesn't require updating all tests.

### Quality & Maintenance

**7. Verification after actions**  
`verifyVisible()` calls confirm UI state changes after interactions, ensuring actions complete successfully.

**8. Consistent code style**  
Prettier ensures readable, maintainable code across the team with consistent formatting rules.

Useful commands:

- npm run format
- npm run format:check

## Project Structure

```text
cypress/
  e2e/                         # Test files
    CreateWorkflow.cy.ts       # Workflow creation tests
    EditWorkflow.cy.ts         # Workflow editing tests

  fixtures/                    # Test data (JSON format)
    create-workflow.json       # Data for creation tests
    edit-workflow.json         # Data for editing tests

  support/
    flows/
      workflows.ts             # Reusable end-to-end UI flows (keeps specs readable)

    functions/
      generics/                # Reusable helper functions
        button.ts              # Button interactions
        dialog.ts              # Dialog/modal interactions
        findByRole.ts          # ARIA role-based queries
        findByText.ts          # Text-based queries
        input.ts               # Input field interactions
        link.ts                # Link interactions
        menu.ts                # Menu item selection
        menuButton.ts          # Three-dot menu interactions
        placeholder.ts         # Placeholder text interactions
        section.ts             # Section/container scoping
        switch.ts              # Toggle switch interactions
        contenteditable.ts     # Contenteditable element handling

    types/
      workflow.types.ts        # TypeScript interfaces

    commands.ts                # Custom Cypress commands
    e2e.ts                     # Global configuration & error handling

cypress.config.ts              # Cypress configuration
tsconfig.json                  # TypeScript configuration
```
