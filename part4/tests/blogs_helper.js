const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user')
  return blogs.map(blog => blog.toJSON())
}

const dummyBlog = ignoreKeys => {
  const dummy = {
    title: 'A new blog',
    author: 'Me',
    url: 'www.my-url.com',
    likes: 89
  }

  if (ignoreKeys)
    deleteKeys(dummy, ignoreKeys.ignore)

  return dummy
}

const formatForComparison = (blog, ignoreKeys) => {
  const formatted = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url
  }

  if (ignoreKeys)
    deleteKeys(formatted, ignoreKeys)

  return formatted
}

const deleteKeys = (blog, keys) => {
  for (const key of keys)
    delete blog[key]
}

const areEqual = (blog1, blog2, ignoreKeys) => {
  const compare1 = formatForComparison(blog1, ignoreKeys)
  const compare2 = formatForComparison(blog2, ignoreKeys)

  const keys = Object.keys(compare1)

  for (const key of keys) {
    const val1 = compare1[key]
    const val2 = compare2[key]

    if (val1 !== val2)
      return false
  }

  return true
}

const getBlogFromTokenUser = async (token, blogsAtStart) => {
  if (!blogsAtStart) {
    blogsAtStart = await blogsInDb()
  }

  return getBlogFrom(blogsAtStart, blog => blog.user.id === token.id)
}

const getBlogFromUserDifferentToTokenUser = async (token, blogsAtStart) => {
  if (!blogsAtStart) {
    blogsAtStart = await blogsInDb()
  }

  return getBlogFrom(blogsAtStart, blog => blog.user.id !== token.id)
}

const filterBlogEqualTo = (collection, compare, options) => {
  return getBlogFrom(collection, blog =>
    areEqual(blog, compare, options ? options.ignore : undefined))
}

const getBlogFrom = (blogs, predicate) => {
  const filtered = blogs.filter(predicate)

  return filtered[0]
}

module.exports = {
  blogs: initialBlogs,
  initialBlogs,
  dummyBlog,
  blogsInDb,
  formatForComparison,
  areEqual,
  getBlogFromTokenUser,
  getBlogFromUserDifferentToTokenUser,
  filterBlogEqualTo
}