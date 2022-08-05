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