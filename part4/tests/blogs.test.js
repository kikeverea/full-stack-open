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

describe('create methods', () => {
  test('can add valid blogs', async () => {
    const blog = {
      title: 'A new blog',
      author: 'Me',
      url: 'www.my-url.com',
      likes: 89
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogs = await helper.blogsInDb()
    const compareBlogs = currentBlogs.map(blog => (
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      }))
    expect(compareBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(compareBlogs).toContainEqual(blog)
  })

  test('if likes property is missing, default to zero', async () => {
    const blog = {
      title: 'A new blog',
      author: 'Me',
      url: 'www.my-url.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body

    expect(savedBlog.likes).toEqual(0)
  })
})
