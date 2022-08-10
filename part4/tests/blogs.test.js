const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blogs_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogEntities = helper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogEntities.map(blog => blog.save())
  await Promise.all(promises)
})

describe('query methods', () => {
  test('returns the correct amount and format of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body
    expect(blogs).toHaveLength(6)
  }, 20000)

  test('blogs unique identifier is named id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
})
