// Arquivo auxiliar
import { fakerPT_BR as faker } from '@faker-js/faker';

export function getNumeroRandomico() {
  // return new Date().getTime();  
  // return faker.number.hex({min: 10000, max: 65535})
  return faker.number.bigInt()
}

export function getEmailRandomico() {
  // return `qa-teste-${getNumeroRandomico()}@email.com`;
  return faker.internet.email({ firstName: 'qa-teste-pgats' });
}

/**
 * Seleciona um país aleatório da lista de opções fornecida.
 * @returns {string} O nome de um país.
 */
export function selecionarPaisAleatorio() {
  // Array contendo as opções de países fornecidas
  const listaPaises = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Israel',
    'New Zealand',
    'Singapore'
  ];

  // O método arrayElement do Faker serve para escolher um item aleatório de um array.
  // Usamos 'faker.helpers.arrayElement' se estivermos usando o 'faker-js/faker'
  // OU 'faker.random.arrayElement' se estivermos usando a versão mais antiga.
  // Assumindo a versão moderna (@faker-js/faker):
  return faker.helpers.arrayElement(listaPaises);
}

export function limparLoginEmailPassword() {
  // Limpar os campos
  cy.get('input[data-qa="login-email"]')
    .clear({ timeout: 3000 })
    .should('have.value', '')
    .get('input[data-qa="login-password"]') // Continua na mesma cadeia
    .clear({ timeout: 3000 })
    .should('have.value', '')
}
// Tradicional
// export default getNumeroRandomico();
// export default getEmailRandomico();