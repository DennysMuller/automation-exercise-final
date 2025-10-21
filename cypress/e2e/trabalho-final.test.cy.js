/// <reference types="cypress" />

import cadastro from '../modules/cadastro';
import dataForm from '../fixtures/dadosParaFormulario.json';
import { preencherFormularioDeContato } from '../modules/contato';
import { getEmailRandomico, limparLoginEmailPassword } from '../support/helpers';
import { 
  adicionarProdutosNoCarrinho,
  navegarParaCarrinho,
  fazerCheckout
} from '../modules/carrinho';
import { 
  navegarParaLogin, 
  efetuarLogout, 
  navegarParaProdutos
} from '../modules/menu';
import { 
  loginUser,
  password,
  email,
  preencheFormularioDePreCadastro, 
  preencheFormularioDeLogin
} from '../modules/login';

const uri = 'https://automationexercise.com/',
timestamp = Date.now();  

describe('Automation Exercise, testes propostos para o trabalho final da disciplina: Automação de Testes na camada de Interface (Web)', () => {  
  context('Testes de Autenticação e Gerenciamento de Conta de Usuários', () => {
      beforeEach(() => {
        cy.visit(uri);
        // Validar se a logo está visível, para clicar na logo cy.get('.logo a').click();
        cy.get('.logo').should('be.visible');
        // Ou validar usando o include
        cy.url().should('include', 'automationexercise.com');
        // ou usando o equal é mais restritivo
        cy.url().should('eq', 'https://automationexercise.com/');

        // cy.get('a[href="/login"]').click();
        navegarParaLogin();
      });

      after(() => {
        cy.request({
          method: "GET",
          url: `https://automationexercise.com/api/getUserDetailByEmail`,
          failOnStatusCode: true,
          form: false,
          qs: {
              email: email // ?email=valor_da_variavel_email
            }
        }).then((response) => {
          cy.log(response.body)
        });
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                email: email,
                password: password,
            },
            qs: {
                email: email // ?email=valor_da_variavel_email
              }
        }).then((response) => {
          cy.log(response.body)
        })
    });

    it("Test Case 1: Registrar usuário", () => {
      cy.get('.signup-form h2').should('be.visible');
      // ou conteúdo direto do texto: New User Signup!
      cy.get('.signup-form h2').should('have.text', 'New User Signup!');
      
      preencheFormularioDePreCadastro();
      cadastro.prencherFormularioDeCadastroCompleto();

      // Asserção
      cy.url().should('eq', 'https://automationexercise.com/account_created');
      cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');

      cy.get('[data-qa="continue-button"]').click();
      // Valida que o nome de usuário aparece em negrito (<b>) na área de "Logged in as"
      cy.contains('b', loginUser);

      // deletar
      //cy.get('.nav.navbar-nav [href="/delete_account"]').click();
      //cy.get('[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
      //cy.get('[data-qa="continue-button"]').click();
    });

    it("Test Case 2: Login de usuário com email e senha válidos", () => {
      cy.get('.login-form h2').should('have.text', 'Login to your account');
      preencheFormularioDeLogin();

      // Asserção
      // Samuel
      cy.get('i.fa-user').parent().should('contain', loginUser);
      cy.get('a[href="/logout').should('be.visible');
      
      // Segundo a explicação do Samuel o contains implicitamente possue o should, logo não faz sentido deixar como estava
      // cy.contains('b', loginUser).should('have.text', 'Caso Teste 1');    
      cy.contains('b', loginUser);

    });

    it("Test Case 3: Login de usuário com email e senha inválidos", () => {
      cy.get('.login-form h2').should('have.text', 'Login to your account');

      // Validar email inválido
      cy.get('input[data-qa="login-email"]').type(`${email}.br`);
      cy.get('input[data-qa="login-password"]').type(password, { log: true });
      cy.get('button[data-qa="login-button"]').click();

      // Asserção
      cy.get('#form p').should('have.text', 'Your email or password is incorrect!');

      // Limpar os campos
      limparLoginEmailPassword();

      // Validar senha inválida
      cy.get('input[data-qa="login-email"]').type(email); 
      cy.get('input[data-qa="login-password"]').type(`${password} `, { log: true });
      cy.get('button[data-qa="login-button"]').click();
      
      // Asserção
      cy.get('#form p').should('have.text', 'Your email or password is incorrect!');

    });

    it("Test Case 4: Logout de usuário", () => {
      cy.get('.login-form h2').should('have.text', 'Login to your account');

      preencheFormularioDeLogin();
      
      // Asserção
      cy.contains('b', loginUser);
      cy.get('i.fa-user').parent().should('contain', loginUser);

      // Act
      efetuarLogout();

      // Asserção
      cy.get('.or').should('have.text', 'OR');
      cy.url().should('contain', 'login');
      cy.contains('Login to your account');
      cy.get('a[href="/logout"]').should('not.exist');
      cy.get('a[href="/login"]').should('contain', 'Signup / Login');

    });

    it("Test Case 5: Registrar usuário com email já cadastrado", () => {
      cy.get('.login-form h2').should('have.text', 'Login to your account');

      cy.get('.signup-form h2').should('have.text', 'New User Signup!');

      preencheFormularioDePreCadastro(`loginUser - ${timestamp}`);

      // Asserção
      cy.get('#form p').should('have.text', 'Email Address already exist!');

    });
  });
});

