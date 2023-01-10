const apiUrl = 'http://localhost:3000/api'
const RESET_URL = `${ apiUrl }/testing/reset`
const USERS_URL = `${ apiUrl }/users`
const LOGIN_URL = `${ apiUrl }/login`
const BLOGS_URL = `${ apiUrl }/blogs`

const addNewBlog = (newBlog) => {
  openNewBlogForm()

  // write to form
  cy.get('#Title').type(newBlog.title)
  cy.get('#Author').type(newBlog.author)
  cy.get('#Url').type(newBlog.url)

  submitForm(BLOGS_URL, '#new-blog-submit', 201)
}

const containsNotification = (text, color) => {
  cy.get('#notification')
    .should('contain', text)
    .and('have.css', 'color')
    .and('eq', color)
}

const submitForm = (url, submitButtonSelector, expectedStatus) => {
  cy.intercept('POST', url).as('request')
  cy.get(submitButtonSelector).click()
  cy.wait('@request').its('response.statusCode').should('eq', expectedStatus)
}

const openNewBlogForm = () =>
  cy.get('.toggable>.toggler-element>.toggle-button').click()

export default { RESET_URL, USERS_URL, LOGIN_URL, addNewBlog, containsNotification, submitForm, openNewBlogForm }