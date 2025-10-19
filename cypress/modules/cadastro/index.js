import { fakerPT_BR as fakerPT_BR} from "@faker-js/faker";
import {
  selecionarPaisAleatorio
} from '../../support/helpers';
import { password } from '../../modules/login';

class Cadastro {
  constructor() {
    this.dadosUsuario = {};
  }

  /**
   * Gera dados de usuário aleatórios e os armazena na instância da classe.
   */
  gerarDadosDeUsuario() {
    this.dadosUsuario = {
      title: fakerPT_BR.helpers.arrayElement(['Mr', 'Mrs']),
      firstName: fakerPT_BR.person.firstName(),
      lastName: fakerPT_BR.person.lastName(),
      company: fakerPT_BR.company.name(),
      address1: fakerPT_BR.location.streetAddress(),
      address2: fakerPT_BR.location.secondaryAddress(),
      country: selecionarPaisAleatorio(),
      state: fakerPT_BR.location.state(),
      city: fakerPT_BR.location.city(),
      zipcode: fakerPT_BR.location.zipCode(),
      mobile_number: fakerPT_BR.phone.number(),
    };
  }

  prencherFormularioDeCadastroCompleto() {
    // Garante que os dados do usuário sejam gerados antes de preencher o formulário.
    this.gerarDadosDeUsuario();

    // Verificar o conteúdo direto do texto:
    cy.get('h2.title.text-center b').should('contain.text', 'Enter Account Information')
    cy.get('input[type=radio]').check(this.dadosUsuario.title)
    cy.get('[id="password"]').type(password, { log: false });

    // Para comboboxes ou selects -> select
    cy.get('select[data-qa="days"]').select('23');
    cy.get('select[data-qa="months"]').select('September');
    cy.get('select[data-qa="years"]').select('1990');

    // Para radio ou checkboxes -> check
    cy.get('input[type="checkbox"]#newsletter').check();
    cy.get('input[type="checkbox"]#optin').check();

    cy.get('input#first_name').type(this.dadosUsuario.firstName);
    cy.get('input#last_name').type(this.dadosUsuario.lastName);
    cy.get('input#company').type(this.dadosUsuario.company);
    cy.get('input#address1').type(this.dadosUsuario.address1);
    cy.get('input#address2').type(this.dadosUsuario.address2);
    cy.get('select#country').select(this.dadosUsuario.country, { force: true });
    cy.get('input#state').type(this.dadosUsuario.state);
    cy.get('input#city').type(this.dadosUsuario.city);
    cy.get('[data-qa="zipcode"]').type(this.dadosUsuario.zipcode);
    cy.get('[data-qa="mobile_number"]').type(this.dadosUsuario.mobile_number);

    // Act
    cy.get('[data-qa="create-account"]').click();
  }
}

export default new Cadastro();