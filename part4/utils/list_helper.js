const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (total, blog) =>
    total + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return undefined

  const favorite = blogs.sort(higherToLowerByPropertySorter('likes'))[0]

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const higherToLowerByPropertySorter = property => {
  const sortHigherToLower = (param1, param2) => {
    if (param1[property] < param2[property])
      return 1

    if (param1[property] > param2[property])
      return -1

    return 0
  }
  return sortHigherToLower
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return undefined

  const count = _.countBy(blogs, 'author')
  const highestBlogCount = Math.max(...(Object.values(count)))

  const author = Object.keys(count).find(key => count[key] === highestBlogCount)

  return {
    author: author,
    blogs: highestBlogCount
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}