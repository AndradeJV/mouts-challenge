import { faker } from '@faker-js/faker'
import LoginPage from "../../support/pages/LoginPage"
import RegisterPage from "../../support/pages/RegisterPage"
import HomePage from "../../support/pages/HomePage"
import UsersRequest from "../../support/requests/UsersRequest"

describe('Login e Cadastro de usuários', () => {
  context('Login', () => {
    it('Deve logar quando inserido credenciais corretas', () => {
      const email = faker.internet.email()
      const password = faker.internet.password()

      UsersRequest.createUser({
        nome: faker.person.fullName(),
        email: email,
        password: password,
        administrador: 'false'
      }).then(response => {
        expect(response.status).to.eq(201)
      })

      LoginPage.visit()
      LoginPage.fillForm(email, password)
      LoginPage.submit()

      HomePage.verifyUserIsLoggedIn()
    })

    it('Deve bloquear login quando credenciais enviadas estiverem incorretas', () => {
      LoginPage.visit()
      LoginPage.fillForm(faker.internet.email(), faker.internet.password())
      LoginPage.submit()

      LoginPage.verifyLoginError()
    })
  })

  context('Cadastro', () => {
    it('Deve cadastrar um novo usuário', () => {
      const email = faker.internet.email()

      RegisterPage.visit()
      RegisterPage.fillForm(faker.person.fullName(), email, faker.internet.password(), false)
      RegisterPage.submit()

      RegisterPage.verifyRegisterSuccess()
    })

    it('Deve cadastrar um novo usuário administrador', () => {
      const email = faker.internet.email()

      RegisterPage.visit()
      RegisterPage.fillForm(faker.person.fullName(), email, faker.internet.password(), true)
      RegisterPage.submit()

      RegisterPage.verifyRegisterSuccess()
    })

    it('Não deve permitir cadastro com email já em uso', () => {
      const email = faker.internet.email()
      const password = faker.internet.password()

      UsersRequest.createUser({
        nome: faker.person.fullName(),
        email: email,
        password: password,
        administrador: 'false'
      }).then(response => {
        expect(response.status).to.eq(201)
      })

      RegisterPage.visit()
      RegisterPage.fillForm('Usuário Duplicado', email, password, false)
      RegisterPage.submit()

      RegisterPage.verifyEmailInUseError()
    })
  })
})