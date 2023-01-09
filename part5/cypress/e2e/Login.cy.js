beforeEach(function () {
  cy.request('POST', 'http://localhost:3000/api/testing/reset')
    .then(() =>
      cy.request('POST', 'http://localhost:3000/api/users', {
        name: 'kike',
        username: 'kike',
        password: 'asd' }))

  cy.visit('http://localhost:3000')
})

describe('Login test', function () {

  it('Login form shown by default', function () {
    cy.contains('User')
    cy.contains('Password')
    cy.contains('login')
  })

  it('succeed with correct credentials', function () {
    submitLogin('kike', 'asd', 200)

    cy.get('#notification')
      .should('contain', 'Logged in')
      .and('have.css', 'color')
      .and('eq', 'rgb(0, 128, 0)')

    cy.contains('kike')
  })

  it('fails with wrong credentials', function () {
    submitLogin('incorrect_user', 'incorrect_password', 401)

    cy.get('#notification')
      .should('contain', 'Login failed. Wrong credentials')
      .and('have.css', 'color')
      .and('eq', 'rgb(255, 0, 0)')

    //screen unchanged
    cy.contains('User')
    cy.contains('Password')
  })

  const submitLogin = (username, password, expectedStatus) => {
    cy.get('#User').type(username)
    cy.get('#Password').type(password)

    cy.intercept('POST', 'http://localhost:3000/api/login').as('loginRequest')
    cy.get('#submitButton').click()
    cy.wait('@loginRequest').its('response.statusCode').should('eq', expectedStatus)
  }
})