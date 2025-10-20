export function adicionarProdutosNoCarrinho () {
    cy.get('a[data-product-id="1"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="5"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="2"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="29"]').eq(1).click({force: true});
}

export function navegarParaCarrinho () {
    cy.get('a[href="/view_cart"]').first().click({force: true});
    cy.url().should('eq', 'https://automationexercise.com/view_cart');
}

export function fazerCheckout () {
    cy.get('a.btn').click();
    cy.get('.modal-title').should('be.visible').and('have.text', 'Checkout');
    cy.get('a[href="/login"] u').click();
}
