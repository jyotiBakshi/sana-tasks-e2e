export function clickButtonInSection(sectionName: string | RegExp, buttonName: string | RegExp) {
  cy.contains(sectionName)
    .parent()
    .within(() => {
      cy.findByRole('button', { name: buttonName }).click()
    })
}
