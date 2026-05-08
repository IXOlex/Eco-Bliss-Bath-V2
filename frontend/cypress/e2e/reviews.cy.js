describe('API - Reviews', () => {

  beforeEach(() => {
    cy.loginApi()
  })

  it('should fail to add review due to backend validation issue', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/reviews',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: {
        productId: 1,
        rating: 5,
        comment: 'Excellent produit',
      },
    }).then((res) => {

      expect(res.status).to.eq(400)

      expect(res.body).to.have.property('error')

    })

  })

})
