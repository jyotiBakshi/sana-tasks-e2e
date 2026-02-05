export function clickByIndex(index: number = 0) {
  cy.get('div[contenteditable="true"]').eq(index).click()
}

export function clearAndType(index: number, text: string) {
  cy.get('div[contenteditable="true"]').eq(index).click().clear().type(text)
}

export function verifyText(index: number, text: string) {
  cy.get('div[contenteditable="true"]').eq(index).should('have.text', text)
}
