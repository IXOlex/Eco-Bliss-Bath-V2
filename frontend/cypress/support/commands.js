Cypress.Commands.add('loginApi', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8081/login',
    body: {
      username: 'test2@test.fr',
      password: 'testtest',
    },
  }).then((response) => {
    expect(response.status).to.eq(200)
    Cypress.env('token', response.body.token)
  })
})

Cypress.Commands.add('loginUi', () => {

  cy.visit('http://localhost:4200')

  cy.get('[data-cy="nav-link-login"]')
    .click()

  cy.get('[data-cy="login-input-username"]')
    .type('test2@test.fr')

  cy.get('[data-cy="login-input-password"]')
    .type('testtest')

  cy.get('[data-cy="login-submit"]')
    .click()

})
