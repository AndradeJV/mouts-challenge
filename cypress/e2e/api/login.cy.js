import { faker } from '@faker-js/faker'
import UsersRequest from '../../support/requests/UsersRequest'
import LoginRequest from '../../support/requests/LoginRequest'

describe('API - Login', () => {
  it('Deve realizar login com sucesso', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    UsersRequest.createUser({
      nome: faker.person.fullName(),
      email: email,
      password: password,
      administrador: 'true'
    }).then(() => {
      LoginRequest.login(email, password).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Login realizado com sucesso')
        expect(response.body).to.have.property('authorization')
      })
    })
  })

  it('Deve bloquear login com senha inválida', () => {
    const email = faker.internet.email()
    const correctPassword = faker.internet.password()
    const wrongPassword = 'invalidpassword123'

    UsersRequest.createUser({
      nome: faker.person.fullName(),
      email: email,
      password: correctPassword,
      administrador: 'true'
    }).then(() => {
      LoginRequest.login(email, wrongPassword).then(response => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Email e/ou senha inválidos')
      })
    })
  })
})
