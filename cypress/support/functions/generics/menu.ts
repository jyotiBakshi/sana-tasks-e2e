export function selectMenuItem(name: string | RegExp) {
  cy.findByRole('menu').within(() => {
    cy.findByRole('menuitem', { name }).click()
  })
}
