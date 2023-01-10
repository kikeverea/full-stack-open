import helper from './cypressHelper'

describe('Blogs', function () {
  const USER = 'kike'
  const PASSWORD = 'asd'

  beforeEach(function () {
    const newUser = {
      name: USER,
      username: USER,
      password: PASSWORD }

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

  it('New blog form collapsed by default', function () {
    cy.contains('button', 'new blog')
    cy.get('#new-blog-form>.toggable-children')
      .should('have.css', 'display')
      .and('eq', 'none')
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
    const blogTitle = 'A new blog'

    helper.addNewBlog({
      title: blogTitle,
      author: 'Me',
      url: 'www.mine.com'
    })

    helper.containsNotification(`A new blog: '${ blogTitle }', was added`, 'rgb(0, 128, 0)')

    // check new blog has been added to blog list
    cy.get('.blog').should('contain', blogTitle)

    // form is collapsed
    cy.contains('new blog')
  })

  it('Can like a blog', function () {
    const clickTimes = Math.floor(Math.random() * 10)

    helper.addNewBlog({
      title: 'A new blog',
      author: 'Me',
      url: 'www.mine.com'
    })

    // show blog full content
    cy.get('.blog').contains('button', 'view').click()

    // click 'like' n times
    for (let i = 0; i < clickTimes; i++) {
      cy.get('#blog-full').contains('button', 'like').click()
    }

    cy.get('#likes').contains(clickTimes)
  })
})