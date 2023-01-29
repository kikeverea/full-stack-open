import { useEffect, useState } from 'react'
import { consumeLoginResult, logInUser } from '../../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showFailNotification, showSuccessNotification } from '../../reducers/notificationReducer'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import FormField from '../FormField'

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
      ?
      <Navigate replace to='/' />
      :
      <Container>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Form onSubmit={ handleLogin } style={{ width: 300 }}>
              <FormField
                name='Username'
                value={ username }
                inputChange={ setUsername }
              />
              <FormField
                name='Password'
                type='password'
                value={ password } inputChange={ setPassword }
              />
              <Button variant='primary' type='submit' style={{ width: 300 }}>
                Log in
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}

export default LoginForm