const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.DATABASE_URI)
  .then(() => {
    console.log('Connected')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app