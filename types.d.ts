/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    // Add custom command type declarations here
    // Example:
    // login(email: string, password: string): Chainable<void>
  }
}
