const supertest = require('supertest')
const app = require('../app')
const blogsHelper = require('./blogs_helper')
const usersHelper = require('./users_helper')
const initHelper = require('./init_helper')
const api = supertest(app)
const { default: mongoose } = require('mongoose')

const filterBlogEqualTo = blogsHelper.filterBlogEqualTo
const getBlogFromTokenUser = blogsHelper.getBlogFromTokenUser
const getBlogFromUserDifferentToTokenUser =
  blogsHelper.getBlogFromUserDifferentToTokenUser

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
  test('returns the correct amount of blogs', async () => {
    const blogsInDb = await blogsHelper.blogsInDb()
    const response = await buildRequest({ type: 'get' }).expect(200)

    expect(response.body).toHaveLength(blogsInDb.length)
  })

  test('blogs has id property', async () => {
    const response = await buildRequest({ type: 'get' })
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
  })

  test('blogs have a user assigned', async () => {
    const response = await buildRequest({ type: 'get' })
    const blog = response.body[0]

    expect(blog.user).toBeDefined()
  })
})

/************* POST *****************/

describe('addition of new blogs', () => {
  test('returns added blog with status 201 if blog is valid', async () => {
    const newBlog = blogsHelper.dummyBlog()
    const response = await postBlog(newBlog).expect(201)
    const savedBlog = response.body

    expect(blogsHelper.areEqual(savedBlog, newBlog)).toBe(true)
  })

  test('added blog can be found in blogs collection', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const newBlog = blogsHelper.dummyBlog()

    await postBlog(newBlog)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, newBlog)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(inCollection).toBeDefined()
  })

  test('if likes property is missing, add with zero likes', async () => {
    const blogNoLikes = blogsHelper.dummyBlog({ ignore: ['likes'] })

    const response = await postBlog(blogNoLikes)
    const savedBlog = response.body

    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, savedBlog)

    expect(savedBlog.likes).toEqual(0)
    expect(inCollection.likes).toEqual(0)
  })

  test('adding with title and url missing, fails with status 400', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const blog = blogsHelper.dummyBlog({ ignore: ['title', 'url'] })

    const response = await postBlog(blog).expect(400)

    await assertCreationFailed(response, blog, blogsAtStart)
  })

  test('adding without providing a token, fails with status 401', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const blog = blogsHelper.dummyBlog()

    const response = await postBlog(blog, { auth: false }).expect(401)

    await assertCreationFailed(response, blog, blogsAtStart)
  })

  const assertCreationFailed = async (response, newBlog, blogsAtStart) => {
    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, newBlog)

    expect(response.body.error).toBeDefined()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(inCollection).toBeUndefined()
  }

  const postBlog = (blog, options) => {
    return buildRequest({ type: 'post', payload: blog, ...options })
  }
})

/************* DELETE *****************/

describe('deletion of blogs', () => {
  test('deleting with valid id, succeeds with 204', async () => {
    const blog = await getBlogFromTokenUser(token)
    await deleteBlog(blog, { json: false }).expect(204)
  })

  test('blog is no longer in blogs after deletion', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const toDelete = await getBlogFromTokenUser(token, blogsAtStart)

    await deleteBlog(toDelete, { json: false })

    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, toDelete)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(inCollection).toBeUndefined()
  })

  test('deleting without providing a token, fails with 401', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const toDelete = blogsAtStart[0]

    const response = await deleteBlog(toDelete, { auth: false }).expect(401)

    await assertDeletionFailed(toDelete, response, blogsAtStart)
  })

  test('user deleting a blog that did not create, fails with 401', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const blog = await getBlogFromUserDifferentToTokenUser(token, blogsAtStart)

    const response = await deleteBlog(blog).expect(401)

    await assertDeletionFailed(blog, response, blogsAtStart)
  })

  const deleteBlog = (blog, options) => {
    return buildRequest({ type: 'delete', payload: blog, ...options })
  }

  const assertDeletionFailed = async (toDelete, response, blogsAtStart) => {
    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, toDelete)

    expect(response.body.error).toBeDefined()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(inCollection).toBeDefined()
  }
})

/************* PUT *****************/

describe('updating existing blogs', () => {
  test('returns updated blog with status 200 if blog is valid', async () => {
    const blog = await updatedDummy()
    const response = await updateBlog(blog).expect(200)

    expect(blogsHelper.areEqual(response.body, blog)).toBe(true)
  })

  test('updated blog can be found in blogs collection', async () => {
    const toUpdate = await updatedDummy()

    await updateBlog(toUpdate)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, toUpdate)

    expect(inCollection).toBeDefined()
  })

  test('updating a blog does not modify blogs collection', async () => {
    const blogsAtStart = await blogsHelper.blogsInDb()
    const blog = await updatedDummy(blogsAtStart)

    await updateBlog(blog).expect(200)

    const blogsAtEnd = await blogsHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('sending an update without likes, updates likes to zero', async () => {
    const toUpdate = await updatedDummy({ likes: undefined })

    const response = await updateBlog(toUpdate)
    const updated = response.body

    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, toUpdate,
      { ignore: ['likes'] })

    expect(updated.likes).toBe(0)
    expect(inCollection.likes).toBe(0)
  })

  test('updating with missing title and url, fails with 400', async () => {
    const toUpdate = await updatedDummy({ title: undefined, url: undefined })

    await updateBlog(toUpdate).expect(400)
    await assertUpdateFailed(toUpdate)
  })

  test('updating without providing a token, fails with 401', async () => {
    const toUpdate = await updatedDummy()

    await updateBlog(toUpdate, { auth: false }).expect(401)
    await assertUpdateFailed(toUpdate)
  })

  test('user updating a blog that did not create, fails with 401', async () => {
    const blogFromOtherUser = await getBlogFromUserDifferentToTokenUser(token)

    const toUpdate = {
      ...blogFromOtherUser,
      title: 'Other title'
    }

    await updateBlog(toUpdate).expect(401)
    await assertUpdateFailed(toUpdate)
  })

  const updatedDummy = async (update) => {
    const blog = await getBlogFromTokenUser(token)

    if (!update) {
      update = {
        title: 'Other title',
        author: 'Another author'
      }
    }

    return { ...blog, ...update }
  }

  const updateBlog = (blog, options) => {
    return buildRequest({ type: 'put', payload: blog, ...options })
  }

  const assertUpdateFailed = async (toUpdate) => {
    const blogsAtEnd = await blogsHelper.blogsInDb()
    const inCollection = filterBlogEqualTo(blogsAtEnd, toUpdate)

    expect(inCollection).toBeUndefined()
  }
})

const buildRequest = ({ type, payload, json=true, auth=true }) => {
  const req = getRequestWithType(type, payload)

  if (auth) {
    req.set('Authorization', `bearer ${token.token}`)
  }

  if (json) {
    req.expect('Content-Type', /application\/json/)
  }

  return req
}

const getRequestWithType = (type, payload) => {
  const baseUri = '/api/blogs'
  switch (type.toLowerCase()) {
  case 'get' :
    return api.get(baseUri)
  case 'post' :
    return api.post(baseUri).send(payload)
  case 'put' :
    return api.put(`${baseUri}/${payload.id}`).send(payload)
  case 'delete' :
    return api.delete(`${baseUri}/${payload.id}`)
  }
}

afterAll(() => {
  mongoose.connection.close()
})