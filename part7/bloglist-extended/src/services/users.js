import axios from 'axios'

const LOCAL_STORAGE_USER_KEY = 'loggedInUser'

const usersUrl = '/api/users'

const fetchAllUsers = async () => {
  const response = await axios.get(usersUrl)
  return response.data
}

const updateUser = async (updatedUser) => {
  const loggedInUser = getUserFromLocal()
  const response = await axios.put(`${usersUrl}/${updatedUser.id}`, updatedUser, config(loggedInUser))
  const updated = response.status === 204

  if (updated)
    saveUserInLocal({ ...getUserFromLocal(), name: updatedUser.name })

  return updated
}

const getUserFromLocal = () => {
  const json = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
  return json ? JSON.parse(json) : null
}

const saveUserInLocal = (user) =>
  window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))

const removeUserFromLocal = () =>
  window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)

const config = (user) => {
  return (
    {
      headers: { Authorization: `bearer ${ user.token }` },
    }
  )
}

export default { fetchAllUsers, updateUser, getUserFromLocal, saveUserInLocal, removeUserFromLocal }