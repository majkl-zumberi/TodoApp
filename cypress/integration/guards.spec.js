context('guard check', () => {
  before(() => {
    cy.Login();
  })

  it('block login page after login', () => {
    cy.go('back')
    cy.url().should('eq', 'http://localhost:4200/home');

  });

  it('block routes if user not logged', () => {
    cy.visit('/todos');
    cy.url().should('eq','http://localhost:4200/todos');
    cy.get('.uk-border-circle').click();
    cy.get('.uk-navbar-dropdown-nav').within($ulMenu=>{
      //adesso clicco il tag a ==> logOut
      cy.wrap($ulMenu).children().last().click().then(()=>{
        const user=sessionStorage.getItem('utente');
        expect(user).to.be.null;
      });
    });
    cy.go('back');
    cy.url().should('eq','http://localhost:4200/auth/login');
  });

});
