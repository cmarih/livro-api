const { defineConfig } = require("cypress");

const { configurePlugin } = require ('cypress-mongodb');

module.exports = defineConfig({
  env: {
    mongodb: {
        uri: 'mongodb+srv://cmarih:teste123@livroapi.fn25b.mongodb.net/?retryWrites=true&w=majority&appName=LivroApi',
        database: 'test',
        collection: 'livros'
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports', // Diretório para salvar os relatórios
    overwrite: true,             // Não sobrescreve relatórios existentes
    html: true,                   // Gera relatórios em HTML
    json: true,                   // Gera relatórios em JSON
    reportFilename: 'Resultado teste'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
    baseUrl: 'http://localhost:5000/api/livros',
    screenshotOnRunFailure: true
  },
});
