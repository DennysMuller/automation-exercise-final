export function navegarParaLogin() {
    cy.get('a[href="/login"]').click();
}

export function efetuarLogout() {
    cy.get('a[href="/logout').should('be.visible').click();
}