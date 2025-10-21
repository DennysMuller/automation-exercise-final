const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Testes - Automation Exercise',
    embeddedScreenshots: true,
    inlineAssets: true, // Gera um único arquivo HTML com tudo embutido
    saveAllAttempts: false,
  },  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    // Garante que a gravação de vídeo esteja habilitada
    video: true, 
  },
});
