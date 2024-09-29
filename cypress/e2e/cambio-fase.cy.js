describe('LTI Homepage Navigation', () => {
  it('should navigate to the LTI homepage and verify the recruiter dashboard', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').contains('Dashboard del Reclutador')
  })
})