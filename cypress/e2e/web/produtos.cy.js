import LoginPage from "../../support/pages/LoginPage"
import HomePage from "../../support/pages/HomePage"
import UsersRequest from "../../support/requests/UsersRequest"
import { faker } from '@faker-js/faker'

describe('Funcionalidades da Homepage / Produtos', () => {
  let email
  let password

  beforeEach(() => {
    email = faker.internet.email()
    password = faker.internet.password()

    UsersRequest.createUser({
      nome: faker.person.fullName(),
      email: email,
      password: password,
      administrador: 'true'
    }).then(response => {
      expect(response.status).to.eq(201)
    })

    LoginPage.visit()
    LoginPage.fillForm(email, password)
    LoginPage.submit()
  })

  it('Deve redirecionar para a home após login com sucesso', () => {
    HomePage.verifyUserIsLoggedIn()
  })

  it('Deve exibir o botão de Cadastrar Produtos para administrador', () => {
    cy.get('[data-testid="cadastrarProdutos"]')
      .should('be.visible')
      .and('contain.text', 'Cadastrar')
  })

  it('Deve exibir a mensagem de boas-vindas ao usuário logado', () => {
    cy.get('[data-testid="home"]')
      .should('be.visible')
  })
})
