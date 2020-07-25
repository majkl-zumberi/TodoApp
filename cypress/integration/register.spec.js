/// <reference types="cypress"/>
context('register', () => {
  beforeEach(() => {
    sessionStorage.removeItem('utente');
    cy.visit('http://localhost:4200/auth/register');
  });

  it('[sign-up] success', () => {
    cy.get('.username-input').type('carlo').should('have.value','carlo');
    cy.get('.password-input').type('123').should('have.value','123');
    cy.get('.passwordCnf-input').type('123').should('have.value','123');
    cy.server();
    const baseURL='http://localhost:3000/users';
    cy.route('POST',baseURL,{username:"carlo",password:"123",name:"",surname:""}).as('RegisterCall');
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait('@RegisterCall').then(()=>{
      cy.get('.welcome-title').should('have.text','MyTodosApp');
    });
  });
});
