describe('Blogs', function () {
  const apiUrl = 'http://localhost:3000/api'

  beforeEach(function () {
    const RESET = `${ apiUrl }/testing/reset`
    const USERS = `${ apiUrl }/users`
    const LOGIN = `${ apiUrl }/login`
    const newUser = {
      name: 'kike',
      username: 'kike',
      password: 'asd' }

    localStorage.removeItem('loggedInUser')

    cy.request('POST', RESET)
      .then(() =>
        cy.request('POST', USERS, newUser)
          .then(() => {
            cy.request('POST', LOGIN, { username: 'kike', password: 'asd' })
              .then((res) => {
                localStorage.setItem('loggedInUser', JSON.stringify(res.body))
                cy.visit('http://localhost:3000')
              })
          })
      )
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
})