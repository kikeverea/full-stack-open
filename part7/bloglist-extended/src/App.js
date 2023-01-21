import { useEffect, useState } from 'react'
import Blogs from './components/blogs/Blogs'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import loginService from './services/login'
import usersService from './services/users'

import { showFailNotification, showSuccessNotification } from './reducers/notificationReducer'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = usersService.getUserFromLocal()
    if (user) {
      setUser(user)
    }
  }, [])

  const loggedIn = async (user) => {
    if (user) {
      saveUserInLocal(user)
      showSuccessNotification('Logged in')
    }
    else {
      showFailNotification('Login failed. Wrong credentials')
    }
  }

  const logout = () => {
    usersService.removeUserFromLocal()
    setUser(null)
  }

  const saveUserInLocal = (user) => {
    usersService.saveUserInLocal(user)
    setUser({ ...user })
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>{user !== null ? 'Blogs' : 'Log in'}</h1>
      <Notification />
      {user !== null ? (
        <>
          <LoggedUser user={user} logout={logout} />
          <Blogs user={user} />
        </>
      ) : (
        <LoginForm loginService={loginService} userLoggedIn={loggedIn} />
      )}
    </div>
  )
}

export default App
