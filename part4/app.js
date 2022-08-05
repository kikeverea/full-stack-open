const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(config.DATABASE_URI)
  .then(() => {
    logger.info('Connected')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

module.exports = app