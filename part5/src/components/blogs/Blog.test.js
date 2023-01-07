import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('Blog test', () => {
  const dummyBlog = {
    title: 'blog',
    author: 'me',
    url: 'www.me.com',
    likes: 1
  }
  let container

  beforeEach(() => {
    container = render(<Blog blog={ dummyBlog }/>).container
  })

  test('show simple content by default', () => {
    const title = container.querySelector('#title')
    const url = container.querySelector('#url')
    const likes = container.querySelector('#likes')
    const author = container.querySelector('#author')

    expect(title).toBeDefined()
    expect(url).toBe(null)
    expect(likes).toBe(null)
    expect(author).toBe(null)
  })
})
