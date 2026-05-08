describe('Security - XSS', () => {

  beforeEach(() => {
    cy.loginApi()
  })

  it('should prevent XSS injection in review comments', () => {

    const xssPayload = '<script>alert("XSS")</script>'

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        expect(productsRes.status).to.eq(200)
        expect(productsRes.body.length).to.be.greaterThan(0)

        const product = productsRes.body[0]

        cy.request({
          method: 'POST',
          url: 'http://localhost:8081/reviews',
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
          },
          body: {
            title: 'Security Test',
            comment: xssPayload,
            rating: 5,
            product: `/api/products/${product.id}`,
          },
        }).then((res) => {

          // Accept either success or validation rejection
          expect([200, 201, 400]).to.include(res.status)

          // If stored, ensure payload is not executable
          if (res.body.comment) {
            expect(res.body.comment).to.not.include('<script>')
          }

        })

      })
  })

})
