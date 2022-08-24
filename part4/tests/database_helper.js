const Blog = require('../models/blog')
const User = require('../models/user')
const usersHelper = require('./users_helper')
const blogsHelper = require('./blogs_helper')
const bcrypt = require('bcrypt')

const initUsers = async () => {
  const users = await hashPasswords(usersHelper.initialUsers)
  await initCollection(User, users, user => new User(user))
}

const hashPasswords = async (users) => {
  const hashed = []
  for (const user of users) {
    hashed.push(
      {
        ...user,
        passwordHash: await bcrypt.hash(user.passwordHash, 10)
      }
    )
  }
  return hashed
}

const initBlogs = async () => {
  const usersInDb = await getUsersInDb()

  const blogs =
    blogsHelper.initialBlogs.map(blog => blogWithRandomUser(blog, usersInDb))

  const blogsInDb = await initCollection(Blog, blogs, blog => new Blog(blog))

  await addBlogsToTheirUsers(blogsInDb)
}

const getUsersInDb = async () => {
  let usersInDb = await User.find({}).populate('blogs')

  if (usersInDb.length === 0) {
    await initUsers()
    usersInDb = await User.find({}).populate('blogs')
  }

  return usersInDb
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