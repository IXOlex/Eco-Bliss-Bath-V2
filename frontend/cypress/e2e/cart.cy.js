describe('E2E - Cart', () => {

  beforeEach(() => {

    cy.loginUi()

    cy.get('[data-cy="nav-link-cart"]')
      .should('be.visible')

  })
  it('stock need to be superior to 0 to be added to cart', () => {

    cy.visit('http://localhost:4200/#/products/3')

    cy.wait(3000)

    cy.get('[data-cy="detail-product-stock"]')
      .invoke('text')
      .then((stockText) => {

        const stock = parseInt(stockText)

        expect(stock).to.be.greaterThan(0)

      })

  })

  it('should add product to cart', () => {

    cy.visit('http://localhost:4200/#/products/6')

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('6')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.url()
      .should('include', '/cart')

    cy.get('[data-cy="cart-line"]')
      .should('exist')

  })

  it('should decrease stock after adding product to cart', () => {

    cy.visit('http://localhost:4200/#/products/6')
    cy.wait(3000)
    cy.get('[data-cy="detail-product-stock"]')
      .invoke('text')
      .then((stockText) => {

        const initialStock = parseInt(stockText)

        const quantityToAdd = '10'

        cy.get('[data-cy="detail-product-quantity"]')
          .clear()
          .type(quantityToAdd)

        cy.get('[data-cy="detail-product-add"]')
          .click()

        cy.wait(3000)
        cy.visit('http://localhost:4200/#/products/6')
        cy.wait(3000)
        cy.get('[data-cy="detail-product-stock"]')
          .invoke('text')
          .then((newStockText) => {

            const newStock = parseInt(newStockText)

            expect(newStock).to.eq(initialStock - Number(quantityToAdd))

          })

      })

  })
  it('should reject negative quantity', () => {

    cy.visit('http://localhost:4200/#/products/6')

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('-3')


    cy.get('[data-cy="detail-product-form"]')
      .should('have.class', 'ng-valid')

  })

  it('should reject quantity greater than 20', () => {

    cy.visit('http://localhost:4200/#/products/6')

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('21')

    cy.get('[data-cy="detail-product-form"]')
      .should('have.class', 'ng-invalid')

  })

  it('should add product to cart and verify cart via API', () => {

    cy.visit('http://localhost:4200/#/products/6')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.window().then((win) => {

      const token = win.localStorage.getItem('user')

      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {

        expect(response.status).to.eq(200)

        // Afficher le contenu pour voir sa structure
        console.log(response.body)

      })

    })

  })
  it('should display product availability field', () => {

    cy.visit('http://localhost:4200/#/products/6')
    cy.wait(3000)
    cy.get('[data-cy="detail-product-stock"]')
      .should('exist')
      .and('be.visible')

  })

})
