import { useEffect, useState } from 'react'
import FormField from '../FormField'
import Flex from '../Flex'
import { consumeLoginResult, logInUser } from '../../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showFailNotification, showSuccessNotification } from '../../reducers/notificationReducer'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const user = useSelector(state => state.loggedInUser)
  const loginResult = useSelector(state => state.login)

  useEffect(() => {
    if (loginResult === null)
      return

    if (loginResult === 'success') {
      dispatch(showSuccessNotification('Logged in'))
      navigate('/')
    }
    else
      showFailNotification('Log in failed. Wrong credentials')

    dispatch(consumeLoginResult())

  }, [loginResult])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInUser(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    user
      ? <Navigate replace to='/' />
      : <>
        <h1>Log In</h1>
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
      </>
  )
}

export default LoginForm