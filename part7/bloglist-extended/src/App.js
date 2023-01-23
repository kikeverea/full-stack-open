import { useEffect, useLayoutEffect } from 'react'
import Blogs from './components/blogs/Blogs'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { useDispatch, useSelector } from 'react-redux'
import { checkForLoggedInUser, logoutUser } from './reducers/loggedInUserReducer'
import { clearNotification, showFailNotification, showSuccessNotification } from './reducers/notificationReducer'
import { consumeLoginResult } from './reducers/loginReducer'
import { Route, Routes, useLocation } from 'react-router-dom'
import User from './components/User'
import Blog from './components/blogs/Blog'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.loggedInUser)
  const loginResult = useSelector(state => state.login)
  const notification = useSelector(state => state.notification)

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

  const location = useLocation()

  useLayoutEffect(() => {
    if (notification) {
      dispatch(clearNotification())
    }
  }, [location])

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>{user !== null ? 'Blogs' : 'Log in'}</h1>
      <Notification />
      <Routes>
        { ['/', '/blogs'].map(path =>
          <Route key={ path } path={ path } element={
            user !== null ?
              <>
                <LoggedUser user={user} logout={logout} />
                <Blogs />
              </>
              :
              <LoginForm />
          } />)
        }
        <Route path='/users' element={ <Users /> }/>
        <Route path='/users/:id' element={ <User /> }/>
        <Route path='/blogs/:id' element={ <Blog /> }/>
      </Routes>
    </div>
  )
}

export default App
