export function typeInLast(placeholder: string | RegExp, text: string) {
  cy.findByPlaceholderText(placeholder).last().type(text)
}

export function clearAndType(
  placeholder: string | RegExp,
  text: string,
  options?: { timeout?: number }
) {
  const element = cy.findByPlaceholderText(placeholder, options)
  element.should('be.visible').clear().type(text)
}
