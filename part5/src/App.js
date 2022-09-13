import { useState, useEffect } from 'react'
import BlogsTable from './components/BlogsTable'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const LOCAL_STORAGE_USER_KEY = 'loggedInUser'

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const checkUserLoggedIn = () => {
    const loggedInJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON)
      setUser(user)
    }
  }

  const handleLogin = (user) => {
    setUser(user)
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
  }

  const logout = () => {
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, null)
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <LoginForm loginService={ loginService } userLoggedIn={ handleLogin }/>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Blogs</h2>
        <LoggedUser user={ user } logout={ logout } />
        { user.blogs ? 
          <BlogsTable user={ user } /> : 
          'No blogs listed'
        }
        
      </div>
    )
  }
}

export default App
