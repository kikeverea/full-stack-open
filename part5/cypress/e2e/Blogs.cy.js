import helper from './cypressHelper'

describe('Blogs', function () {
  const USER = 'kike'
  const PASSWORD = 'asd'

  beforeEach(function () {
    const newUser = {
      name: 'kike',
      username: 'kike',
      password: 'asd' }

    localStorage.removeItem('loggedInUser')

    cy.request('POST', helper.RESET_URL)
      .then(() =>
        cy.request('POST', helper.USERS_URL, newUser)
          .then(() => {
            cy.request('POST', helper.LOGIN_URL, { username: USER, password: PASSWORD })
              .then((res) => {
                localStorage.setItem('loggedInUser', JSON.stringify(res.body))
                cy.visit('http://localhost:3000')
              })
          })
      )
  })

  it('New blog form shown when clicking "new blog" button', function () {
    helper.openNewBlogForm()
    cy.contains('Create new Blog')
    cy.contains('Title')
    cy.contains('Author')
    cy.contains('Url')
    cy.contains('Submit')
  })

  it('A blog can be created', function () {
    const title = 'A new blog'

    helper.addNewBlog({
      title: blogTitle,
      author: 'Me',
      url: 'www.mine.com'
    })

    helper.containsNotification(`A new blog: '${ blogTitle }', was added`, 'rgb(0, 128, 0)')

    // check new blog has been added to blog list
    cy.get('.blog').should('contain', title)

    // form collapsed
    cy.contains('new blog')
  })
})