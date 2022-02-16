describe('Ask question', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('When signed in and ask a valid question, the question should successfully save', () => {
    cy.contains('Q & A');
    cy.contains('Unanswered Questions');
    cy.contains('Sign In').click();
    cy.url().should('include', 'auth0');
    cy.get('#username')
      .click()
      .get('#username')
      .type('jimenez555@gmail.com', { force: true });

    cy.get('#password')
      .click()
      .get('#password')
      .type('EvaRosario21.', { force: true });

    cy.contains('Continue').click();
    cy.contains('Unanswered Questions');

    cy.contains('Ask a question').click();
    cy.contains('Ask a question');
    var title = 'title test';
    var content = 'Lots and lots and lots and lots and lots of content test';
    cy.get('#title').type(title).should('have.value', title);
    cy.get('#content').click().type(content).should('have.value', content);

    cy.contains('Submit your question').click();
    cy.contains('Your question was successfully submitted');

    cy.contains('Sign Out').click();
    cy.contains('You successfully signed out!');
  });
});
