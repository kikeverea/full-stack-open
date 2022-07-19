import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return responseData(axios.get(baseUrl)) 
}

const create = (person) => {
  return responseData(axios.post(baseUrl, person))
}

const update = (id, person) => {
  return responseData(axios.put(`${baseUrl}/${id}`, person))
}

const remove = (id) => {
  //implement
}

const responseData = (request) => {
  return request.then(response => response.data)
}

export default {getAll, create, update, remove}