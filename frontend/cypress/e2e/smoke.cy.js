describe('Smoke Tests', () => {

  it('should load homepage and display login button', () => {

    cy.visit('http://localhost:4200')

    cy.get('[data-cy="nav-link-login"]')
      .should('be.visible')

  })

  it('should display cart button when logged in', () => {

    cy.loginUi()

    cy.url()
      .should('include', '/#/')

    cy.get('[data-cy="nav-link-logout"]')
      .should('be.visible')

    cy.get('[data-cy="nav-link-cart"]')
      .should('be.visible')

  })

})
