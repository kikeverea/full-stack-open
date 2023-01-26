import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showFailNotification } from '../../reducers/notificationReducer'
import FormField from '../FormField'
import { FlexColumn, FlexRow } from '../styled'

const EditUserForm = ({ user, onFormSubmit, onCancel }) => {

  const [name, setName] = useState(user.name)

  const dispatch = useDispatch()

  const editUser = (event) => {
    event.preventDefault()

    const validInput = validateInput()

    if(validInput) {
      const newUser = { ...user, name }
      setName('')

      onFormSubmit(newUser)
    }
  }

  const validateInput = () => {
    const error = {
      message: '',
      count: 0
    }

    if(!name)
      addToError(error, 'Name')

    if(error.count > 1) {
      error.message = replaceLastComma(error.message)
      dispatch(showFailNotification(`${ error.message } required`))
      return false
    }

    return true
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
      <h2>Edit User</h2>
      <form onSubmit={ editUser }>
        <FlexColumn style={{ width: 250 }}>
          <FormField name='Name' value={ name } inputChange={ setName } />
          <FlexRow>
            <input type='submit' value='Submit' />
            <button id='edit-user-submit' onClick={ onCancel }>Cancel</button>
          </FlexRow>
        </FlexColumn>
      </form>
      <br />
    </div>
  )
}

export default EditUserForm