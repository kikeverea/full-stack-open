const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) =>
    total + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return undefined

  const favorite = blogs.sort(sortHigherToLower)[0]

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const sortHigherToLower = (blog1, blog2) => {
  if (blog1.likes < blog2.likes)
    return 1

  if (blog1.likes > blog2.likes)
    return -1

  return 0
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}