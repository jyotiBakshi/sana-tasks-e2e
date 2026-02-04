export function find(text: string | RegExp, options?: { timeout?: number }) {
  return cy.findByText(text, options)
}

export function click(text: string | RegExp, options?: { timeout?: number }) {
  cy.findByText(text, options).click()
}

export function verifyVisible(text: string | RegExp, options?: { timeout?: number }) {
  cy.findByText(text, options).should('be.visible')
}

export function verifyNotVisible(text: string | RegExp) {
  cy.findByText(text).should('not.exist')
}
