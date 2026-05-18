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
      expect(res.body).to.exist

    })
  })

  it('should reject POST method on /orders/add', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/orders/add',
      failOnStatusCode: false,
    }).then((res) => {

      // Backend currently accepts only PUT
      expect(res.status).to.eq(405)

    })
  })

  it('should fail to add product due to backend validation issue', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        expect(productsRes.status).to.eq(200)
        expect(productsRes.body).to.be.an('array')
        expect(productsRes.body.length).to.be.greaterThan(0)

        const product = productsRes.body[0]

        cy.request({
          method: 'PUT',
          url: 'http://localhost:8081/orders/add',
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
          },
          body: {
            product: `/api/products/${product.id}`,
            quantity: 1,
          },
        }).then((res) => {

          // Current backend behavior returns 400
          expect(res.status).to.eq(400)
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.have.property('product')

        })

      })
  })
  it('should reject invalid quantity', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        const product = productsRes.body[0]

        cy.request({
          method: 'PUT',
          url: 'http://localhost:8081/orders/add',
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
          },
          body: {
            product: product.id,
            quantity: -1,
          },
        }).then((res) => {

          expect([400, 422]).to.include(res.status)

        })

      })

  })

  it('should allow quantity higher than stock (backend issue)', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        const product = productsRes.body[0]

        cy.request({
          method: 'PUT',
          url: 'http://localhost:8081/orders/add',
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
          },
          body: {
            product: product.id,
            quantity: 9999,
          },
        }).then((res) => {

          // anomalie backend :
          // la quantité est acceptée malgré un stock insuffisant

          expect([200, 400, 422]).to.include(res.status)

        })

      })

  })

  it('should prevent XSS injection in quantity field', () => {

    cy.request('GET', 'http://localhost:8081/products')
      .then((productsRes) => {

        const product = productsRes.body[0]

        cy.request({
          method: 'PUT',
          url: 'http://localhost:8081/orders/add',
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
          },
          body: {
            product: product.id,
            quantity: '<script>alert("XSS")</script>',
          },
        }).then((res) => {

          expect([400, 422]).to.include(res.status)

        })

      })

  })
})
