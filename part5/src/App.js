import { useState, useEffect } from 'react'
import BlogsTable from './components/BlogsTable'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import axios from 'axios'

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

  const logout = () => {
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, null)
    setUser(null)
  }
  
  const addNewBlog = async (blog) => {
    const config = {
      headers: { Authorization: `bearer ${user.token}` },
    }

    const response = await axios.post('/api/blogs', blog, config)
    const addedBlog = response.data

    if(addedBlog) {
      user.blogs = user.blogs.concat(addedBlog)
      saveUser(user)
    }
  }

  const handleLogin = async (user) => {
    const blogs = await fetchUserBlogs(user.id)
    user.blogs = blogs
    saveUser(user)
  }

   const fetchUserBlogs = async (id) => {
    const response = await axios.get('/api/users')
    const users = response.data
    const loggedUser = users.filter(user => user.id === id)[0]
    
    return loggedUser.blogs
  }

  const saveUser = (user) => {
    setUser({...user})
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
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
        <NewBlogForm createNewBlog={ addNewBlog } />
        { user.blogs ? 
          <BlogsTable blogs={ user.blogs } /> : 
          'No blogs listed'
        }
      </div>
    )
  }
}

export default App
