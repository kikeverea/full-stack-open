import { useEffect } from 'react'
import Blogs from './components/blogs/Blogs'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { useDispatch, useSelector } from 'react-redux'
import { checkForLoggedInUser, logoutUser } from './reducers/loggedInUserReducer'
import { showFailNotification, showSuccessNotification } from './reducers/notificationReducer'
import { consumeLoginResult } from './reducers/loginReducer'
import { Route, Routes } from 'react-router-dom'
import User from './components/User'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)
  const loginResult = useSelector(state => state.login)

  useEffect(() => {
    if (loginResult === null)
      return

    dispatch(loginResult === 'success'
      ? showSuccessNotification('Logged in')
      : showFailNotification('Log in failed. Wrong credentials'))

    dispatch(consumeLoginResult())

  }, [loginResult])


  useEffect(() => {
    dispatch(checkForLoggedInUser())
  }, [])

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>{user !== null ? 'Blogs' : 'Log in'}</h1>
      <Notification />
      <Routes>
        <Route path='/' element={
          user !== null ? (
            <>
              <LoggedUser user={user} logout={logout} />
              <Blogs user={user} />
            </>
          ) : (
            <LoginForm />
          )
        }/>
        <Route path='/users' element={ <Users /> }/>
        <Route path='/users/:id' element={ <User /> }/>
      </Routes>
    </div>
  )
}

export default App
