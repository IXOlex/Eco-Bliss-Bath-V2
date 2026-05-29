describe('Smoke - Login page', () => {

  it('should display login fields and button', () => {

    cy.visit('http://localhost:4200/#/login')

    cy.get('[data-cy="login-input-username"]')
      .should('be.visible')

    cy.get('[data-cy="login-input-password"]')
      .should('be.visible')

    cy.get('[data-cy="login-submit"]')
      .should('be.visible')

  })
})
describe('Smoke - Product page', () => {

  beforeEach(() => {

    cy.loginUi()

  })

  it('should display add to cart button when connected', () => {

    cy.visit('http://localhost:4200/#/products/6')

    cy.get('[data-cy="detail-product-add"]')
      .should('exist')
      .and('be.visible')

  })

})
