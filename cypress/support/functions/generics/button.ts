export function click(name: string | RegExp) {
  cy.findByRole('button', { name }).click()
}

export function verifyVisible(name: string | RegExp) {
  cy.findByRole('button', { name }).should('be.visible')
}

export function clickWithTimeout(name: string | RegExp, timeout: number = 10000) {
  cy.findByRole('button', { name, timeout }).click()
}

export function verifyDisabled(name: string | RegExp) {
  cy.findByRole('button', { name }).should('be.disabled')
}

export function verifyEnabled(name: string | RegExp) {
  cy.findByRole('button', { name }).should('not.be.disabled')
}
