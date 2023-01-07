import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


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
    const showButton = screen.getByText('view')

    expect(title).toBeDefined()
    expect(url).toBe(null)
    expect(likes).toBe(null)
    expect(author).toBe(null)
    expect(showButton).toBeDefined()
  })

  test('show full content when show button is clicked', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('view')

    await user.click(showButton)

    const title = container.querySelector('#title')
    const url = container.querySelector('#url')
    const likes = container.querySelector('#likes')
    const author = container.querySelector('#author')
    const hideButton = screen.getByText('hide')

    expect(title).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(author).toBeDefined()
    expect(hideButton).toBeDefined()
  })
})
