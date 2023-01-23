import { useState } from 'react'
import FormField from '../FormField'
import Flex from '../Flex'
import { showFailNotification } from '../../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { FlexRow } from '../styled'

const NewBlogForm = ({ onFormSubmit, onCancel }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

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
    const error = {
      message: '',
      count: 0
    }

    if(!title)
      addToError(error, 'Title')

    if(!author)
      addToError(error, 'Author')

    if(!url)
      addToError(error, 'Url')

    if(error.count > 1) {
      error.message = replaceLastComma(error.message)
      displayErrorMessage(`${ error.message } required`)
      return false
    }

    return true
  }

  const displayErrorMessage = (error) => {
    dispatch(showFailNotification(error))
  }

  const addToError = (error, message) => {
    error.message = error.count > 0 ? `${ error.message }, ${ message }` : message
    error.count++
  }

  const replaceLastComma = (error) => {
    const lastComma = error.lastIndexOf(',')
    return `${ error.substring(0, lastComma) } and ${ error.substring(lastComma + 1) }`
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={ submitBlog }>
        <Flex direction={ 'column' }
          customStyle={{
            gap: 8,
            width: 250
          }}
        >
          <FormField name='Title' value={ title } inputChange={ setTitle } />
          <FormField name='Author' value={ author } inputChange={ setAuthor } />
          <FormField name='Url' value={ url } inputChange={ setUrl } />
          <FlexRow>
            <input type='submit' value='Submit' />
            <button id='new-blog-submit' onClick={ onCancel }>Cancel</button>
          </FlexRow>
        </Flex>
      </form>
      <br />
    </div>
  )
}

export default NewBlogForm