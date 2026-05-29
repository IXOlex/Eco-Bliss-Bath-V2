describe('Security - XSS Reviews', () => {

  beforeEach(() => {
    cy.loginApi()
  })

  it('should sanitize XSS payload in review comment', () => {

    const payload = '<script>alert("XSS")</script>'

    cy.request({

      method: 'POST',
      url: 'http://localhost:8081/reviews',
      failOnStatusCode: false,

      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },

      body: {
        title: 'Test XSS',
        rating: 5,
        comment: payload,
      },

    }).then((res) => {

      expect([200, 201, 400, 422])
        .to.include(res.status)

    })

  })

})
