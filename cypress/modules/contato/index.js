import dataForm from '../../fixtures/dadosParaFormulario.json';

export function navegarParaContato () {
    cy.get('a[href*=contact]').click()
}

export function preencherFormularioDeContato () {
    cy.get('[data-qa="name"]').type(dataForm.name)
    cy.get('[data-qa="email"]').type(dataForm.email)
    cy.get('[data-qa="subject"]').type(dataForm.subject)
    cy.get('[data-qa="message"]').type(dataForm.message)
    cy.fixture('Lula_Ladrão.png').as('arquivo');
    cy.get('input[type=fiLe]').selectFile('@arquivo');
}