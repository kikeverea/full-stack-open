const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./users_helper')
const bcrypt = require('bcrypt')
const { users } = require('./users_helper')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
  const initialUsers = await helper.initialUsers
  const userEntities = initialUsers.map(user => new User(user))
  const promises = userEntities.map(user => user.save())
  await Promise.all(promises)
},
20000)

describe('query users', () => {
  test('query all users', async () => {
    const dbUsers = await helper.usersInDb()

    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const allUsers = response.body

    expect(allUsers).toHaveLength(dbUsers.length)
    expect(allUsers).toEqual(expect.arrayContaining(dbUsers))
  })
})

describe('create new users', () => {
  test('posting valid user, adds new user', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'user',
      password: 'sekret'
    }

    const response = await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const filtered = usersAtEnd.filter(user =>
      user.name === response.body.name &&
      user.username === response.body.username)
    expect(filtered).toHaveLength(1)

    const user = filtered[0]
    expect(user).toBeDefined()
    expect(user.blogs).toBeDefined()
    expect(user.blogs).toHaveLength(0)
  })
})
