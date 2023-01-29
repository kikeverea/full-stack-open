import { useDispatch } from 'react-redux'
import { likeBlog } from '../../reducers/blogsReducer'
import { Button, Container, Navbar } from 'react-bootstrap'

const BlogLikes = ({ blog }) => {

  const dispatch = useDispatch()

  const like = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <Navbar bg='secondary' variant='dark' expand='lg' fixed='bottom'>
      <Container className='justify-content-start'>
        <Navbar.Brand>
          <Button
            variant='outline-light'
            className='mx-3'
            onClick={ like }>Like !
          </Button>
        </Navbar.Brand>
        <Navbar.Text>
          { `Likes ${blog.likes}` }
        </Navbar.Text>
      </Container>
    </Navbar>
  )

}

export default BlogLikes