export function closeDialog() {
  cy.get('[role="dialog"]').within(() => {
    cy.findByRole('button', { name: /close/i }).click()
  })
}

export function waitForDialogToClose() {
  cy.get('[role="dialog"]').should('not.exist')
}

export function withinDialog(callback: () => void) {
  cy.get('[role="dialog"], [data-state="open"]').last().within(callback)
}

export function withinDialogContaining(text: string | RegExp, callback: () => void) {
  cy.findByText(text)
    .should('be.visible')
    .closest('[role="dialog"], [data-state="open"]')
    .within(callback)
}

