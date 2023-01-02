import { useState } from 'react'
import FormField from './FormField'
import FormSubmit from './FormSubmit'
import ErrorMessage from './ErrorMessage'
import errorHelper from '../util/errorMessageHelper'

const NewBlogForm = ({ createNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const onFormSubmit = (event) => {
    event.preventDefault()

    const validInput = validateInput()

    if(validInput) {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      setTitle('')
      setAuthor('')
      setUrl('')

      createNewBlog(newBlog)
    }
  }

  const validateInput = () => {
    let error = ''
    let errorCount = 0

    if(!title) {
      error = appendToError(error, 'Title')
      errorCount++
    }

    if(!author) {
      error = appendToError(error, 'Author')
      errorCount++
    }

    if(!url) {
      error = appendToError(error, 'Url')
      errorCount++
    }

    if (errorCount > 1)
      error = replaceLastComma(error)

    if(error) {
      errorHelper.displayErrorMessage(`${error} required`, setErrorMessage)
      return false
    }

    return true
  }

  const replaceLastComma = (error) => {
    const lastComma = error.lastIndexOf(',')
    return `${ error.substring(0, lastComma) } and ${ error.substring(lastComma + 1) }`
  }

  const appendToError = (error, text) => {
    return error.length === 0
    ? error = text
    : error = `${error}, ${text}`
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={ onFormSubmit }>
        <table>
          <tbody>
            <FormField name='Title' value={title} inputChange={setTitle} />
            <FormField name='Author' value={author} inputChange={setAuthor} />
            <FormField name='Url' value={url} inputChange={setUrl} />
            <FormSubmit value='Submit' />
          </tbody>
        </table>
      </form>
      <ErrorMessage errorMessage={ errorMessage } />
      <br />
    </div>
  )
}

export default NewBlogForm