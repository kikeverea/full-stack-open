import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { blogsUpdateSucceededMessage, blogsUpdateFailedMessage } from './updateBlogsState'
import listActions from './repositoryReducerActions'

const sortByLikes = (blogs) =>
  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: listActions({
    setAllDownstream: sortByLikes,
    updateDownstream: sortByLikes })
})

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