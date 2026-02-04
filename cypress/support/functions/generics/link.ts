export function click(name: string | RegExp) {
  cy.findByRole('link', { name }).click()
}

export function verifyVisible(name: string | RegExp) {
  cy.findByRole('link', { name }).should('be.visible')
}

export function clickWithTimeout(name: string | RegExp, timeout: number = 10000) {
  cy.findByRole('link', { name, timeout }).click()
}
