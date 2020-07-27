context('home page', () => {
  before(() => {
    cy.Login();
  });

  it('checks home page header', () => {
    cy.get('nav').should('have.class','uk-navbar-container').and('have.class','uk-navbar');
    cy.get('nav').find('div.uk-navbar-left').find('ul').children().should('have.length', 2);

    cy.get('nav>div.uk-navbar-left>ul').within($ulParent=>{
      cy.wrap($ulParent)
      .children().first()//li
      .should('have.text','Home')
      .children().first()//li>a
      .and('have.class','active')
      .and('have.attr','routerlink','/home')

      cy.wrap($ulParent)
      .children().eq(1)//li
      .should('have.text','Todos')
      .children().first()//li>a
      .and('have.attr','routerlink','/todos')
    });

    cy.get('nav>.uk-navbar-right>ul').within($ul=>{
      cy.wrap($ul).children().as('sub-menu');
      cy.get('@sub-menu');
      cy.get('@sub-menu').find('app-profile-render').as('profile-menu')
      .find('a').first()
      .find('img').first()
      .should('have.attr','src','https://via.placeholder.com/100C/1e87f0/ffffff?text=MZ')
      .and('have.attr','alt','MZ');
      cy.get('@profile-menu').click();
      cy.get('@sub-menu').children().last().as('sub-menu-items')
      cy.get('@sub-menu-items').find('ul').within($unorderedListProfile =>{
        cy.wrap($unorderedListProfile).children().should('have.length','3');
        cy.wrap($unorderedListProfile).children().first()//primo li della lista
        .find('a').first()//primo li>a della lista
        .should('have.text','visualizza todo condivisi con me')
        .and('have.attr','routerlink','/shared-with-me')
        cy.wrap($unorderedListProfile).children().eq(1)//secondo li della lista
        .find('a').first()//secondo li>a della lista
        .should('have.text','aggiorna profilo')
        .and('have.attr','routerlink','/profile')
        cy.wrap($unorderedListProfile).children().last()//ultimo li della lista
        .find('a').first()//ultimo li>a della lista
        .should('have.text','logOut')
      });
    });

  });

  it('checks h tags content', () => {
    cy.get('h1').first().should('have.text','MyTodosApp');
    cy.get('h3').first().should('have.attr','routerlink','/todos').and('have.text','I miei Todo');
    cy.get('h4').first().should('have.text','Prossimo Todo');
  });
});
