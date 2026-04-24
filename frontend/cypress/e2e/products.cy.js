describe('API - Products', () => {

  it('should get all products', () => {
    cy.request('GET', 'http://localhost:8081/products')
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.be.an('array')
      })
  })

  it('should get a product by id', () => {
    cy.request('GET', 'http://localhost:8081/products/1')
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('id')
      })
  })

})
