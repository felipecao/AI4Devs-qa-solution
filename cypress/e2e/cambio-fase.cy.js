describe('LTI Homepage Navigation', () => {
  it('should navigate to the LTI homepage and verify the recruiter dashboard', () => {
    cy.visit('/') // Usa la URL base definida en la configuración
    cy.get('h1').contains('Dashboard del Reclutador')
  })

  it('should navigate to the Positions page, click on the first "Ver proceso" button, and verify the URL', () => {
    cy.visit('/') // Usa la URL base definida en la configuración
    cy.get('[data-cy="link-to-positions"]').click()
    cy.url().should('include', '/positions')
    cy.get('[data-cy="view-process-button"]').first().click()
    cy.url().should('include', '/positions/')
  })
})