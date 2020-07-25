/// <reference types="cypress"/>
context('login', () => {
  beforeEach(() => {
    sessionStorage.removeItem('utente');
    cy.visit('http://localhost:4200/');
  })

  it('submit login',()=>{
    cy.get('.username-input').type('majjey').should('have.value','majjey');
    cy.get('.password-input').type('123').should('have.value','123');
    cy.server();
    const baseURL='http://localhost:3000/';
    cy.route('GET',baseURL+'users').as('LoginCall');
    cy.get('.uk-button').click();
    //cy.get('.welcome-title').should('have.text','MyTodosApp');
    cy.wait('@LoginCall').then(()=>{
      cy.get('.welcome-title').should('have.text','MyTodosApp');
    });
  });
  it('submit error login', () => {
    cy.get('.username-input').type('non esiste').should('have.value','non esiste');
    cy.get('.password-input').type('1234').should('have.value','1234');
    cy.server();
    const baseURL='http://localhost:3000/';
    cy.route('GET',baseURL+'users').as('LoginCall');
    cy.get('.uk-button').click();
    //cy.get('.welcome-title').should('have.text','MyTodosApp');
    cy.wait('@LoginCall').then(()=>{
      cy.get('#loginError').should('have.text','username e/o password non corretta');
    });
  });

})
