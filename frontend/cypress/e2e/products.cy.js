describe('API - Products', () => {

  it('should get all products', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((res) => {

        expect(res.status).to.eq(200)
        expect(res.body).to.be.an('array')

      })
  })

  it('should get a product by id', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        expect(productsRes.status).to.eq(200)
        expect(productsRes.body.length).to.be.greaterThan(0)

        const product = productsRes.body[0]

        cy.request('GET', `http://localhost:8081/products/${product.id}`)
          .then((res) => {

            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('id')
            expect(res.body.id).to.eq(product.id)

          })

      })
  })

})
