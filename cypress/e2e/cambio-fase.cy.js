describe('LTI Homepage Navigation', () => {
  it('should navigate to the LTI homepage and verify the recruiter dashboard', () => {
    cy.visit('/') // Usa la URL base definida en la configuración
    cy.get('h1').contains('Dashboard del Reclutador')
  })

  it('should navigate to the Positions page, click on the first "Ver proceso" button, verify the URL, and check the interview stages', () => {
    cy.visit('/') // Usa la URL base definida en la configuración
    cy.get('[data-cy="link-to-positions"]').click()
    cy.url().should('include', '/positions')
    cy.get('[data-cy="view-process-button"]').first().click()
    cy.url().should('include', '/positions/')
    cy.get('.card-header').contains('Initial Screening')
    cy.get('.card-header').contains('Technical Interview')
    cy.get('.card-header').contains('Manager Interview')

    // Verificar que los candidatos están en la fase correcta
    cy.get('.card-header:contains("Initial Screening")').parent().within(() => {
      cy.get('.card-body').contains('Carlos García')
    })
    cy.get('.card-header:contains("Technical Interview")').parent().within(() => {
      cy.get('.card-body').contains('John Doe')
      cy.get('.card-body').contains('Jane Smith')
    })
  })
})