describe('API - Cart', () => {

  beforeEach(() => {
    cy.loginApi()
  })

  it('should not access cart without login', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
    })
  })

  it('should get cart when logged in', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('should fail with POST (wrong method)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/orders/add',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(405)
    })
  })

  it('should add product with PUT (actual API behavior)', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        expect(productsRes.status).to.eq(200)
        expect(productsRes.body).to.be.an('array').and.not.empty

        const product = productsRes.body[0]
        const productIri = `/api/products/${product.id}`

        cy.request({
          method: 'PUT',
          url: 'http://localhost:8081/orders/add',
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
          },
          body: {
            product: productIri,
            quantity: 1,
          },
        }).then((res) => {
          expect(res.status).to.eq(200)
        })

      })
  })


})
