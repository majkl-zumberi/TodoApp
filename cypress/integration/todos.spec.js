context('todo page', () => {
  beforeEach(() => {

    cy.request("GET",'localhost:3000/todos')
      .its('body')
      .each(todo=>cy.request('DELETE',`localhost:3000/todos/${todo.id}`).as('deleteAll'));
    cy.Login();
    cy.get('h3').first().click();
    cy.url().should('eq','http://localhost:4200/todos');

  })

  it('check section of todos length', () => {
    cy.get('section').first().children().should('have.length',0);
  });

  it('add a new todo',()=>{
    cy.get('a.uk-accordion-title').click();
    cy.get('input#ej2-datepicker_0_input').type('8/6/2020').should('have.value','8/6/2020');
    cy.get('input#input').type('test da cypress').should('have.value','test da cypress');
    cy.get('div.flexyos').children().last().click()
    cy.get('section').first().children().should('have.length',1);
    cy.get('.uk-accordion-title > .uk-button').click();
    cy.url().should('eq','http://localhost:4200/todos/edit/1');
    cy.get('app-input-text[formControlName="description"]').within($descrizione=>{
    cy.wrap($descrizione).get('input').type('descrizione test').should('have.value','descrizione test');
    });

  })

});
