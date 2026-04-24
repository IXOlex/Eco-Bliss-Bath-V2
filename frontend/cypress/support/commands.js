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
