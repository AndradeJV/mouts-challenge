export default new class LoginPage {
  visit() {
    cy.visit('login');
  }

  fillForm(email, password) {
    cy.get('[data-testid="email"]').clear().type(email);
    cy.get('[data-testid="senha"]').clear().type(password);
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
  }

  verifyLoginError() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Email e/ou senha inválidos');
  }
}
