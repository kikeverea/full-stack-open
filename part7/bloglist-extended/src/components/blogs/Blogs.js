import { useEffect, useRef } from 'react'

import Flex from '../Flex'
import BlogItem from './BlogItem'
import Toggable from '../Toggable'
import NewBlogForm from './NewBlogForm'

import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog, initializeBlogs } from '../../reducers/blogsReducer'
import { showSuccessNotification, showFailNotification } from '../../reducers/notificationReducer'

import { consumeUpdateState } from '../../reducers/updateBlogsState'

const Blogs = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedInUser)
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



  return (
    <Flex customStyle={{ flexDirection: 'column', gap: 5, maxWidth: 480 }}>
      <Toggable id='new-blog-form' label={ 'new blog' } ref={ newBlogForm }>
        <NewBlogForm onFormSubmit={ addNewBlog } onCancel={ cancelNewBlog } />
      </Toggable>
      { blogs ?
        <>
          {
            blogs.map(blog =>
              <BlogItem key={ blog.id }
                blog={ blog } />
            )}
        </>
        : 'No blogs listed' }
    </Flex>
  )
}

export default Blogs