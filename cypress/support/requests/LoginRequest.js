class LoginRequest {
  constructor() {
    this.apiUrl = Cypress.env('apiUrl');
  }

  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.apiUrl}/login`,
      failOnStatusCode: false,
      body: {
        email,
        password
      }
    });
  }
}

export default new LoginRequest();
