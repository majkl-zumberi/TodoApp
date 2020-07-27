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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('Login',()=>{
  sessionStorage.removeItem('utente');
  cy.visit("");
  cy.url().should('eq', 'http://localhost:4200/auth/login')
    cy.contains('Ben tornato!')
    cy.get('form').within($form => {
      cy.get('.username-input').type('majjey').should('have.value', 'majjey').and('have.focus');
      cy.get('.password-input').type('123').should('have.value', '123').and('have.focus');

      cy.server();
      const baseURL = 'http://localhost:3000/';

      cy.route('GET', baseURL + 'users').as('LoginCall');
      // cy.get('.uk-button').click();
      cy.root().submit()
      //cy.get('.welcome-title').should('have.text','MyTodosApp');

    })
    cy.wait('@LoginCall').then(() => {
      //cy.get('.welcome-title').should('have.text','MyTodosApp');
      cy.contains('MyTodosApp')
      cy.url().should('eq', 'http://localhost:4200/home')
      // cy.url().should('include','home')
    });
})
