import { useState } from 'react'
import FormField from './FormField'
import FormSubmit from './FormSubmit'
import ErrorMessage from './ErrorMessage'
import errorHelper from '../util/errorMessageHelper'

const LoginForm = ({ loginService, userLoggedIn }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      await userLoggedIn(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      await userLoggedIn(null)
    }
  }

  return (
    <form onSubmit={ handleLogin }>
      <table>
        <tbody>
          <FormField name='User' value={username} inputChange={setUsername} />
          <FormField name='Password' value={password} inputChange={setPassword} />
          <FormSubmit value='Login' />
        </tbody>
      </table>
      <br />
    </form>
  )
}

export default LoginForm