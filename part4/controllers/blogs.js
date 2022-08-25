const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body

  if (!title && !url) {
    return response.status(400).json({
      error: 'Title or url must be provided'
    })
  }

  const requestUser = request.user

  const user = await User.findOne({ username: requestUser.username })

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body
  const id = request.params.id

  const blog = await Blog.findById(id)
  const user = request.user

  if (userIsNotCreatorOfBlog(user, blog))
    return unauthorizedUserResponse(response)

  if (!title && !url) {
    return response.status(400).json({
      error: 'Title or url must be provided'
    })
  }

  // atomic
  const updated = await Blog.findByIdAndUpdate(id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' })

  response.status(200).json(updated)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  const user = request.user

  if (userIsNotCreatorOfBlog(user, blog))
    return unauthorizedUserResponse(response)

  blog.remove()

  response.status(204).end()
})

const userIsNotCreatorOfBlog = (user, blog) => {
  if (blog.user.toString() !== user.id)
    return true
}

const unauthorizedUserResponse = (response) => {
  response
    .status(401)
    .json({ error: 'user not authorized to do this operation' })
}

module.exports = blogsRouter

