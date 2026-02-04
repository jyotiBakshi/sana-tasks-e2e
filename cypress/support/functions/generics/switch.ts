export function verifyEnabled(switchLabel: string | RegExp) {
  cy.findByText(switchLabel)
    .closest('[role="menuitem"]')
    .find('[role="switch"]')
    .should('have.attr', 'aria-checked', 'true')
}

export function verifyDisabled(switchLabel: string | RegExp) {
  cy.findByText(switchLabel)
    .closest('[role="menuitem"]')
    .find('[role="switch"]')
    .should('have.attr', 'aria-checked', 'false')
}

export function toggle(switchLabel: string | RegExp) {
  cy.findByText(switchLabel)
    .closest('[role="menuitem"]')
    .find('[role="switch"]')
    .click()
}
