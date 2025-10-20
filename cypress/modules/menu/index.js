export function navegarParaLogin() {
    cy.get('a[href="/login"]').click();
}

export function efetuarLogout() {
    cy.get('a[href="/logout').should('be.visible').click();
}

export function navegarParaProdutos() {
    cy.get('a[href="/products"]').click();
    cy.get('.title').should('have.text', 'All Products');
}