describe('API - GET WITHOUT LOGIN', () => {
  it('should return 401 when accessing orders without authentication', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(401)

    })

  })
})

describe('API - GET WITH LOGIN', () => {
  beforeEach(() => {
    cy.loginApi()
  })

  it('should return cart products list', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      }
    }).then((response) => {

      expect(response.status).to.eq(200)

    })

  })

  it('should return a specific product details', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/products/3'
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(3)

    })

  })
})

describe('API - POST', () => {
  it('should return 401 for unknown user', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      failOnStatusCode: false,
      body: {
        username: 'unknown@test.fr',
        password: 'wrongpassword'
      }
    }).then((response) => {

      expect(response.status).to.eq(401)

    })

  })

  it('should return 200 for valid user', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.token).to.be.a('string')
      expect(response.body.token).to.not.be.empty

    })

  })

  it('should add available product to cart(wrong method used, need use PUT)', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/orders/add',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      },
      body: {
        product: 3,
        quantity: 1
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.orderLines).to.have.length.greaterThan(0)

    })

  })

  it.only('should reject out of stock product(wrong method used, need use PUT)', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/orders/add',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      },
      failOnStatusCode: false,
      body: {
        product: 3,
        quantity: 1
      }
    }).then((response) => {

      expect(response.status).to.eq(200)

    })

  })

  beforeEach(() => {
    cy.loginApi()
  })

  it('should add a review', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/reviews',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      },
      body: {
        title: 'Test Cypress',
        comment: 'Avis créé automatiquement',
        rating: 5
      }
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.title).to.eq('Test Cypress')
      expect(response.body.rating).to.eq(5)

    })

  })
})
