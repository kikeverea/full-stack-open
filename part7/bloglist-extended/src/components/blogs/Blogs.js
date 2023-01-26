import { useEffect, useRef } from 'react'

import Flex from '../Flex'
import Toggable from '../Toggable'
import NewBlogForm from './NewBlogForm'

import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog, initializeBlogs } from '../../reducers/blogsReducer'
import { showFailNotification, showSuccessNotification } from '../../reducers/notificationReducer'

import { consumeUpdateState } from '../../reducers/updateBlogsState'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    <>
      <h1>Blogs</h1>
      <Flex customStyle={{ flexDirection: 'column', gap: 5 }}>
        <Toggable
          id='new-blog-form'
          buttonVariant='outline-dark'
          label='add new blog'
          ref={ newBlogForm }>
          <NewBlogForm onFormSubmit={ addNewBlog } onCancel={ cancelNewBlog } />
        </Toggable>
        { blogs ?
          <ListGroup>
            { blogs.map(blog =>
              <ListGroup.Item action onClick={() => navigate(`/blogs/${ blog.id }`)} key={ blog.id }>
                { blog.title }
              </ListGroup.Item>
            )}
          </ListGroup>
          :
          'No blogs listed' }
      </Flex>
    </>
  )
}

export default Blogs