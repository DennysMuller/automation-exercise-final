export const 
            loginUser = 'Caso Teste 1',
            email = 'caso_teste_1@email.com',
            password = '1234';

export function preencheFormularioDePreCadastro(nome = loginUser) {
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
}

export function preencheFormularioDeLogin() {
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password, { log: true });
    cy.get('button[data-qa="login-button"]').click();
    
}