import axios from 'axios'
import { useState } from 'react'

export const useResource = (baseUrl) => {

  const [resources, setResources] = useState([])

  const fetchAll = () => {
    axios
      .get(baseUrl)
      .then(response => setResources(response.data))
  }

  const create = newObject => {
    axios
      .post(baseUrl, newObject)
      .then(response => setResources(resources.concat(response.data)))
  }

  const service = {
    fetchAll,
    create
  }

  return [resources, service]
}