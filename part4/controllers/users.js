const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',
    { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

router.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const userExists = await User.findOne({ username: username })

  if (userExists) {
    return response.status(400).json({ error: 'username already exists' })
  }

  const invalidUserMessage = invalidUser(username, password)

  if (invalidUserMessage) {
    return response.status(400).json(invalidUserMessage)
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

const invalidUser = (username, password) => {
  if (!username || !password) {
    return {
      error: 'username and password must be provided'
    }
  }

  if (password.length < 3) {
    return {
      error: 'password must be at least 3 characters long'
    }
  }
}

module.exports = router