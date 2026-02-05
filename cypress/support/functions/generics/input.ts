export function typeIntoPlaceholder(
  placeholder: string | RegExp,
  text: string,
  pressEnter = false
) {
  const input = cy.findByPlaceholderText(placeholder)
  input.clear().type(text)
  if (pressEnter) {
    input.type('{enter}')
  }
}

export function typeIntoDataPlaceholder(placeholder: string, text: string) {
  cy.get(`[data-placeholder="${placeholder}"]`).type(text)
}

export function clearAndType(selector: string, text: string, options?: { timeout?: number }) {
  cy.get(selector, options).clear().type(text)
}

export function clearAndTypeInTestId(testId: string, text: string) {
  cy.get(`input[data-testid="${testId}"]`).clear().type(text)
}
