const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./dummyBlogs')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogEntities = blogs.map(blog => new Blog(blog))
  const promises = blogEntities.map(blog => blog.save())
  await Promise.all(promises)
})

test('returns the correct amount and format of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body
  expect(blogs).toHaveLength(6)
}, 20000)