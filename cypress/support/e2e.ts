// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import Testing Library
import '@testing-library/cypress/add-commands'

// https://github.com/quasarframework/quasar/issues/2233
// Ignore uncaught exceptions from third-party scripts and browser rendering issues
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */

  // Ignore ResizeObserver loop errors (benign browser rendering issue)
  const resizeObserverLoopErr = /ResizeObserver loop/
  if (resizeObserverLoopErr.test(err.message)) {
    return false
  }

  // Ignore third-party script errors (Intercom, TRPC, etc.)
  const thirdPartyErrors = /(TRPCClientError|not valid JSON)/
  if (thirdPartyErrors.test(err.message)) {
    return false
  }

  // Allow other exceptions to fail the test
  return true
})
