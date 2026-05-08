describe('Smoke Tests', () => {

  it('should load homepage', () => {

    cy.visit('http://localhost:4200')

    // Vérifie que la page charge correctement
    cy.contains('Connexion')

  })

  it('should display login button', () => {

    cy.visit('http://localhost:4200')

    cy.contains('Connexion')

  })

  it('should display cart button when logged in', () => {

    cy.visit('http://localhost:4200')

    cy.contains('Connexion').click()

    cy.get('input').eq(0).type('test2@test.fr')
    cy.get('input').eq(1).type('testtest')

    cy.contains('button', 'Se connecter').click()

    // Vérifie redirection après login
    cy.url().should('include', '/#/')

    // Vérifie état connecté
    cy.contains('Déconnexion')

  })

})


