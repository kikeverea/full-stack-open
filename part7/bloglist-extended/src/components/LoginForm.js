import { useState } from 'react'
import FormField from './FormField'
import Flex from './Flex'
import { logInUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInUser(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={ handleLogin }>
      <Flex customStyle={{
        flexDirection: 'column',
        gap: 10,
        maxWidth: 260,
        alignContent: 'flex-start'
      }}>
        <FormField name='User' value={ username } inputChange={ setUsername } />
        <FormField name='Password' value={ password } inputChange={ setPassword } />
        <input id='submitButton' type='submit' value='login'/>
      </Flex>
    </form>
  )
}

export default LoginForm