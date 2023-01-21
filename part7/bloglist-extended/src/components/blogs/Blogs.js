import { useEffect, useRef } from 'react'

import Flex from '../Flex'
import Blog from './Blog'
import Toggable from '../Toggable'
import NewBlogForm from './NewBlogForm'

import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog, deleteBlog, initializeBlogs, likeBlog } from '../../reducers/blogsReducer'
import { showSuccessNotification, showFailNotification } from '../../reducers/notificationReducer'

import { consumeUpdateState } from '../../reducers/updateBlogsState'

const Blogs = ({ user }) => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const blogsUpdateState = useSelector(state => state.updateBlogsState)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    if (!blogsUpdateState)
      return

    const notificationAction = blogsUpdateState.result === 'success'
      ? showSuccessNotification(blogsUpdateState.content)
      : showFailNotification(blogsUpdateState.content)

    dispatch(notificationAction)
    dispatch(consumeUpdateState())

  }, [blogsUpdateState])

  const newBlogForm = useRef()

  const addNewBlog = blog => {
    newBlogForm.current.toggle()
    dispatch(createNewBlog(blog, user))
  }

  const cancelNewBlog = () => {
    newBlogForm.current.toggle()
  }

  const like = (blog) => {
    dispatch(likeBlog(blog, user))
  }

  const removeBlog = async (blog) => {
    const deleteConfirmed = window.confirm(`Remove blog '${ blog.title }'?`)

    if (deleteConfirmed)
      dispatch(deleteBlog(blog, user))
  }

  return (
    <Flex customStyle={{ flexDirection: 'column', gap: 5, maxWidth: 480 }}>
      <Toggable id='new-blog-form' label={ 'new blog' } ref={ newBlogForm }>
        <NewBlogForm onFormSubmit={ addNewBlog } onCancel={ cancelNewBlog } />
      </Toggable>
      { blogs ?
        <>
          {
            blogs.map(blog =>
              <Blog key={ blog.id }
                blog={ blog }
                like={ like }
                remove={ removeBlog }/>
            )}
        </>
        : 'No blogs listed' }
    </Flex>
  )
}

export default Blogs