describe('Automation Exercise, testes propostos para o trabalho final da disciplina: Automação de Testes na camada de Interface (Web)', () => {
  context('Testes de Navegação e Compra de Produtos, e Contato', () => {   
    beforeEach(() => {
        cy.visit(uri);
        // Validar se a logo está visível, para clicar na logo cy.get('.logo a').click();
        cy.get('.logo').should('be.visible');
        // Ou validar usando o include
        cy.url().should('include', 'automationexercise.com');
        // ou usando o equal é mais restritivo
        cy.url().should('eq', 'https://automationexercise.com/');

        // cy.get('a[href="/login"]').click();
        navegarParaLogin();
      });

      afterEach(() => {
        cy.request({
          method: "GET",
          url: `https://automationexercise.com/api/getUserDetailByEmail`,
          failOnStatusCode: true,
          form: false,
          qs: {
              email: email // ?email=valor_da_variavel_email
            }
        }).then((response) => {
          cy.log(response.body)
        });
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                email: email,
                password: password,
            },
            qs: {
                email: email // ?email=valor_da_variavel_email
              }
        }).then((response) => {
          cy.log(response.body)
        })
      });

    it("Test Case 6: Enviar um formulário de contato com upload de arquivo", () => {
      // Acessar formulário
      cy.get('a[href*=contact]').click()

      // Formulário e anexar arquivo
      preencherFormularioDeContato();

      // asserts
      cy.get('.status').should('be.visible')
      cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });

    it("Test case 8: Verificar todos os produtos e a página de detalhes do produto", () => {
      cy.visit(uri);
      cy.get('.logo').should('be.visible');
      cy.url().should('eq', 'https://automationexercise.com/');

      navegarParaProdutos();

      // Asserções
      cy.url().should('eq', 'https://automationexercise.com/products');
      cy.get('.title').should('have.text', 'All Products');
      cy.get('.col-sm-9').should("have.length", 1);

      cy.get('a[href="/product_details/1"').click();

      // Asserções
      cy.url().should('eq', 'https://automationexercise.com/product_details/1');
      cy.get('.product-information').should('be.visible');
      cy.get('.product-information h2').should('have.text', 'Blue Top');
      cy.get('.product-information p').should('contain.text', 'Category: Women > Tops');
      cy.get('.product-information span').should('contain.text', 'Rs. 500');
      cy.get('.product-information p').should('contain.text', 'Availability: In Stock');
      cy.get('.product-information p').should('contain.text', 'Condition: New');
      cy.get('.product-information p').should('contain.text', 'Brand: Polo');
      // Ou todos
      cy.get('.product-information p').should('have.text', 'Category: Women > TopsAvailability: In StockCondition: NewBrand: Polo');
    });

    it("Test case 9: Procurar por produtos", () => {
      cy.visit(uri);
      cy.get('.logo').should('be.visible');
      cy.url().should('eq', 'https://automationexercise.com/');

      navegarParaProdutos();

      cy.get('input[id="search_product"]').type('tshirt');
      cy.get('button[id="submit_search"]').click();

      cy.url().should('eq', 'https://automationexercise.com/products?search=tshirt');
      cy.get('.title').should('have.text', 'Searched Products');
      cy.get('.product-image-wrapper').should("have.length", 6);
      
    });

    it("Test case 10: Verificar a subscrição (subscription) na página inicial", () => {
      cy.visit(uri);
      cy.get('.logo').should('be.visible');
      cy.url().should('eq', 'https://automationexercise.com/');

      cy.get('.single-widget h2').should('have.text', 'Subscription');
      cy.get('input[id="susbscribe_email"]').type(getEmailRandomico());
      cy.get('button[id="subscribe"]').click();
      cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!');

      // Uma solução mais certeira. 
      // should('be.visible') garante que o elemento esteja visível antes de prosseguir.
      // .and('have.text...') encadear outra asserção no mesmo elemento, verificando se
      // o texto corresponde ao esperado. O and() é apenas um alias para should(), mas 
      // melhora a legibilidade do código.
      cy.get('.alert-success').should('be.visible').and('have.text', 'You have been successfully subscribed!');

    });

    it("Test case 15: Fazer pedido: Registrar antes de finalizar a compra", () => {
      cy.visit(uri);
      cy.url().should('eq', 'https://automationexercise.com/');

      // Adicionar os produtos, passo 8
      adicionarProdutosNoCarrinho();
      cy.get('.modal-title').should('have.text', 'Added!');
      
      // Ir para o carrinho e validar os produtos adicionados
      navegarParaCarrinho();
      cy.get('.active').should('have.text', 'Shopping Cart');
      cy.get('.cart_product').should("have.length", 4);

      // Fazer o checkout
      fazerCheckout();

      // Se inscrever no site, passos 4 até 7
      preencheFormularioDePreCadastro();

      // Adicionar uma asserção para garantir que a navegação para a página de cadastro ocorreu
      cy.url().should('include', '/signup');

      // Gera e armazena os dados
      cadastro.gerarDadosDeUsuario(); 
      cadastro.prencherFormularioDeCadastroCompleto();

      // Ir para o carrinho e validar
      navegarParaCarrinho();
      cy.get('.active').should('have.text', 'Shopping Cart');
      cy.get('.cart_product').should("have.length", 4);

      // Fazer segundo checkout, não compensa fazer uma nova função para apenas clicar no botão,
      // pois o usuário já encontra-se logado
      cy.get('a.btn').click();

      // 12 Validar endereço e detalhes do pedido
      cy.get('h2.heading').first().should('have.text', 'Address Details');
      cy.get('.page-subheading').first().should('have.text', 'Your delivery address');
      cy.get('#address_delivery .address_firstname.address_lastname').should('have.text', `${cadastro.dadosUsuario.title}. ${cadastro.dadosUsuario.firstName} ${cadastro.dadosUsuario.lastName}`);

      cy.get('#address_delivery .address_address1.address_address2')
        .eq(0).should('have.text', cadastro.dadosUsuario.company);

      cy.get('#address_delivery .address_address1.address_address2')
        .eq(1).should('have.text', cadastro.dadosUsuario.address1);

      cy.get('#address_delivery .address_address1.address_address2')
        .eq(2).should('have.text', cadastro.dadosUsuario.address2);

      // Usar 'contain' para cada parte do endereço para ignorar quebras de linha e espaços extras
      cy.get('#address_delivery .address_city.address_state_name.address_postcode')
        .should('contain', cadastro.dadosUsuario.city)
        .and('contain', cadastro.dadosUsuario.state)
        .and('contain', cadastro.dadosUsuario.zipcode);

      cy.get('#address_delivery .address_country_name').should('have.text', cadastro.dadosUsuario.country);
      cy.get('#address_delivery .address_phone').should('have.text', cadastro.dadosUsuario.mobile_number);

      // Detalhes
      cy.get('h2.heading').eq(1).should('have.text', 'Review Your Order');
      // Valida que existem 4 linhas de produto, ignorando a linha de total.
      // [] são usados para criar um Seletor de Atributo. permitem que você encontre elementos HTML
      // com base em seus atributos (como id, class, href, data-qa, etc.) e nos valores desses atributos.
      // ^ Quando usado dentro de um seletor de atributo atua como um modificador que significa "começa com". 
      // id^="product-" 
      // a condição do filtro é: o atributo id deve "começar com" a string 'product-'.
      cy.get('#cart_info tbody tr[id^="product-"]').should("have.length", 4);

      // Preencher formulário descritivo do pedido e fazer o pedido
      cy.get('.form-control').type(dataForm.body);
      cy.get('a[href="/payment"]').click();

      // Informar dados do cartão, clicar no botão Pagar e confirmar o pedido
      cy.get('h2.heading').should('have.text', 'Payment');
      cy.get('input[data-qa="name-on-card"]').type(cadastro.dadosUsuario.firstName + ' ' + cadastro.dadosUsuario.lastName);
      cy.get('input[data-qa="card-number"]').type(dataForm['card number']);
      cy.get('input[data-qa="cvc"]').type(dataForm.cvc);
      cy.get('input[data-qa="expiry-month"]').type(`${dataForm.mes}`);
      cy.get('input[data-qa="expiry-year"]').type(`${dataForm.ano}`);
      
      // Pedido efetuado com sucesso, a mensagem #success_message div tem quebra de linha e tabulações 
      // e não fica visível salvo se retornar a página
      cy.get('#success_message div').should('contain.text', 'Your order has been placed successfully!');
      cy.get('button[data-qa="pay-button"]').click();

      // Ajustado para a página de conclusão
      cy.get('[data-qa="order-placed"]').should('be.visible').and('have.text', 'Order Placed!');
      cy.get('#form p').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');

    });
  });
});