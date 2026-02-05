export function closeDialog(options?: { timeout?: number; closeButtonName?: string | RegExp }) {
  const timeout = options?.timeout ?? 10000
  const closeButtonName = options?.closeButtonName ?? /close/i

  cy.get('[role="dialog"]', { timeout }).within(() => {
    cy.findByRole('button', { name: closeButtonName, timeout }).click()
  })
}

export function waitForDialogToClose() {
  cy.get('[role="dialog"]').should('not.exist')
}

export function withinDialog(callback: () => void) {
  cy.get('[role="dialog"], [data-state="open"]').last().within(callback)
}
