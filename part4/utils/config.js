/* eslint-disable no-undef */
require('dotenv').config()

const DATABASE_URI = process.env.DATABASE_URI
const PORT = process.env.PORT || 3003

module.exports = {
  DATABASE_URI,
  PORT
}
