describe('LTI Homepage', () => {
  it('should navigate to positions page, verify the URL, click the first "Ver proceso" button, check for hiring process columns, and verify candidates in correct phases', () => {
    cy.visit('/');
    cy.get('[data-cy="link-to-positions"]').click();
    cy.url().should('include', '/positions');
    cy.contains('button', 'Ver proceso').first().click();
    
    // Check for the presence of hiring process columns
    cy.get('.card-header').should('contain.text', 'Initial Screening');
    cy.get('.card-header').should('contain.text', 'Technical Interview');
    cy.get('.card-header').should('contain.text', 'Manager Interview');

    // Verify candidates are in the correct phase
    cy.get('.card').each(($card) => {
      const headerText = $card.find('.card-header').text();

      if (headerText.includes('Initial Screening')) {
        cy.wrap($card).find('.card-body').should('contain.text', 'Carlos García');
      } else if (headerText.includes('Technical Interview')) {
        cy.wrap($card).find('.card-body').should('contain.text', 'John Doe');
        cy.wrap($card).find('.card-body').should('contain.text', 'Jane Smith');
      }
    });

    cy.intercept('PUT', '/candidates/*').as('updateCandidate');

    // Simulate drag and drop action
    cy.get('[data-rbd-draggable-id="3"]').dragAndDrop(
      '[data-rbd-draggable-id="3"]',
      '[data-rbd-droppable-id="1"]'
    );

    // Verify Carlos García is now in the Technical Interview phase
    cy.get('.card').each(($card) => {
      const headerText = $card.find('.card-header').text();

      if (headerText.includes('Technical Interview')) {
        cy.wrap($card).find('.card-body').should('contain.text', 'Carlos García');
      }
    });

    // Wait for the PUT request to complete and verify it was called
    cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200);
  });
});