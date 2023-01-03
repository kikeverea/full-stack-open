import axios from 'axios'
import LOCAL_STORAGE_USER_KEY from "./users";

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateBlog = async (blog) => {
  const userJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
  const user = JSON.parse(userJSON)

  const config = {
    headers: { Authorization: `bearer ${ user.token }` },
  }

  blog = {
    ...blog,
    user: user.id
  }

  await axios.put(`${ baseUrl }/${ blog.id }`, blog, config)
}

export default { getAll, updateBlog }