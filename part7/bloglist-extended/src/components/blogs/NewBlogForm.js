import { useState } from 'react'
import FormField from '../FormField'
import { showFailNotification } from '../../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { FlexRow } from '../styled'
import { Button, Form } from 'react-bootstrap'

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

  const cancel = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    onCancel()
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
      <Form onSubmit={ submitBlog } className='py-4'>
        <FormField name='Title' value={ title } inputChange={ setTitle } />
        <FormField name='Author' value={ author } inputChange={ setAuthor } />
        <FormField name='Url' value={ url } inputChange={ setUrl } />
        <FlexRow>
          <Button variant='primary' type='submit'>Create</Button>
          <Button variant='secondary' onClick={ cancel }>Cancel</Button>
        </FlexRow>
      </Form>
    </div>
  )
}

export default NewBlogForm