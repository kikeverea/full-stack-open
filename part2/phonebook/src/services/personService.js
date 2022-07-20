import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return responseData(axios.get(baseUrl)) 
}

const create = (person) => {
  return responseData(axios.post(baseUrl, person))
}

const update = (person) => {
  return responseData(axios.put(`${baseUrl}/${person.id}`, person))
}

const remove = (person) => {
  return axios
          .delete(`${baseUrl}/${person.id}`)
          .then(response => response.status === 200)
          .catch(error => {
            console.log('delete fail', error)
            return false
          })
}

const responseData = (request) => {
  return request.then(response => response.data)
}

export default {getAll, create, update, remove}