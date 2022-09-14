import { useState } from 'react'
import FormField from './FormField'
import FormSubmit from './FormSubmit'

const LoginForm = ({ loginService, userLoggedIn }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      userLoggedIn(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      displayWrongCredentials()
    }
  }

  const displayWrongCredentials = () => {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <div style={{ color: 'red' }}>{ errorMessage }</div>
      <br />
    </form>
  )
}

export default LoginForm