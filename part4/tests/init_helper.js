const Blog = require('../models/blog')
const User = require('../models/user')
const usersHelper = require('./users_helper')
const blogsHelper = require('./blogs_helper')
const bcrypt = require('bcrypt')

let lastUsedUserInd = usersHelper.initialUsers.length

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
    blogsHelper.initialBlogs.map(blog => blogWithNextUser(blog, usersInDb))

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

const blogWithNextUser = (blog, users) => ({
  ... blog,
  user: users[nextUserInd()]._id
})

const nextUserInd = () => {
  if (++lastUsedUserInd >= usersHelper.initialUsers.length)
    lastUsedUserInd = 0

  return lastUsedUserInd
}

const addBlogsToTheirUsers = async blogs => {
  for (const blog of blogs) {
    const user = await User.findById(blog.user)
    user.blogs = user.blogs ? user.blogs.concat(blog._id) : [blog._id]
    await user.save()
    // console.log('saved user', saved);
  }
}

module.exports = {
  initUsers,
  initBlogs
}