const supertest = require('supertest')
const app = require('../app')
const blogsHelper = require('./blogs_helper')
const usersHelper = require('./users_helper')
const initHelper = require('./init_helper')
const api = supertest(app)
const { default: mongoose } = require('mongoose')

let token

beforeAll(async () => {
  await initHelper.initUsers()
  token = await loginRandomUser()
})

beforeEach(async () => {
  await initHelper.initBlogs()
},
20000)

const loginRandomUser = async () => {
  const user = usersHelper.randomUser()
  const credentials = {
    username: user.username,
    password: user.passwordHash
  }

  const response = await api
    .post('/api/login')
    .send(credentials)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return response.body
}

describe('when there are blogs already saved', () => {
  test('returns the correct amount and format of blogs', async () => {
    const blogsInDb = await blogsHelper.blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(blogsInDb.length)
  })

  test('blogs has id property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })

  test('blogs have a user assigned', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.user).toBeDefined()
  })
})

describe('addition of new blogs', () => {
  test('adding valid blog returns 201', async () => {
    const newBlog = blogsHelper.dummyBlog()
    await postBlog(newBlog).expect(201)
  })

  test('adding valid blog returns saved blog', async () => {
    const newBlog = blogsHelper.dummyBlog()
    const response = await postBlog(newBlog)
    const savedBlog = response.body
    expect(blogsHelper.areEqual(savedBlog, newBlog))
  })

  test('blogs after adding valid blog contain added blog', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const newBlog = blogsHelper.dummyBlog()

    const response = await postBlog(newBlog)
    const savedBlog = response.body

    const blogsAtEnd = await blogsHelper.blogsInDb()
    const filtered = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, savedBlog))

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(filtered[0]).toBeDefined()
  })

  test('if likes property is missing, default to zero', async () => {
    const blogNoLikes = blogsHelper.dummyBlog(['likes'])

    const response = await postBlog(blogNoLikes)
    const savedBlog = response.body

    expect(savedBlog.likes).toEqual(0)
  })

  test('if title and url are missing, fail with status 400', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const blog = blogsHelper.dummyBlog(['title', 'url'])

    const response = await postBlog(blog).expect(400)

    await assertCreationFailed(response, blog, blogsAtStart)
  })

  test('if no token is provided, fail with status 401', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const blog = blogsHelper.dummyBlog()

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)

    await assertCreationFailed(response, blog, blogsAtStart)
  })

  const assertCreationFailed = async (response, newBlog, blogsAtStart) => {
    const error = response.body
    const blogsAtEnd = await blogsHelper.blogsInDb()
    const filtered = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, newBlog))

    expect(error.error).toBeDefined()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(filtered).toHaveLength(0)
  }

  const postBlog = blog => {
    return api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token.token}`)
      .send(blog)
      .expect('Content-Type', /application\/json/)
  }

})

describe('deletion of blogs', () => {
  test('succeeds with 204 if id is valid', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()

    const userBlogs = blogsAtStart.filter(blog =>
      blog.user.id === token.id)

    const toDelete = userBlogs[0]

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .expect(204)

    const blogsAtEnd = await blogsHelper.blogsInDb()

    const deleted = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toDelete))

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(deleted).toHaveLength(0)
  })

  test('fails with 401 if token is not provided', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const toDelete = blogsAtStart[0]

    const response = await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    await assertDeletionFailed(toDelete, response, blogsAtStart)
  })

  test('fails with 401 if trying to delete a blog from a user different than the' +
  ' blog creator', async () =>
  {
    const blogsAtStart = await blogsHelper.blogsInDb()

    const blogsFromOtherUser = blogsAtStart.filter(blog =>
      blog.user.id !== token.id)

    const toDelete = blogsFromOtherUser[0]

    const response = await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    await assertDeletionFailed(toDelete, response, blogsAtStart)
  })

  const assertDeletionFailed = async (toDelete, response, blogsAtStart) => {
    const blogsAtEnd = await blogsHelper.blogsInDb()

    const filtered = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toDelete))

    expect(response.body.error).toBeDefined()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(filtered[0]).toBeDefined()
  }
})

describe('updating existing blogs', () => {
  test('succeeds with 200 if blog is valid', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const userBlogs = blogsAtStart.filter(blog => blog.user.id === token.id)
    const randomInd = Math.floor(Math.random(userBlogs.length - 1))

    const toUpdate = {
      ...userBlogs[randomInd],
      title: 'Updated blog',
      author: 'A different author'
    }

    const response = await api
      .put(`/api/blogs/${toUpdate.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .send(toUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsHelper.blogsInDb()

    const filtered = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toUpdate))

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsHelper.areEqual(response.body, toUpdate)).toBe(true)
    expect(filtered[0]).toBeDefined()
  })

  test('likes default to zero if are missing', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const userBlogs = blogsAtStart.filter(blog => blog.user.id === token.id)
    const randomInd = Math.floor(Math.random(userBlogs.length - 1))

    const toUpdate = {
      ...userBlogs[randomInd],
      likes: undefined
    }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .send(toUpdate)
      .expect(200)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const filtered = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toUpdate, ['likes']))

    expect(filtered[0].likes).toBe(0)
  })

  test('fails with 400 if title and url are missing', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const userBlogs = blogsAtStart.filter(blog => blog.user.id === token.id)
    const randomInd = Math.floor(Math.random(userBlogs.length - 1))

    const toUpdate = {
      ...userBlogs[randomInd],
      title: undefined,
      url: undefined
    }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .send(toUpdate)
      .expect(400)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const unchanged = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toUpdate))

    expect(unchanged).toHaveLength(0)
  })

  test('fails with 401 if token is not provided', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const userBlogs = blogsAtStart.filter(blog => blog.user.id === token.id)
    const randomInd = Math.floor(Math.random(userBlogs.length - 1))


    const toUpdate = {
      ...userBlogs[randomInd],
      title: 'Other title'
    }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(toUpdate)
      .expect(401)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const unchanged = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toUpdate))

    expect(unchanged).toHaveLength(0)
  })

  test('fails with 401 if trying to update a blog from a user different than the' +
  ' blog creator', async () =>
  {
    const blogsAtStart = await blogsHelper.blogsInDb()

    const blogsFromOtherUser = blogsAtStart.filter(blog =>
      blog.user.id !== token.id)

    const toUpdate = {
      ...blogsFromOtherUser[0],
      title: 'Other title'
    }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const unchanged = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toUpdate))

    expect(unchanged).toHaveLength(0)
  })

  const assertBlogUpdated = async (toUpdate, blogsAtStart) => {
    const response = await api
      .put(`/api/blogs/${toUpdate.id}`)
      .set('Authorization', `bearer ${token.token}`)
      .send(toUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updated = response.body
    const blogsAtEnd = await blogsHelper.blogsInDb()

    const filtered = blogsAtEnd.filter(blog =>
      blogsHelper.areEqual(blog, toUpdate))

    expect(updated).toBeDefined()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsHelper.areEqual(response.body, toUpdate)).toBe(true)
    expect(filtered[0]).toBeDefined()
  }
})

afterAll(() => {
  mongoose.connection.close()
})