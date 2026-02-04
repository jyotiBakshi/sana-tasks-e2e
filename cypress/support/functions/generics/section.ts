/**
 * Helper functions for interacting with sections/containers
 */

export function withinSection(sectionName: string | RegExp, callback: () => void) {
  cy.contains(sectionName).parent().within(callback)
}

export function clickButtonInSection(sectionName: string | RegExp, buttonName: string | RegExp) {
  cy.contains(sectionName).parent().within(() => {
    cy.findByRole('button', { name: buttonName }).click()
  })
}
