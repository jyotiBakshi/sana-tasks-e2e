/**
 * Helper functions for interacting with menu buttons (three dots icon)
 */

export function clickNearText(text: string | RegExp) {
  cy.contains(text).parent().find('button[aria-haspopup="menu"]').click()
}

export function click() {
  cy.get('button[aria-haspopup="menu"]').first().click()
}

export function clickByIndex(index: number = 0) {
  cy.get('button[aria-haspopup="menu"]').eq(index).click()
}
