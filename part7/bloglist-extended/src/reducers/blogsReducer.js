import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { blogsUpdateSucceededMessage, blogsUpdateFailedMessage } from './updateBlogsState'

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setAll(state, action) {
      return sortByLikes(action.payload)
    },
    add(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const toUpdate = action.payload
      const updated = state.map(blog => blog.id === toUpdate.id ? toUpdate : blog)
      return sortByLikes(updated)
    },
    remove(state, action) {
      const toDelete = action.payload
      return state.filter(blog => blog.id !== toDelete.id)
    }
  }
})

const sortByLikes = (blogs) =>
  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.fetchAll()
    sortByLikes(blogs)
    dispatch(setAll(blogs))
  }
}

export const createNewBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogsService.createBlog(content, user)

    if (newBlog) {
      dispatch(add({ ...newBlog, user: user }))
      dispatch(blogsUpdateSucceededMessage(`Blog '${ newBlog.title }' created`))
    }
  }
}

export const likeBlog = (blog, user) => {
  return async dispatch => {
    const toUpdate = { ...blog, likes: blog.likes + 1 }
    const updated = await blogsService.updateBlog(toUpdate, user)

    if (updated) {
      dispatch(update(toUpdate))
      dispatch(blogsUpdateSucceededMessage(`Liked blog '${ toUpdate.title }'`))
    }
    else {
      dispatch(blogsUpdateFailedMessage('Could not like blog'))
    }
  }
}

export const deleteBlog = (blog, user) => {
  return async dispatch => {

    if (blog.user.id !== user.id) {
      dispatch(blogsUpdateFailedMessage('You are not the creator of this blog'))
      return
    }

    const deleted = await blogsService.deleteBlog(blog, user)

    if (deleted) {
      dispatch(remove(blog))
      dispatch(blogsUpdateSucceededMessage(`Blog '${ blog.title }' removed`))
    }
    else {
      dispatch(blogsUpdateFailedMessage('Could not remove blog'))
    }
  }
}

export const { setAll, add, update, remove } = blogsReducer.actions
export default blogsReducer.reducer