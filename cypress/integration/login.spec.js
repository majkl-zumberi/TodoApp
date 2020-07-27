context('login', () => {
  beforeEach(() => {
    sessionStorage.removeItem('utente');
    cy.visit("");
  })
  it('checks form content', () => {
    cy.get('form').within($form => {
      cy.wrap($form).should('be.visible')
      cy.wrap($form).children().should('have.length', 4)
      cy.wrap($form).find('button').last().should('be.disabled').and('have.text','Login').and('have.class','uk-button');
      cy.wrap($form).find('input[type="text"]').first().type('majjey').should('have.value', 'majjey').and('have.focus');
      cy.wrap($form).find('input[type="password"]').first().type('123').should('have.value', '123').and('have.focus');
      cy.wrap($form).find('.uk-text-small').last().should('have.text','Non sei registrato? Crea un account')
      cy.wrap($form).find('.uk-text-small').find('a').last().should('have.attr','routerlink','/auth/register')
    })
  });
  it('submit login', () => {
    cy.Login();
  });
  it('submit error login', () => {
    cy.url().should('eq', 'http://localhost:4200/auth/login')
    cy.get('form').find('input[type="text"]').first().type('non esiste').should('have.value', 'non esiste');
    cy.get('form').find('input[type="password"]').first().type('1234').should('have.value', '1234');
    cy.server();
    const baseURL = 'http://localhost:3000/';
    cy.route('GET', baseURL + 'users').as('LoginCall');
    cy.get('.uk-button').click();
    //cy.get('.welcome-title').should('have.text','MyTodosApp');
    cy.wait('@LoginCall').then(() => {
      cy.get('#loginError').should('have.text', 'username e/o password non corretta');
    });
  });

})
