export default new class HomePage {
  verifyUserIsLoggedIn() {
    cy.url().should('include', '/home');
    cy.get('[data-testid="logout"]').should('be.visible');
  }
}