export default new class RegisterPage {
  visit() {
    cy.visit('login');
    cy.get('[data-testid="cadastrar"]').click();
  }

  fillForm(nome, email, password, isAdministrador = false) {
    cy.get('[data-testid="nome"]').clear().type(nome);
    cy.get('[data-testid="email"]').clear().type(email);
    cy.get('[data-testid="password"]').clear().type(password);
    
    if (isAdministrador) {
      cy.get('[data-testid="checkbox"]').check();
    }
  }

  submit() {
    cy.get('[data-testid="cadastrar"]').click();
  }

  verifyRegisterSuccess() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Cadastro realizado com sucesso');
  }
  
  verifyEmailInUseError() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Este email já está sendo usado');
  }
}
