import { useState, useEffect } from 'react'
import BlogsTable from './components/BlogsTable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <LoginForm loginService={ loginService } userLoggedIn={ setUser }/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs ({ user.name ? user.name : user.username })</h2>
      { user.blogs
        ? <BlogsTable user={ user } />
        : 'No blogs listed'
      }
      
    </div>
  )
}

export default App
