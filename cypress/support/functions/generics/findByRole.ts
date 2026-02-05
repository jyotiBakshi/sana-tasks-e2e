export function find(role: string, options?: { name?: string | RegExp; timeout?: number }) {
  return cy.findByRole(role, options)
}

export function click(role: string, options?: { name?: string | RegExp; timeout?: number }) {
  cy.findByRole(role, options).click()
}

export function clickFirst(role: string, options?: { name?: string | RegExp; timeout?: number }) {
  cy.findAllByRole(role, options).first().click()
}

export function verifyVisible(
  role: string,
  options?: { name?: string | RegExp; timeout?: number }
) {
  cy.findByRole(role, options).should('be.visible')
}

export function verifyDisabled(role: string, options?: { name?: string | RegExp }) {
  cy.findByRole(role, options).should('be.disabled')
}

export function verifyEnabled(role: string, options?: { name?: string | RegExp }) {
  cy.findByRole(role, options).should('not.be.disabled')
}
