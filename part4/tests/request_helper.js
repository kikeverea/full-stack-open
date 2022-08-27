const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const buildRequest = (type, uri, { payload, json=true, auth }) => {
  const req = getRequestWithType(type, uri, payload)

  if (auth) {
    req.set('Authorization', `bearer ${auth.token}`)
  }

  if (json) {
    req.expect('Content-Type', /application\/json/)
  }

  return req
}

const getRequestWithType = (type, uri, payload) => {
  switch (type.toLowerCase()) {
  case 'get' :
    return api.get(uri)
  case 'post' :
    return api.post(uri).send(payload)
  case 'put' :
    return api.put(`${uri}/${payload.id}`).send(payload)
  case 'delete' :
    return api.delete(`${uri}/${payload.id}`)
  }
}

module.exports = buildRequest