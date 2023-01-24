import axios from 'axios'

const baseUrl = '/api/blogs'

const fetchAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const fetchUserBlogs = async (id) => {
  const response = await axios.get('/api/users')
  const users = response.data
  const loggedInUser = users.filter(user => user.id === id)[0]

  return loggedInUser.blogs
}

const createBlog = async (blog, user) => {
  const response = await axios.post(baseUrl, blog, config(user))
  return response.data
}

const updateBlog = async (blog, user) => {
  blog = formatBlogForUpdate(blog)
  const response = await axios.put(`${ baseUrl }/${ blog.id }`, blog, config(user))
  return response.status === 200
}

const updateBlogLikes = async (blog) => {
  blog = formatBlogForUpdate(blog)
  const response = await axios.put(`${ baseUrl }/${ blog.id }/likes`, blog)
  return response.status === 200
}

const addCommentToBlog = async (comment, blog) => {
  const response = await axios.post(`${ baseUrl }/${ blog.id }/comments`, { comment })
  return response.data
}

const deleteCommentFromBlog = async (comment, blog) => {
  const response = await axios.delete(`${ baseUrl }/${ blog.id }/comments/${ comment.id }`)
  return response.status === 204
}

const formatBlogForUpdate = blog => {
  return {
    ...blog,
    user: blog.user.id
  }
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

export default {
  fetchAll,
  fetchUserBlogs,
  createBlog,
  updateBlog,
  updateBlogLikes,
  addCommentToBlog,
  deleteCommentFromBlog,
  deleteBlog
}