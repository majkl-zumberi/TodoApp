context('todo page', () => {
  beforeEach(() => {
    cy.Login();
    cy.request("GET",'localhost:3000/todos')
      .its('body')
      .each(todo=>cy.request('DELETE',`localhost:3000/todos/${todo.id}`));
    cy.get('h3').first().click();
    cy.url().should('eq','http://localhost:4200/todos');
  })

  it('goes to todo page', () => {
    cy.get('section').first().children().should('have.length',0);
  });

});
