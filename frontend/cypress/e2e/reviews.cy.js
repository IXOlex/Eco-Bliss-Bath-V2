describe('API - Reviews', () => {

  beforeEach(() => {
    cy.loginApi()
  })

  it('should add a review', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/reviews',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: {
        productId: 1,
        rating: 5,
        comment: 'Excellent produit',
      },
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

})
