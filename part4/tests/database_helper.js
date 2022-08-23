const Blog = require('../models/blog')
const User = require('../models/user')
const usersHelper = require('./users_helper')
const blogsHelper = require('./blogs_helper')

let usersInitialized

const initUsers = async () => {
  await initCollection(User, usersHelper.initialUsers, user => new User(user))
  usersInitialized = true
}

const initBlogs = async () => {
  if (!usersInitialized) {
    await initUsers()
  }

  const usersInDb = await User.find({}).populate('blogs')

  const blogs =
    blogsHelper.initialBlogs.map(blog => blogWithRandomUser(blog, usersInDb))

  const blogsInDb = await initCollection(Blog, blogs, blog => new Blog(blog))

  await addBlogsToTheirUsers(blogsInDb)
}

const initCollection = async (model, data, mapper) => {
  await model.deleteMany({})
  const entities = data.map(data => mapper(data))
  const promises = entities.map(entity => entity.save())
  return await Promise.all(promises)
}

const blogWithRandomUser = (blog, users) => ({
  ... blog,
  user: users[Math.floor(Math.random(users.length - 1))]._id
})

const addBlogsToTheirUsers = async blogs => {
  for (const blog of blogs) {
    const user = await User.findById(blog.user)
    user.blogs = user.blogs ? user.blogs.concat(user._id) : [user._id]
    await user.save()
  }
}

module.exports = {
  initUsers,
  initBlogs
}