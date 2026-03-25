import { faker } from '@faker-js/faker'
import UsersRequest from '../../support/requests/UsersRequest'

describe('API - Usuários', () => {
  it('Deve criar um novo usuário com sucesso', () => {
    const payload = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    }

    UsersRequest.createUser(payload).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id')
    })
  })

  it('Não deve permitir criar usuário com e-mail já existente', () => {
    const payload = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'false'
    }

    UsersRequest.createUser(payload).then(res1 => {
      expect(res1.status).to.eq(201)
      
      UsersRequest.createUser(payload).then(res2 => {
        expect(res2.status).to.eq(400)
        expect(res2.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })
})
