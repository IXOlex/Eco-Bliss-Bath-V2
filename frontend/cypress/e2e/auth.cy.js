describe('API - Auth', () => {

  it('should login successfully', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      body: {
        username: 'test2@test.fr',
        password: 'testtest',
      },
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.token).to.be.a('string')
      expect(res.body.token).to.not.be.empty
    })
  })

  it('should fail with wrong credentials', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/login',
      failOnStatusCode: false,
      body: {
        username: 'wrong@test.fr',
        password: 'wrong',
      },
    }).then((res) => {
      expect(res.status).to.eq(401)
    })
  })

})
