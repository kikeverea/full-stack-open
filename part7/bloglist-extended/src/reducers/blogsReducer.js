import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { blogsUpdateFailedMessage, blogsUpdateSucceededMessage } from './updateBlogsState'
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

export const likeBlog = (blog) => {
  return async dispatch => {
    const toUpdate = { ...blog, likes: blog.likes + 1 }
    const updated = await blogsService.updateBlogLikes(toUpdate)

    if (updated) {
      dispatch(update(toUpdate))
      dispatch(blogsUpdateSucceededMessage(`Liked blog '${ toUpdate.title }'`))
    }
    else {
      dispatch(blogsUpdateFailedMessage('Could not like blog'))
    }
  }
}

export const addCommentToBlog = (comment, blog) => {
  return async dispatch => {
    const newComment = await blogsService.addCommentToBlog(comment, blog)

    if (newComment) {
      const updatedBlog = { ...blog, comments: [...blog.comments, newComment] }
      dispatch(update(updatedBlog))
    }
  }
}

export const removeCommentFromBlog = (comment, blog, user) => {
  return async dispatch => {
    const deleted = await blogsService.deleteCommentFromBlog(comment, blog, user)

    if (deleted) {
      const updatedBlog = {
        ...blog,
        comments: blog.comments.filter(c => c.id !== comment.id )
      }
      dispatch(update(updatedBlog))
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