const listHelper = require('../utils/list_helper')
const blogs = require('./dummyBlogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogs[0]]
    const loneBlogLikes = listWithOneBlog[0].likes
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(loneBlogLikes)
  })

  test('when list has many blogs, equals the likes of all blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, blog is undefined', () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })

  test('when list has one blog, favorite is that blog', () => {
    const listWithOneBlog = [blogs[0]]
    const loneBlog = listWithOneBlog[0]
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: loneBlog.title,
      author: loneBlog.author,
      likes: loneBlog.likes
    })
  })

  test('when list has many blogs, determine favorite blog by likes', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(listHelper.favoriteBlog(blogs)).toEqual(expected)
  })
})