import axios from "axios"

const baseUrl = '/api/persons'

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
  return axios.delete(`${baseUrl}/${person.id}`)
}

const responseData = (request) => {
  return request.then(response => response.data)
}

export default {getAll, create, update, remove}