describe('XSS Test (UI login)', () => {

  beforeEach(() => {
    cy.visit('/#/login')

    cy.get('[data-cy="login-input-username"]')
      .type('test2@test.fr')
    cy.wait(1000)
    cy.get('[data-cy="login-input-password"]')
      .type('testtest')
    cy.wait(1000)
    cy.get('[data-cy="login-submit"]')
      .click()
    cy.wait(1000)
    cy.visit('/#/reviews')

  })

  it('should not execute XSS payload', () => {

    const alertStub = cy.stub()

    cy.on('window:alert', alertStub)

    cy.get('[data-cy="review-input-rating-images"] img')
      .eq(4)
      .click()

    cy.get('[data-cy="review-input-title"]')
      .type('Test FINAL')

    cy.get('[data-cy="review-input-comment"]')
      .type('<img src="/xxx" onerror="window.location.href=\'https://www.google.com/\'">')
    //.type('<img src="/xxx" onerror="alert(\'XSS\')">')
    //.type('<img src=x onerror=alert("XSS")>')
    //.type('<script>alert("XSS")</script>')
    //.type('<svg onload=alert("XSS")>')

    cy.get('[data-cy="review-submit"]')
      .click()

    cy.request('http://localhost:8081/reviews')
      .its('body')
      .then(body => {

        const xssReview = body.find(
          review => review.title === 'Test FINAL'
        )

        expect(xssReview).to.not.be.undefined
        expect(xssReview.title).to.eq('Test FINAL')

      })

    cy.then(() => {

      if (alertStub.called) {
        throw new Error(
          'VULNERABILITE XSS DETECTEE : le payload a été exécuté'
        )
      }

    })

  })

})
