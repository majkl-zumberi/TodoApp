context('register', () => {
  beforeEach(() => {
    sessionStorage.removeItem('utente');
    cy.visit('http://localhost:4200/auth/register');
  });
  it('check form content', () => {
    cy.get('h3')
    .should('have.text','Benvenuto')
    .and('have.class','uk-card-title')
    .and('have.class','uk-text-center')
    .and('be.visible');

    cy.get('form').within($form=>{
      cy.wrap($form).should('be.visible');
      cy.wrap($form).children().should('have.length', 4);
      cy.wrap($form).find('button').last()
      .should('be.disabled')
      .and('have.text','Registrati')
      .and('have.class','uk-button');

      cy.wrap($form).find('.uk-text-small').last().should('have.text','già registrato? effettua il login')
      cy.wrap($form).find('.uk-text-small').find('a').last().should('have.attr','routerlink','/auth/login')
    });
  });
  it('sign-up success', () => {
    cy.url().should('eq','http://localhost:4200/auth/register');
    cy.get('.username-input').type('mario').should('have.value','mario').and('have.focus');
    cy.get('.password-input').type('123').should('have.value','123').and('have.focus');
    cy.get('.passwordCnf-input').type('123').should('have.value','123').and('have.focus');
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
