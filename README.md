# Mouts IT - Desafio de Testes Automatizados

Projeto de testes automatizados utilizando [Cypress](https://www.cypress.io/) para validação da aplicação [ServeRest](https://serverest.dev/), cobrindo testes de **Frontend (E2E)** e **API**.

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+ instalado
- NPM (incluído com Node.js)

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mouts-ti-challenge

# Instale as dependências
npm install
```

## Estrutura do Projeto

```
mouts-it-challenge/
├── cypress/
│   ├── e2e/
│   │   ├── api/                    # Testes de API
│   │   │   ├── login.cy.js         # Testes do endpoint /login
│   │   │   └── usuarios.cy.js      # Testes do endpoint /usuarios
│   │   └── web/                    # Testes de Frontend (E2E)
│   │       ├── login-cadastro.cy.js # Testes de login e cadastro via UI
│   │       └── produtos.cy.js      # Testes da home/produtos
│   ├── fixtures/                   # Dados estáticos para testes
│   ├── support/
│   │   ├── pages/                  # Page Objects (Frontend)
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   └── requests/               # Request Objects (API)
│   │       ├── LoginRequest.js
│   │       └── UsersRequest.js
├── cypress.config.js               # Configuração do Cypress
├── package.json
└── .github/
    └── workflows/
        └── cypress.yml             # Pipeline CI (GitHub Actions)
```

## Executando os Testes

```bash
# Abrir o Cypress em modo interativo
npm run cy:open

# Executar todos os testes (headless)
npm run cy:run

# Executar apenas testes de API
npm run cy:api

# Executar apenas testes de Frontend (Web)
npm run cy:web
```

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| [Cypress](https://www.cypress.io/) | Framework de testes E2E e API |
| [@faker-js/faker](https://fakerjs.dev/) | Geração de dados dinâmicos para testes |
| [GitHub Actions](https://github.com/features/actions) | Pipeline de CI/CD |

## Padrões Adotados

- **Page Objects**: encapsulam interações com páginas do frontend.
- **Request Objects**: encapsulam chamadas à API, reutilizáveis entre testes de API e pré-condições de testes web.
- **Dados dinâmicos** (`faker`): evitam conflitos de e-mail duplicado entre execuções e garantem independência dos testes.
- **Seletores estáveis**: uso de `data-testid` ao invés de classes CSS ou seletores frágeis.
- **Testes independentes**: cada teste prepara seus próprios dados (via API) e não depende de estado de outros testes.
