const User = require('../models/user')

const initialUsers = [
  {
    name: 'user1',
    username: 'username1',
    passwordHash: 'sekret1'
  },
  {
    name: 'user2',
    username: 'username2',
    passwordHash: 'sekret2'
  },
]

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs')
  return users.map(user => user.toJSON())
}

module.exports = {
  users: initialUsers,
  initialUsers,
  usersInDb,
}