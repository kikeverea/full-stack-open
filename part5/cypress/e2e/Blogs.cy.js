describe('Blog app', function () {

  beforeEach(function () {
    cy.request('post', 'http://localhost:3000/api/testing/reset', { username: 'kike', password: 'asd' })
      .then(response => {
        localStorage.setItem('testBlogsUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
  })

  it('Login form shown by default', function () {
    cy.contains('User')
    cy.contains('Password')
    cy.contains('login')
  })
})