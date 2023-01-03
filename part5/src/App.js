import {useEffect, useState, useRef} from 'react'
import BlogsTable from './components/BlogsTable'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from "./components/Notification"

import loginService from './services/login'
import axios from 'axios'
import Toggable from "./components/Toggable"

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const LOCAL_STORAGE_USER_KEY = 'loggedInUser'

  const newBlogForm = useRef()

  useEffect(() => {
    const loggedInJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON)
      setUser(user)
    }
  }, [])

  const logout = () => {
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, null)
    setUser(null)
  }

  const addNewBlog = async (blog) => {
    const config = {
      headers: { Authorization: `bearer ${ user.token }` },
    }

    const response = await axios.post('/api/blogs', blog, config)
    const addedBlog = response.data

    if(addedBlog) {
      newBlogForm.current.toggle()
      user.blogs = user.blogs.concat(addedBlog)
      saveUserInLocal(user)
      showNotification(`A new blog: '${ addedBlog.title }', was added`, 'success')
    }
  }

  const cancelNewBlog = () => {
    newBlogForm.current.toggle()
  }

  const showNotification = (message, type) => {
    console.log('showing notification: ', message)
    setNotification({
      message: message,
      type: type
    })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const saveUserInLocal = (user) => {
    setUser({...user})
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
  }

   const fetchUserBlogs = async (id) => {
    const response = await axios.get('/api/users')
    const users = response.data
    const loggedUser = users.filter(user => user.id === id)[0]

    return loggedUser.blogs
  }

  const handleLogin = async (user) => {
    if (user) {
      user.blogs = await fetchUserBlogs(user.id)
      saveUserInLocal(user)
      showNotification('Logged in', 'success')
    }
    else {
      console.log('no user!')
      showNotification('Login failed. Wrong credentials', 'fail')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification notification={ notification }/>
        <LoginForm loginService={ loginService } userLoggedIn={ handleLogin }/>
      </div>
    )
  }
  else {
    return (
      <div style={{ padding: 10 }}>
        <h2>Blogs</h2>
        <Notification notification={ notification }/>
        <LoggedUser user={ user } logout={ logout } />
        <Toggable label={ 'new blog' } ref={ newBlogForm }>
          <NewBlogForm onFormSubmit={ addNewBlog } onCancel={ cancelNewBlog } />
        </Toggable>
        { user.blogs ?
          <BlogsTable blogs={ user.blogs } /> :
          'No blogs listed'
        }
      </div>
    )
  }
}

export default App
