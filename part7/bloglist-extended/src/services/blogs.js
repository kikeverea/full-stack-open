import axios from 'axios'

const baseUrl = '/api/blogs'

const fetchUserBlogs = async (id) => {
  const response = await axios.get('/api/users')
  const users = response.data
  const loggedInUser = users.filter(user => user.id === id)[0]

  return loggedInUser.blogs
}

const addBlog = async (blog, user) => {
  const config = {
    headers: { Authorization: `bearer ${ user.token }` },
  }

  const response = await axios.post('/api/blogs', blog, config)
  return response.data
}

const updateBlog = async (blog, user) => {
  blog = {
    ...blog,
    user: user.id
  }

  const response = await axios.put(`${ baseUrl }/${ blog.id }`, blog, config(user))

  return response.status === 200
}

const deleteBlog = async (blog, user) => {
  const response = await axios.delete(`${ baseUrl }/${ blog.id }`, config(user))
  return response.status === 204
}

const config = (user) => {
  return (
    {
      headers: { Authorization: `bearer ${ user.token }` },
    }
  )
}


export default { fetchUserBlogs, addBlog, updateBlog, deleteBlog }