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

  it('New blog form shown when clicking "new blog" button', function () {
    cy.get('.toggable>div>button').click()
    cy.contains('Create new Blog')
    cy.contains('Title')
    cy.contains('Author')
    cy.contains('Url')
    cy.contains('Submit')
  })

  it('A blog can be created', function () {
    const title = 'A new blog'

    // open form
    cy.get('.toggable>div>button').click()

    // write to form
    cy.get('#Title').type(title)
    cy.get('#Author').type('Me')
    cy.get('#Url').type('www.mine.com')

    // submit form
    cy.intercept('POST', `${ apiUrl }/blogs`).as('newBlogRequest')
    cy.get('#new-blog-submit').click()
    cy.wait('@newBlogRequest').its('response.statusCode').should('eq', 201)

    // check for notification
    cy.get('#notification')
      .should('contain', `A new blog: '${ title }', was added`)
      .and('have.css', 'color')
      .and('eq', 'rgb(0, 128, 0)')

    // check new blog has been added to blog list
    cy.get('.blog').should('contain', title)

    // form collapsed
    cy.contains('new blog')
  })
})