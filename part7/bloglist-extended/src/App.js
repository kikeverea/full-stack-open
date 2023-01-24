import { useEffect, useLayoutEffect } from 'react'
import Blogs from './components/blogs/Blogs'
import LoginForm from './components/users/LoginForm'
import Notification from './components/Notification'
import Users from './components/users/Users'
import NavigationBar from './components/NavigationBar'

import { useDispatch, useSelector } from 'react-redux'
import { checkForLoggedInUser } from './reducers/loggedInUserReducer'
import { clearNotification } from './reducers/notificationReducer'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import User from './components/users/User'
import Blog from './components/blogs/Blog'

const App = () => {

  const dispatch = useDispatch()

  const location = useLocation()
  const user = useSelector(state => state.loggedInUser)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(checkForLoggedInUser())
  }, [])

  useLayoutEffect(() => {
    if (notification) {
      dispatch(clearNotification())
    }
  }, [location])

  return (
    <div style={{ padding: 10 }}>
      { user && <NavigationBar /> }
      <Notification />
      <Routes>
        { ['/', '/blogs'].map(path =>
          <Route key={ path } path={ path } element={
            user !== null
              ? <Blogs />
              : <Navigate replace to='/login' />
          } />)
        }
        <Route path='/login' element={ <LoginForm /> }/>
        <Route path='/users' element={ <Users /> }/>
        <Route path='/users/:id' element={ <User /> }/>
        <Route path='/blogs/:id' element={ <Blog /> }/>
      </Routes>
    </div>
  )
}

export default App
