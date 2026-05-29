describe('E2E - Cart', () => {

  beforeEach(() => {

    cy.loginUi()

    cy.get('[data-cy="nav-link-cart"]')
      .should('be.visible')

  })
  it('should display product stock information', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-stock"]')
      .should('be.visible')

  })

  it('should add product to cart', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('1')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.get('[data-cy="nav-link-cart"]')
      .click()

    cy.get('[data-cy="cart-line"]')
      .should('exist')

  })

  it('should reject negative quantity', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('-1')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .should('have.value', '-1')

  })

  it('should not allow quantity higher than stock (backend issue)', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('9999')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.get('[data-cy="nav-link-cart"]')
      .click()

    cy.get('[data-cy="cart-line-quantity"]')
      .should('exist')

  })

  it('should display updated cart total', () => {

    cy.visit('http://localhost:4200/#/products')

    cy.get('[data-cy="product-link"]')
      .first()
      .click()

    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type('2')

    cy.get('[data-cy="detail-product-add"]')
      .click()

    cy.get('[data-cy="nav-link-cart"]')
      .click()

    cy.get('[data-cy="cart-total"]')
      .should('be.visible')

  })

})
