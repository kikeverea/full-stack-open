import { useState } from 'react'
import FormField from './FormField'
import ErrorMessage from './ErrorMessage'
import errorHelper from '../util/errorMessageHelper'
import FormButtons from "./FormButtons";

const NewBlogForm = ({ onFormSubmit, onCancel }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const submitBlog = (event) => {
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

      onFormSubmit(newBlog)
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
      ? text
      : `${error}, ${text}`
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={ submitBlog } style={ formStyle }>
        <FormField name='Title' value={title} inputChange={setTitle} />
        <FormField name='Author' value={author} inputChange={setAuthor} />
        <FormField name='Url' value={url} inputChange={setUrl} />
        <FormButtons>
          <input type="submit" value='Submit' />
          <button onClick={ onCancel }>Cancel</button>
        </FormButtons>
      </form>
      <ErrorMessage errorMessage={ errorMessage } />
      <br />
    </div>
  )
}

export default NewBlogForm