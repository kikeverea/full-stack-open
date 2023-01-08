const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/reset', async (req, res) => {
  User.deleteMany({})
  Blog.deleteMany({})

  res.status(204).end()
})

module.exports = router
