# Projeto de Automação de Testes - Automation Exercise

## 📝 Resumo

Este projeto consiste na automação de testes para a camada de interface (Web) do site [Automation Exercise](https://automationexercise.com/). O objetivo é validar funcionalidades da aplicação, seguindo os casos de teste propostos: 1 a 10.

O escopo aborda diversos fluxos, como cadastro, login, busca de produtos e finalização de compra, demonstrando a aplicação de boas práticas de automação, como a organização do código em módulos (similar ao padrão Page Objects), a separação de responsabilidades e a utilização de arquivos de fixtures para gerenciamento de massa de dados.

---

## 🚀 Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução para o JavaScript.
*   **Cypress:** Framework principal para automação de testes E2E.
*   **@faker-js/faker:** Biblioteca para geração de dados fictícios (massa de dados dinâmica).
*   **cypress-mochawesome-reporter:** Plugin para geração de relatórios de teste em HTML.

---

## ⚙️ Como Usar

Siga os passos abaixo para configurar e executar os testes em seu ambiente local.

### Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (versão LTS recomendada) instalado.
*   [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js).
*   Um navegador compatível com Cypress (ex: Chrome, Firefox, Edge).

### Configuração do Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd automation-exercise-final
    ```

2.  **Instale as dependências:**
    O npm instalará todas as dependências listadas no arquivo `package.json`. Execute o comando abaixo na raiz do projeto:
    ```bash
    npm install
    ```

### Executando os Testes

Existem duas formas principais de executar os testes:

1.  **Modo Interativo (com interface gráfica):**
    Ideal para desenvolver e depurar os testes.
    ```bash
    npx cypress open
    ```

2.  **Modo Headless (via linha de comando):**
    Ideal para execução em pipelines de CI/CD ou para rodar a suíte completa.
    ```bash
    npx cypress run
    ```

Após a execução em modo headless, um relatório em HTML será gerado na pasta `cypress/reports`.

---

## 📂 Estrutura do Projeto

O projeto segue a estrutura de pastas padrão do Cypress, com a adição de um diretório `modules` para melhor organização:

```bash
cypress/
├── e2e/                    # Arquivos com os casos de teste (.cy.js)
├── fixtures/               # Arquivos de massa de dados estática (ex: .json)
├── modules/                # Módulos com funções reutilizáveis para interagir com as páginas
└── support/                # Arquivos de configuração e comandos customizados do Cypress
package.json                # Arquivo de configuração do projeto e dependências Node.js
```

---

## ℹ️ Outras Informações Pertinentes

*   **Massa de Dados:** O projeto utiliza duas abordagens para massa de dados:
    *   **Estática:** Para dados que não mudam, como no arquivo `cypress/fixtures/dadosParaFormulario.json`.
    *   **Dinâmica:** Para dados que precisam ser únicos a cada execução (ex: cadastro de usuário), utilizando a biblioteca `@faker-js/faker`.
*   **Módulos Reutilizáveis:** As interações com elementos das páginas foram abstraídas em funções dentro da pasta `cypress/modules`. Isso centraliza os seletores e ações, facilitando a manutenção e evitando duplicação de código nos testes (similar ao padrão Page Objects).
