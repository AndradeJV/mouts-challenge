class UsersRequest {
  constructor() {
    this.apiUrl = Cypress.env('apiUrl');
  }

  createUser(payload) {
    return cy.request({
      method: 'POST',
      url: `${this.apiUrl}/usuarios`,
      failOnStatusCode: false,
      body: payload
    });
  }

  getUserById(id) {
    return cy.request({
      method: 'GET',
      url: `${this.apiUrl}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }
}

export default new UsersRequest();
