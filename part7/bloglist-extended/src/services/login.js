import axios from 'axios'

const loginUrl = '/api/login'

const login = async (username, password) => {
  try {
    const response = await axios.post(loginUrl, { username, password })
    const user = response.data

    return response.status === 200 ? user : null
  }
  catch (e) {
    return null
  }
}

export default { login }