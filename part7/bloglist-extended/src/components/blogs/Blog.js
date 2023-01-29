import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../../reducers/blogsReducer'
import { useEffect } from 'react'
import { consumeUpdateState } from '../../reducers/updateBlogsState'
import { showFailNotification, showSuccessNotification } from '../../reducers/notificationReducer'
import Comments from './Comments'
import { Col, Container, Row } from 'react-bootstrap'
import BlogTitle from './BlogTitle'
import BlogLikes from './BlogLikes'
import DeleteBlog from './DeleteBlog'

const Blog = () => {

  const id = useParams().id
  const dispatch = useDispatch()

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const loggedInUser = useSelector(state => state.loggedInUser)
  const updateBlogState = useSelector(state => state.updateBlogsState)

  useEffect(() => {
    if (updateBlogState) {
      dispatch(updateBlogState.result === 'success'
        ? showSuccessNotification(updateBlogState.content)
        : showFailNotification(updateBlogState.content))

      dispatch(consumeUpdateState())
    }
  }, [updateBlogState])

  const remove = () =>
    dispatch(deleteBlog(blog, loggedInUser))

  return (
    blog ?
      <Container className='pb-5'>
        <Row className='pb-4'>
          <Col xs={ 10 }>
            <BlogTitle blog={ blog }/>
          </Col>
          <Col xs={ 2 }>
            { loggedInUser.username === blog.user.username
              ?
              <DeleteBlog
                blog={ blog }
                deleteBlog={ remove }
                className='float-end me-3'>
              </DeleteBlog>
              :
              null
            }
          </Col>
        </Row>
        <Row className='pb-4'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed in elit id nunc mollis tempor. Morbi ac massa fringilla,
            fringilla quam quis, sodales magna. Integer fermentum dolor sit amet
            imperdiet pretium. Sed consectetur in purus at commodo. Morbi
            sollicitudin a risus vel pharetra. Curabitur vitae ullamcorper ante,
            vitae porta nisi. Praesent vel pellentesque risus, quis ultrices nisl.
            Duis non mattis urna, eu scelerisque tortor. Etiam accumsan cursus
            efficitur. Integer in egestas lectus, sed hendrerit leo.
          </p>
        </Row>
        <Row className='pb-4'>
          <Col>
            <Comments blog={ blog }/>
          </Col>
        </Row>
        <Row>
          <Col>
            <BlogLikes blog={ blog }/>
          </Col>
        </Row>
      </Container>
      :
      <Navigate replace to='/blogs'/>
  )
}

export default Blog