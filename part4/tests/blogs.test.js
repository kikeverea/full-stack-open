const supertest = require('supertest')
const app = require('../app')
const blogsHelper = require('./blogs_helper')
const initHelper = require('./init_helper')
const api = supertest(app)
const { default: mongoose } = require('mongoose')

beforeAll(async () => {
  await initHelper.initUsers()
})

beforeEach(async () => {
  await initHelper.initBlogs()
},
20000)

describe('when there are blogs already saved', () => {
  test('returns the correct amount and format of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body
    expect(blogs).toHaveLength(6)
  })

  test('blogs unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
  })

  test('blogs have a user assigned', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].user).toBeDefined()
  })
})

describe('addition of new blogs', () => {
  test('can add valid blogs', async () => {
    const blog = {
      title: 'A new blog',
      author: 'Me',
      url: 'www.my-url.com',
      likes: 89
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const addedBlog = response.body
    expect(addedBlog.user).toBeDefined()

    const currentBlogs = await blogsHelper.blogsInDb()
    const compareBlogs = currentBlogs.map(blog => (
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      }))
    expect(compareBlogs).toHaveLength(blogsHelper.initialBlogs.length + 1)
    expect(compareBlogs).toContainEqual(blog)
  })

  test('if likes property is missing, default to zero', async () => {
    const blog = {
      title: 'A new blog',
      author: 'Me',
      url: 'www.my-url.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body

    expect(savedBlog.likes).toEqual(0)
  })

  test('if title and url are missing, do not add', async () => {
    const blog = {
      author: 'Me',
      likes: 36
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })
})

describe('deletion of blogs', () => {
  test('succeeds with 204 if id is valid', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const toDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const deleted = blogsAtEnd.filter(blog =>
      blog.title === toDelete.title &&
      blog.author === toDelete.author)

    expect(deleted).toHaveLength(0)
  })
})

describe('updating existing blogs', () => {
  test('succeeds with 200 if blog is valid', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const randomInd = Math.floor(Math.random(blogsAtStart.length - 1))
    const toUpdate = {
      ...blogsAtStart[randomInd],
      title: 'Updated blog',
      author: 'A different author'
    }

    const response = await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(toUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const updated = formatForComparison(response.body)
    const expected = formatForComparison(toUpdate)

    expect(updated).toEqual(expected)

    const toUpdateFiltered = blogsAtEnd.filter(blog =>
      blog.title === toUpdate.title &&
      blog.author === toUpdate.author &&
      blog.url === toUpdate.url &&
      blog.likes === toUpdate.likes)

    expect(toUpdateFiltered[0]).toBeDefined()
  })

  const formatForComparison = blog => ({
    id: blog.id,
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url
  })

  test('likes default to zero if are missing', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const randomInd = Math.floor(Math.random(blogsAtStart.length - 1))
    const toUpdate = {
      ...blogsAtStart[randomInd],
      likes: undefined
    }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(toUpdate)
      .expect(200)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const toUpdateFiltered = blogsAtEnd.filter(blog =>
      blog.title === toUpdate.title &&
      blog.author === toUpdate.author &&
      blog.url === toUpdate.url)

    expect(toUpdateFiltered[0].likes).toBe(0)
  })

  test('fails with 400 if title and url are missing', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const randomInd = Math.floor(Math.random(blogsAtStart.length - 1))
    const tryUpdate = blogsAtStart[randomInd]
    const toUpdate = {
      ...tryUpdate,
      title: undefined,
      url: undefined
    }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(toUpdate)
      .expect(400)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const unchanged = blogsAtEnd.filter(blog => Object.is(blog, tryUpdate))
    expect(unchanged).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})