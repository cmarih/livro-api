// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postLivro', (livro) => {
    cy.api({
        url: 'http://localhost:5000/api/livros',
        method: 'POST',
        body: livro,
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})

Cypress.Commands.add('getlivros', () => {
    cy.api({
        url: 'http://localhost:5000/api/livros',
        method: 'GET',
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})

Cypress.Commands.add('getlivrosId', (_id) => {
    cy.api({
        url: `http://localhost:5000/api/livros/${_id}`,
        method: 'GET',
        failOnStatusCode: false
    }).then(response => {
              
        return response
    })
})

Cypress.Commands.add('deletelivroId', (id) => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:5000/api/livros/${id}`,
      failOnStatusCode: false // Permite capturar respostas com status >= 400
    }).then((response) => {

      return response

    })
  })
